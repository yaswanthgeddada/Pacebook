import React, { useContext } from "react";
import {
  BsBellFill,
  BsFillChatSquareDotsFill,
  BsFillPersonFill,
} from "react-icons/bs";

import { Link } from "react-router-dom";
import { AuthContext } from "./../../context/AuthContext";

const Topbar = () => {
  const { user } = useContext(AuthContext);
  const PF = "http://localhost:4000/images/";

  return (
    <div className=" bg-indigo-600 shadow-lg text-gray-100">
      <nav className="flex container sm:w-full mx-auto items-center justify-around p-2">
        <Link to="/" className="text-white font-semibold text-xl ">
          Pacebook
        </Link>
        <div className="flex space-x-4">
          <input
            type="text"
            className="w-full border border-gray-300 px-12 py-1 rounded-lg shawod-sm 
            focus:outline-none focus:border-indigo-700 focus:ring-1 focus:ring-indigo-500
            text-red-400"
            placeholder="search.."
          />
          <Link to="/" className="mt-1">
            Homepage
          </Link>
          <p className="mt-1">Timeline</p>
        </div>
        <div className="flex m-2 space-x-4 block">
          <div className="flex cursor-pointer hover:text-red-200 hover:shadow-md ">
            <BsFillPersonFill size="25" />
            <div className="absolute bg-red-400 rounded-full w-5 h-4 text-xs text-center font-bold inline-block ml-4  text-white">
              1
            </div>
          </div>
          <div className="flex cursor-pointer  hover:text-red-200 hover:shadow-md">
            <BsFillChatSquareDotsFill size="23" />
            <div className="absolute bg-red-400 rounded-full w-5 h-4 text-xs text-center font-bold inline-block ml-4  text-white">
              1
            </div>
          </div>
          <div className="flex cursor-pointer hover:text-red-200 hover:shadow-md">
            <BsBellFill size="23" />
            <div className="absolute bg-red-400 rounded-full w-5 h-4 text-xs text-center font-bold inline-block ml-4  text-white">
              99
            </div>
          </div>
        </div>
        <Link
          to={`/profile/${user.username}`}
          className="cursor-pointer block shadow-lg"
        >
          <img
            className="h-9 w-9 rounded-full  "
            src={user.profilePicture || PF + "nophoto.jpg"}
            alt="images"
          />
        </Link>
      </nav>
    </div>
  );
};

export default Topbar;
