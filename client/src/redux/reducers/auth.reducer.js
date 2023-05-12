import {
  DELETE_TOKEN,
  DELETE_USER,
  SET_TOKEN,
  SET_USER,
} from "../actions/auth.action";

const authReducerDefaultState = {
  user: {},
  token: undefined,
};

const authReducer = (
  state = authReducerDefaultState,
  { type, user, value = "" }
) => {
  switch (type) {
    case SET_USER:
      return { ...state, user: { ...user } };
    case DELETE_USER:
      return { ...state, user: {} };
    case SET_TOKEN:
      return { ...state, token: value };
    case DELETE_TOKEN:
      return { ...state, token: undefined };
    default:
      return state;
  }
};

export default authReducer;
