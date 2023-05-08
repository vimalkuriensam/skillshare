import Axios from "axios";
// import { useNavigate } from "react-router-dom";
// import {
//   getAccessToken,
//   setLogout,
// } from "../redux/actions/authentication.action";

import { store } from "../redux/store/configureStore";
// import history from "../utils/history";

const ApiService = () => {
  // const navigate = useNavigate();
  const api = Axios.create({
    baseURL: process.env.REACT_APP_BACKEND_HOST,
  });
  let currentEndpoint = "";
  api.interceptors.request.use(async (config) => {
    try {
      currentEndpoint = config.url;
      //   store.dispatch(setLoader({ state: true }));
      const token = store.getState().auth?.accessToken;
      if (token) config.headers["Authorization"] = "Bearer " + token;
      config.headers["Content-Type"] = "application/json";
    } catch (e) {
      alert("error", e);
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => {
      console.log("response", response)
      //   store.dispatch(setLoader({ state: false }));
      return response;
    },
    async (error) => {
      //   store.dispatch(setLoader({ state: false }));
      console.log("error", error);
      // if (error.response?.status === 403) {
      //   // store.dispatch(
      //   //   addMessage({
      //   //     type: "info",
      //   //     content: "Token Expired!Relogging",
      //   //   })
      //   // );
      //   const refreshToken = store.getState().auth?.refreshToken;
      //   if (refreshToken) {
      //     //   const resp = await store.dispatch(getAccessToken({ refreshToken }));
      //     //   if (resp) return api.request(error.config);
      //     //   else navigate("/");
      //   } else {
      //     //   store.dispatch(setLogout());
      //     // navigate("/register");
      //   }
      // } else if (error.response.status === 401) {
      //   // store.dispatch(setLogout());
      //   // navigate("/register");
      // } else {
      //   return error;
      // }
    }
  );

  return api;
};

export default ApiService;
