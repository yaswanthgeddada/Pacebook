import React from "react";
import {
  BsCollectionFill,
  BsFillChatSquareDotsFill,
  BsFillCameraVideoFill,
  BsFillPeopleFill,
  BsBookmarksFill,
  BsQuestionCircle,
  BsFillCalendarFill,
} from "react-icons/bs";
import { FaGraduationCap } from "react-icons/fa";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <div className="bg-gray-100 w-80 min-h-screen felx felx-col sticky">
      <div className="grid grid-row-1">
        <div className="m-4 flex space-x-3">
          <div className="block mt-1">
            <BsCollectionFill />
          </div>
          <p>feed</p>
        </div>
        <div className="m-4 flex space-x-3">
          <div className="block mt-1">
            <BsFillChatSquareDotsFill />
          </div>
          <p>Chats</p>
        </div>{" "}
        <div className="m-4 flex space-x-3">
          <div className="block mt-1">
            <BsFillCameraVideoFill />
          </div>
          <p>Videos</p>
        </div>{" "}
        <div className="m-4 flex space-x-3">
          <div className="block mt-1">
            <BsFillPeopleFill />
          </div>
          <p>Groups</p>
        </div>{" "}
        <div className="m-4 flex space-x-3">
          <div className="block mt-1">
            <BsBookmarksFill />
          </div>
          <p>Bookmarks</p>
        </div>
        <div className="m-4 flex space-x-3">
          <div className="block mt-1">
            <BsQuestionCircle />
          </div>
          <p>Questions</p>
        </div>
        <div className="m-4 flex space-x-3">
          <div className="block mt-1">
            <BsFillCalendarFill />
          </div>
          <p>Events</p>
        </div>
        <div className="m-4 flex space-x-3">
          <div className="block mt-1">
            <FaGraduationCap size="20" />
          </div>
          <p>Courses</p>
        </div>
        <hr className="border-b-4" />
        {/* friends */}
        <div className="overflow-y-auto ">
          <div className="m-4 flex space-x-3">
            <img
              src="/assets/images/users/testimonials-1.jpg"
              alt=""
              className="h-8 w-8 rounded-full border border-black"
            />
            <p className="text-gray-700">Jhon Janthikulu</p>
          </div>
          <div className="m-4 flex space-x-3">
            <img
              src="/assets/images/users/testimonials-1.jpg"
              alt=""
              className="h-8 w-8 rounded-full border border-black"
            />
            <p className="text-gray-700">Jhon Janthikulu</p>
          </div>
          <div className="m-4 flex space-x-3">
            <img
              src="/assets/images/users/testimonials-1.jpg"
              alt=""
              className="h-8 w-8 rounded-full border border-black"
            />
            <p className="text-gray-700">Jhon Janthikulu</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
