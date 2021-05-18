import axios from "./api";

export const loginCall = async (userCredentials, dispatch) => {
  dispatch({ type: "LOGIN_START" });

  try {
    const res = await axios.post("/auth/login", userCredentials);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    console.log("%cSET_ITEM", "color:orange; fontWeight:bold", res.data);
    localStorage.setItem("user", JSON.stringify(res.data));
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};
