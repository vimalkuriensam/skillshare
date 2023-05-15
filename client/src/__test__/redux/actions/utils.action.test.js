import { setLoader, toggleNavbar } from "../../../redux/actions/utils.action";

describe("Test the utils action file", () => {
  test("should set up set loader action object with true as input", () => {
    const action = setLoader({ loader: true });
    expect(action).toEqual({
      type: "TOGGLE_LOADER",
      loader: true,
    });
  });

  test("should set up set loader action object with true as input", () => {
    const action = setLoader({ loader: false });
    expect(action).toEqual({
      type: "TOGGLE_LOADER",
      loader: false,
    });
  });

  test("should set up toggle navbar action object", () => {
    const action = toggleNavbar();
    expect(action).toEqual({ type: "NAVBAR_TOGGLE" });
  });
});
