import React, { useContext, useRef, useState } from "react";
import { BsImages, BsTagFill } from "react-icons/bs";
import { BiLocationPlus } from "react-icons/bi";
import { FaSmile } from "react-icons/fa";
import { AuthContext } from "./../../context/AuthContext";
import axios from "./../../api/index";

const Share = () => {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const desc = useRef();
  const PF = "http://localhost:4000/images/";

  console.log(PF);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (desc.current.value === null || desc.current.value === "") {
      return;
    }

    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now();
      data.append("file", file);
      data.append("name", filename);

      try {
        const res = await axios.post("/upload", data);
        newPost.image = res.data;
        console.log(res.data);
        try {
          await axios.post("/posts", newPost);
          window.location.reload();

          console.log(newPost);
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="mt-4 mb-4">
      <div className="bg-white h-25 w-50 p-6 mx-auto rounded-xl item-center space-x-4 shadow-md">
        <form onSubmit={submitHandler}>
          <div className="flex space-x-4">
            <img
              src={user.profilePicture || PF + "/nophoto.jpg"}
              alt=""
              className="h-12 w-12  shadow-lg rounded-full"
            />
            <div className="text-center mt-3 text-gray-500">
              <input
                type="text"
                placeholder={"What is in your mind ? " + user.username}
                className="w-full py-1 mr-52 rounded-lg shawod-sm 
            focus:outline-none 
            text-red-400"
                ref={desc}
              />
            </div>
            {file && (
              <div className=" flex flex-col">
                <img src={URL.createObjectURL(file)} alt="" className="w-20" />
                <button
                  onClick={() => setFile(null)}
                  className={`bg-red-300 mt-2 rounded-xl focus:outline-none hover:bg-red-500 w-20 h-7 text-white`}
                >
                  cancle
                </button>
              </div>
            )}
            <br />
          </div>
          <hr className="mt-3 w-full border-black border-b-1" />
          <div className="flex space-x-6 mt-2 ">
            <label className="flex space-x-2 cursor-pointer">
              <BsImages className="mt-1" />
              <p className="text-gray-600 text-sm">Photos & videos</p>
              <input
                type="file"
                id="file"
                accept=".png,.jpg,.jpeg"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </label>

            <div className="flex space-x-2">
              <BsTagFill className="mt-1" />
              <p className="text-gray-600 text-sm">Tag</p>
            </div>

            <div className="flex space-x-2">
              <BiLocationPlus className="mt-1" />
              <p className="text-gray-600 text-sm">Location</p>
            </div>

            <div className="flex space-x-2">
              <FaSmile className="mt-1" />
              <p className="text-gray-600 text-sm">Feeling</p>
            </div>

            <button
              type="submit"
              className={`bg-blue-700 rounded-xl focus:outline-none hover:bg-blue-500 w-20 h-7 text-white`}
            >
              share
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Share;
