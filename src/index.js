import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./style/main.css";
import { AuthContextProvider } from "./context/AuthContext";

ReactDOM.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>,
  document.getElementById("root")
);
