import React, { useRef, useContext } from "react";
import { loginCall } from "../../apiCall";
import { AuthContext } from "./../../context/AuthContext";
import { Link } from "react-router-dom";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked");
    console.log(email.current.value);
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  console.log(user);

  return (
    <div className="flex   space-x-56 mx-auto justify-center mt-56 bg-gradient-b from-gray-100 to-gray-500">
      <div className="bg-white mx-40 p-4">
        <div className="text-xl">Pacebook</div>
      </div>
      <div className="bg-white border border-gray-500 rounded-xl p-4 ">
        <div className="text-blue text-2xl text-center">Login</div>
        <form
          action=""
          className="flex flex-col space-y-1 p-2"
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="emailId">EmailId : </label>
            <input
              type="email"
              id="emailId"
              className="w-full border border-gray-300 px-12 py-1 rounded-lg shawod-sm 
            focus:outline-none focus:border-indigo-700 focus:ring-1 focus:ring-indigo-500
            text-red-400"
              placeholder="EMail Id"
              ref={email}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password">Password : </label>
            <input
              type="password"
              id="password"
              placeholder="password"
              className="w-full border border-gray-300 px-12 py-1 rounded-lg shawod-sm 
            focus:outline-none focus:border-indigo-700 focus:ring-1 focus:ring-indigo-500"
              required
              ref={password}
            />
          </div>

          <button className="bg-blue-400 rounded-xl hover:bg-blue-500 focus:ring-none focus:outline-none mt-5 p-1 ">
            {isFetching ? "loading.. " : "login"}
          </button>
        </form>
        <div>
          dont have an account ? <Link to="/signup">Signup</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
