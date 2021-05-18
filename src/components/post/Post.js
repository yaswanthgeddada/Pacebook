import React, { useState, useEffect, useContext } from "react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { AiOutlineMore } from "react-icons/ai";
import axios from "../../api";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "./../../context/AuthContext";

const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);
  const PF = "http://localhost:4000/images/";

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };

    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put(`/posts/${post._id}/like`, { userId: currentUser._id });
      console.log("clicked");
    } catch (err) {
      console.log(err);
    }

    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="bg-white  rounded-md w-full shadow-md p-3 mb-5 mt-3">
      <div className="flex justify-between ">
        <div className="flex space-x-4">
          <Link to={`/profile/${user.username}`}>
            <img
              src={user.profilePicture || PF + "nophoto.jpg"}
              className="h-9 w-9 rounded-full"
              alt=""
            />
          </Link>

          <div className="text-gray-700 font-semibold mt-1">
            {user.username}
          </div>
          <div className="text-gray-700 mt-2 text-xs">
            {format(post.createdAt)}
          </div>
        </div>

        <div>
          <AiOutlineMore size="25" />
        </div>
      </div>

      <div className="flex flex-col space-x-4 mt-2 mb-2 text-gray-900">
        {post?.desc}
      </div>
      <div className="flex flex-col">
        <img
          src={PF + post.image}
          alt=""
          className="w-full cursor-pointer"
          onDoubleClick={likeHandler}
        />
      </div>
      <div className="flex justify-between mt-2 mb-2">
        <div className="flex space-x-2 text-gray-600 font-thin">
          <div onClick={likeHandler}>
            {!isLiked ? <FcLikePlaceholder size="25" /> : <FcLike size="25" />}
          </div>
          <p>{like} people liked</p>
        </div>
        <div className="text-gray-500"> {post.comment} comments</div>
      </div>
    </div>
  );
};

export default Post;
