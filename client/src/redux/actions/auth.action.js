import Axios from "axios";
import ApiService from "../../api-interceptor/authAxios";

export const SET_USER = "SET_USER";
export const DELETE_USER = "DELETE_USER";

export const SET_TOKEN = "SET_TOKEN";
export const DELETE_TOKEN = "DELETE_TOKEN";

export const setUser = ({ user = {} }) => ({
  type: SET_USER,
  user,
});

export const deleteUser = () => ({ type: DELETE_USER });

export const setToken = ({ value = "" }) => ({
  type: SET_TOKEN,
  value,
});

export const deleteToken = () => ({ type: DELETE_TOKEN });

export const registerUser =
  ({ username, email, password }) =>
  async (dispatch) => {
    try {
      console.log(username, email, password);
      const { data, status } = await Axios.post(
        `http://${process.env.REACT_APP_BACKEND_HOST}/api/v1/auth/signup`,
        {
          username,
          email,
          password,
        }
      );
      if (status == 201) {
        dispatch(setUser({ user: data["data"]["user"] }));
        dispatch(setToken({ value: data["data"]["token"] }));
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
    }
  };

export const loginUser =
  ({ username, password }) =>
  async (dispatch) => {
    try {
      const resp = await ApiService().post(
        `http://${process.env.REACT_APP_BACKEND_HOST}/api/v1/auth/login`,
        {
          username,
          password,
        }
      );
      return resp;
    } catch (e) {
      console.log(e);
    }
  };
