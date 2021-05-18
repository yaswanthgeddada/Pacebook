import React, { useContext, useState, useEffect, useRef } from "react";
import Conversations from "../../components/conversations/Conversations";
import MessageArea from "../../components/MessageArea/MessageArea";
import Topbar from "./../../components/topbar/Topbar";
import ChatOnline from "./../../components/chatOnline/ChatOnline";
import { AuthContext } from "./../../context/AuthContext";
import axios from "./../../api/index";
import { io } from "socket.io-client";
const Messanger = () => {
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const socket = useRef();
  const scrollRef = useRef();

  //io connect and get message
  useEffect(() => {
    socket.current = io("ws://localhost:4001");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  // when message comes io
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  //add memebers to the char and get user
  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.following.filter((f) => users.some((u) => u.userId === f))
      );
      console.log("%cSocketUsers", "color:orange; fontWeight:bold", users);
    });
  }, [user]);

  // get the conversations with userId
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversation/" + user._id);
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
  }, [user._id]);

  //get messages with current chat id
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat._id);
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getMessages();
  }, [currentChat]);

  //messages handeling for new messages
  const handleSendMessage = async (e) => {
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  //scroll to view
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Topbar />
      <div className="flex justify-between h-screen pb-20 mt-3">
        <div className="bg-gray-200 w-2/4 p-4">
          <input
            type="text"
            className="w-full border border-gray-300 px-12 py-1 rounded-lg shawod-sm 
            focus:outline-none focus:border-indigo-700 focus:ring-1 focus:ring-indigo-500
            text-red-400"
            placeholder="search.."
          />
          {conversations.map((c) => (
            <div onClick={() => setCurrentChat(c)}>
              <Conversations conv={c} currentUser={user} />
            </div>
          ))}
        </div>
        <div className="bg-gray-100 w-full ">
          <div className=" overflow-y-auto h-96 p-3 mt-10">
            {currentChat ? (
              <div>
                {messages.map((m) => (
                  <div ref={scrollRef}>
                    <MessageArea message={m} own={m.sender === user._id} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xl text-gray-400 text-center mt-52">
                Select a Conversation
              </div>
            )}
          </div>
          <div className="flex space-x-4 ">
            <textarea
              type="text"
              className="w-full border mt-20 border-gray-300 px-12 rounded-lg shawod-sm 
            focus:outline-none focus:border-indigo-700 focus:ring-1 focus:ring-indigo-500
            text-red-400"
              placeholder="write text"
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
            />
            <button
              onClick={handleSendMessage}
              className=" text-white bg-green-700 hover:bg-green-900 mt-32 px-3 rounded-r-full focus:outline-none  "
            >
              send
            </button>
          </div>
        </div>
        <div className="bg-gray-200 w-full -">
          friends online:
          <ChatOnline
            onlineUsers={onlineUsers}
            currentId={user._id}
            setCurrentChat={setCurrentChat}
          />
        </div>
      </div>
    </>
  );
};

export default Messanger;
