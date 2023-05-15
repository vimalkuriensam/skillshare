import {
  DELETE_CITY,
  DELETE_COUNTRY,
  DELETE_TOKEN,
  DELETE_USER,
  DELETE_USERS,
  SET_CITY,
  SET_COUNTRY,
  SET_TOKEN,
  SET_USER,
  SET_USERS,
} from "../actions/auth.action";

const authReducerDefaultState = {
  user: {},
  users: [],
  location: {
    city: undefined,
    country: undefined,
  },
  token: undefined,
};

const authReducer = (
  state = authReducerDefaultState,
  { type, user, users = [], value = "", country = [], city = [] }
) => {
  switch (type) {
    case SET_COUNTRY:
      return { ...state, location: { ...state.location, country } };
    case DELETE_COUNTRY:
      return { ...state, location: { ...state.location, country: undefined } };
    case SET_CITY:
      return { ...state, location: { ...state.location, city } };
    case DELETE_CITY:
      return { ...state, location: { ...state.location, city: undefined } };
    case SET_USER:
      return { ...state, user: { ...user } };
    case DELETE_USER:
      return { ...state, user: {} };
    case SET_USERS:
      return { ...state, users };
    case DELETE_USERS:
      return { ...state, users: [] };
    case SET_TOKEN:
      return { ...state, token: value };
    case DELETE_TOKEN:
      return { ...state, token: undefined };
    default:
      return state;
  }
};

export default authReducer;
