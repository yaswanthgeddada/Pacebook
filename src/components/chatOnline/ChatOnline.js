import React, { useState, useEffect } from "react";
import axios from "./../../api/index";

const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {
  const PF = "http://localhost:4000/images/";

  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("/users/friends/" + currentId);
      setFriends(res.data);
      console.log("%cFriends", "color:Red; fontWeight:bold", friends);
    };
    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [onlineUsers]);

  return (
    <>
      {onlineFriends.map((o) => (
        <div className=" hover:bg-red-200 ">
          <div className="flex my-2 p-3 hover:cursor-pointer">
            <div className="">
              <span className="h-2 w-2 bg-green-500 absolute rounded-full  ml-6"></span>

              <img
                className="h-8 w-8 rounded-full  "
                src={o?.profilePicture || PF + "nophoto.jpg"}
                alt="images"
              />
            </div>

            <span className="text-gray-700 s ml-2">{o?.username}</span>
          </div>
        </div>
      ))}
    </>
  );
};

export default ChatOnline;
