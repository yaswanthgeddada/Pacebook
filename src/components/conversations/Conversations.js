import React, { useState, useEffect } from "react";
import axios from "./../../api/index";

const Conversations = ({ conv, currentUser }) => {
  const PF = "http://localhost:4000/images/";
  const [friend, setFriend] = useState(null);

  useEffect(() => {
    const friendId = conv.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios.get("/users/?userId=" + friendId);
        // console.log(res.data);
        setFriend(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [conv, currentUser]);

  return (
    <div className=" hover:bg-red-200 ">
      <div className="flex my-2 p-3 hover:cursor-pointer">
        <img
          className="h-8 w-8 rounded-full  "
          src={friend?.profilePicture || PF + "nophoto.jpg"}
          alt="images"
        />
        <span className="text-gray-700 s ml-2">{friend?.username}</span>
      </div>
    </div>
  );
};

export default Conversations;
