import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthUser() {
  const navigation = useNavigate();
  // get token from session storage
  const getToken = () => {
    const tokenSession = sessionStorage.getItem("token");
    const userToken = JSON.parse(tokenSession);
    return userToken;
  };
  // get userdata from session storage
  const getUser = () => {
    const userSession = sessionStorage.getItem("user");
    const user = JSON.parse(userSession);
    return user;
  };

  const [token, setToken] = useState(getToken);
  const [user, setUser] = useState(getUser);

  // set token and user to session storage
  const saveToken = (user, token) => {
    sessionStorage.setItem("token", JSON.stringify(token));
    sessionStorage.setItem("user", JSON.stringify(user));
    setToken(token);
    setUser(user);
    navigation("/dashboard"); // to redirect to dashboard
  };

  const logout = () => {
    sessionStorage.clear();
    navigation("/login"); // to redirect to login
    };

  const http = axios.create({
    baseURL: "http://localhost:8000/api/",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return {
    setToken: saveToken,
    http,
    token,
    user,
    getToken,
    logout
  };
}
