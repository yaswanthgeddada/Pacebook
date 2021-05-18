import React, { useRef } from "react";
import { useHistory } from "react-router";
import axios from "../../api";
import { Link } from "react-router-dom";

const Signup = () => {
  const email = useRef();
  const password = useRef();
  const username = useRef();
  const conformPassword = useRef();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (conformPassword.current.value !== password.current.value) {
      password.current.setCustomValidity("Password don't match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };

      try {
        await axios.post("/auth/register", user);
        history.push("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex   space-x-56 mx-auto justify-center mt-40 bg-gradient-b from-gray-100 to-gray-500">
      <div className="bg-white mx-10 p-4">
        <div className="text-xl">Pacebook</div>
      </div>
      <div className="bg-white border border-gray-500 rounded-xl p-4 ">
        <div className="text-blue text-2xl text-center">Signup</div>
        <form className="flex flex-col space-y-5 p-2" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              className="w-full border border-gray-300 px-12 py-1 rounded-lg shawod-sm 
            focus:outline-none focus:border-indigo-700 focus:ring-1 focus:ring-indigo-500
            text-red-400"
              placeholder="user name"
              ref={username}
              required
            />
          </div>
          <div>
            <input
              type="email"
              className="w-full border border-gray-300 px-12 py-1 rounded-lg shawod-sm 
            focus:outline-none focus:border-indigo-700 focus:ring-1 focus:ring-indigo-500
            text-red-400"
              placeholder="email"
              ref={email}
              required
            />
          </div>
          <div className="mb-2">
            <input
              type="password"
              placeholder="password"
              className="w-full border border-gray-300 px-12 py-1 rounded-lg shawod-sm 
            focus:outline-none focus:border-indigo-700 focus:ring-1 focus:ring-indigo-500"
              ref={password}
              required
            />
          </div>
          <div className="mb-2">
            <input
              type="password"
              placeholder="confirm password"
              className="w-full border border-gray-300 px-12 py-1 rounded-lg shawod-sm 
            focus:outline-none focus:border-indigo-700 focus:ring-1 focus:ring-indigo-500"
              ref={conformPassword}
              required
            />
          </div>
          <button className="bg-blue-400 rounded-xl hover:bg-blue-500 focus:ring-none mt-5 p-1 focus:outline-none">
            {" "}
            Signup{" "}
          </button>
        </form>
        <div>
          Already have an account ? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
