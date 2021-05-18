import React from "react";
import { Link } from "react-router-dom";

const Online = ({ user }) => {
  const PF = "http://localhost:4000/images/";

  return (
    <Link to={`/profile/${user.username}`} className="m-4 flex space-x-3">
      <img
        src={user.profilePicture || PF + "/nophoto.jpg"}
        alt=""
        className="h-8 w-8 rounded-full border border-black"
      />
      <p className="text-gray-700">{user.username}</p>
    </Link>
  );
};

export default Online;
