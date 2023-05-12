export const TOGGLE_LOADER = "TOGGLE_LOADER";
export const NAVBAR_TOGGLE = "NAVBAR_TOGGLE";

export const setLoader = ({ loader = null }) => ({
  type: TOGGLE_LOADER,
  loader,
});

export const toggleNavbar = () => ({ type: NAVBAR_TOGGLE });
