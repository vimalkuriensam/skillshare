import { DELETE_USER, SET_USER } from "../actions/auth.action";

const authReducerDefaultState = {
  user: {},
  token: undefined,
};

const authReducer = (state = authReducerDefaultState, { type, user }) => {
  switch (type) {
    case SET_USER:
      return { ...state, user: { ...user } };
    case DELETE_USER:
      return { ...state, user: {} };
    default:
      return state;
  }
};

export default authReducer;
