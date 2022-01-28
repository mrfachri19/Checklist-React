import axios from "../../utils/axios";
export const login = (data) => {
  return {
    type: "LOGIN",
    payload: axios.post("login", data),
  };
};

export const register = (data) => {
  return {
    type: "REGISTER",
    payload: axios.post("register", data),
  };
};
