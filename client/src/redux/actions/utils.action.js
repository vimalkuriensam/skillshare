export const TOGGLE_LOADER = "TOGGLE_LOADER";

export const setLoader = ({ loader = null }) => ({
  type: TOGGLE_LOADER,
  loader,
});
