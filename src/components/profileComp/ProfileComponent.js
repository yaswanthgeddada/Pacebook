import React from "react";
import { format } from "timeago.js";

const ProfileComponent = ({ usr }) => {
  const PF = "http://localhost:4000/images/";

  return (
    <div style={{ width: "150%" }}>
      <div className="bg-white   p-5">
        <div className=" w-2/3">
          <div className="rounded-lg shadow-lg bg-gray-600  flex flex-row flex-wrap p-3 antialiased">
            <div className="md:w-1/3 w-full">
              <img
                alt="propic"
                className=" shadow-lg antialiased rounded-full border border-black-600"
                src={usr.profilePicture || PF + "/nophoto.jpg"}
              />
            </div>
            <div className="md:w-2/3 w-full px-3 flex flex-row flex-wrap">
              <div className="w-full text-right text-gray-700 font-semibold relative pt-3 md:pt-0">
                <div className="text-2xl text-white leading-tight">
                  {usr.username}
                </div>
                <div className="text-normal text-gray-300 hover:text-gray-400 cursor-pointer">
                  <span className="border-b border-dashed border-gray-500 pb-1">
                    {usr.isAdmin && <span>Administrator</span>}
                  </span>
                </div>
                <div className="text-sm text-gray-300 hover:text-gray-400 cursor-pointer md:absolute pt-3 md:pt-0 bottom-0 right-0">
                  Profile creaeted on : {format(usr.createdAt)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
