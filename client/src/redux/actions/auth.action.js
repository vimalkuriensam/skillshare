import apiService from "../../api-interceptor/authAxios";

export const SET_USER = "SET_USER";
export const DELETE_USER = "DELETE_USER";

export const SET_TOKEN = "SET_TOKEN";
export const DELETE_TOKEN = "DELETE_TOKEN";

export const SET_COUNTRY = "SET_COUNTRY";
export const DELETE_COUNTRY = "DELETE_COUNTRY";

export const SET_CITY = "SET_CITY";
export const DELETE_CITY = "DELETE_CITY";

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
      const { data, status } = await apiService().post("/api/v1/auth/signup", {
        username,
        email,
        password,
      });
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
      const {
        data: { data },
        status,
      } = await apiService().post(`/api/v1/auth/login`, {
        username,
        password,
      });
      if (status == 200) {
        dispatch(setUser({ user: data["user"] }));
        dispatch(setToken({ value: data["token"] }));
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
    }
  };

export const getCountries = () => async (dispatch) => {
  try {
    const { data, status } = await apiService().get(`/api/v1/profile/country`);
    if (status == 200) {
      dispatch(deleteCountry());
      dispatch(setCountry({ country: data["countries"] }));
    }
  } catch (e) {
    console.log(e.message);
  }
};

export const getCities =
  ({ countryId }) =>
  async (dispatch) => {
    try {
      const { data, status } = await apiService().get(
        `/api/v1/profile/city/${countryId}`
      );
      if (status == 200) {
        dispatch(deleteCity());
        dispatch(setCity({ city: data["cities"] }));
      }
    } catch (e) {
      console.log(e.message);
    }
  };

export const setCountry = ({ country = [] }) => ({
  type: SET_COUNTRY,
  country,
});

export const deleteCountry = () => ({ type: DELETE_COUNTRY });

export const setCity = ({ city = [] }) => ({
  type: SET_CITY,
  city,
});

export const deleteCity = () => ({ type: DELETE_CITY });
