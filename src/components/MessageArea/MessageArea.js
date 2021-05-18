import React from "react";
import { format } from "timeago.js";

const MessageArea = ({ message, own }) => {
  const PF = "http://localhost:4000/images/";

  return (
    <div className=" mx-4">
      <div className={own ? "flex  justify-end p-1" : "flex justify-satrt p-1"}>
        <img
          className="h-8 w-8 rounded-full  "
          src={PF + "nophoto.jpg"}
          alt="images"
        />
        <div>
          <p className="mx-2 bg-blue-600 text-white text-md rounded-lg p-2 break-all">
            {message.text}
          </p>
          <span className="text-xs text-right text-gray-400">
            {format(message.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MessageArea;
