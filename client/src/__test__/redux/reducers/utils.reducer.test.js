import utilsReducer from "../../../redux/reducers/utils.reducer";

describe("test utils reducer", () => {
  test("should set up utils reducer default values", () => {
    const state = utilsReducer(undefined, { type: "@@INIT" });
    expect(state).toEqual({
      loader: false,
      navbar: true,
    });
  });

  test("should set up toggle loader", () => {
    const currentState = {
      loader: false,
      navbar: true,
    };
    const state = utilsReducer(currentState, { type: "TOGGLE_LOADER" });
    expect(state.loader).toBe(true);
  });

  test("should set up toggle navbar", () => {
    const currentState = {
      loader: false,
      navbar: true,
    };
    const state = utilsReducer(currentState, { type: "NAVBAR_TOGGLE" });
    expect(state.navbar).toBe(false);
  });
});
