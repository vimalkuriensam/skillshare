import { TOGGLE_LOADER } from "../actions/utils.action";

const utilsReducerDefaultState = {
  loader: false,
};

const utilsReducer = (state = utilsReducerDefaultState, { type, loader }) => {
  switch (type) {
    case TOGGLE_LOADER:
      if (loader != null) return { ...state, loader };
      return { ...state, loader: !state.loader };
    default:
      return state;
  }
};

export default utilsReducer;
