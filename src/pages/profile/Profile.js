import { useState, useEffect, useContext } from "react";

import Feed from "../../components/feed/Feed";
import ProfileComponent from "../../components/profileComp/ProfileComponent";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "./../../components/sidebar/Sidebar";
import axios from "../../api";
import { useParams } from "react-router";
import Rightbar from "./../../components/rightbar/Rightbar";

const Profile = () => {
  const [user, setUser] = useState({});
  const username = useParams().username;

  console.log("%cparams", "color:orange; fontWeight:bold", username);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/users?username=" + username);
      setUser(res.data);
    };

    fetchPosts();
  }, [username]);

  return (
    <div>
      <Topbar />
      <div className="flex">
        <div>
          <Sidebar />
        </div>
        <div>
          <ProfileComponent usr={user} />
          <div className="w-4/5  sm:w-9/12 sm:ml-20">
            <Feed username={username} />
          </div>
        </div>
        <div className="  w-20" style={{ marginRight: "-40px" }}>
          <Rightbar />
        </div>
      </div>
    </div>
  );
};

export default Profile;
