import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./../../context/AuthContext";
import { useParams } from "react-router";
import axios from "../../api";

const UserInfo = ({ userInfo }) => {
  const username = useParams().username;
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.following.includes(user?._id)
  );
  useEffect(() => {
    const getCurrentProfile = async () => {
      const res = await axios.get("/users?username=" + username);
      setUser(res.data);
      console.log(res.data);
    };

    getCurrentProfile();
  }, [username]);

  useEffect(() => {
    setFollowed(currentUser.following.includes(user?._id));
  }, [currentUser, user?._id]);

  const handleFollow = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
      }
    } catch (err) {
      console.log(err);
    }

    setFollowed(!followed);
  };

  return (
    <div className="bg-gray-10 border border-b-1">
      <div className="m-2 font-semibold">Profile Info :</div>
      <div className="flex-row mx-4">city : {user?.city}</div>
      <div className="flex-row mx-4">
        relationShip status : {user?.relationshipStaus}
      </div>
      <div className="flex-row mx-4">about : {user?.desc}</div>
      {user.username !== currentUser.username && (
        <button
          onClick={handleFollow}
          className="bg-blue-400 hover:bg-blue-500 focus:outline-none border border-gray-600 text-white rounded-lg px-3 m-3"
        >
          {followed ? "unFollow" : "Follow"}
        </button>
      )}
    </div>
  );
};

export default UserInfo;
