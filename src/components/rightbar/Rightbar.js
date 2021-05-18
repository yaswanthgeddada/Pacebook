import React, { useEffect, useState, useContext } from "react";
import Online from "./Online";
import UserInfo from "./UserInfo";
import axios from "../../api";
import { AuthContext } from "./../../context/AuthContext";

const Rightbar = () => {
  const [friends, setFriends] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendsList = await axios.get("/users/friends/" + user._id);
        setFriends(friendsList.data);
      } catch (err) {}
    };

    getFriends();
  }, [user._id]);

  return (
    <div className="bg-gray-100 w-80 min-h-screen felx felx-col overflow-hidden">
      <div className="grid grid-row-1">
        <div>
          <UserInfo userInfo={user} />
        </div>
        {/* friends */}
        <div className="m-2 font-semibold">Friends Online :</div>

        <div className="overflow-y-auto ">
          {friends.map((user) => (
            <Online key={user._id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rightbar;
