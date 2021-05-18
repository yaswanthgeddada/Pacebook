import React, { useState, useEffect, useContext } from "react";
import Post from "../post/Post";
import Share from "./../shared/Share";
// import { Posts } from "../../dummyData";
import axios from "../../api";
import { AuthContext } from "./../../context/AuthContext";

const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get(`posts/profile/${username}`)
        : await axios.get(`posts/timeline/${user._id}`);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };

    fetchPosts();
  }, [user._id, username]);

  return (
    <div>
      <Share />

      {posts.map((p) => (
        <Post key={p._id} post={p} />
      ))}
    </div>
  );
};

export default Feed;
