import { NAVBAR_TOGGLE, TOGGLE_LOADER } from "../actions/utils.action";

const utilsReducerDefaultState = {
  loader: false,
  navbar: true,
};

const utilsReducer = (state = utilsReducerDefaultState, { type, loader }) => {
  switch (type) {
    case TOGGLE_LOADER:
      if (loader != null) return { ...state, loader };
      return { ...state, loader: !state.loader };
    case NAVBAR_TOGGLE:
      return { ...state, navbar: !state.navbar };
    default:
      return state;
  }
};

export default utilsReducer;
