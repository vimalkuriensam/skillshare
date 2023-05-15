import authReducer from "../../../redux/reducers/auth.reducer";

describe("should test auth reducer file", () => {
  const currentState = {
    user: {},
    users: [],
    location: {
      city: undefined,
      country: undefined,
    },
    token: undefined,
  };
  test("should set auth reducer default values", () => {
    const state = authReducer(undefined, { type: "@@INIT" });
    expect(state).toEqual(currentState);
  });

  test("should handle SET_COUNTRY action", () => {
    const action = {
      type: "SET_COUNTRY",
      country: ["UK"],
    };
    const state = authReducer(currentState, action);
    expect(state).toEqual({
      ...currentState,
      location: {
        ...currentState.location,
        country: ["UK"],
      },
    });
  });

  test("should handle DELETE_TOKEN action", () => {
    const action = {
      type: "DELETE_TOKEN",
    };
    const state = authReducer(currentState, action);
    expect(state).toEqual({
      ...currentState,
      token: undefined,
    });
  });

  test("should return the same state for an unknown action", () => {
    const action = {
      type: "UNKNOWN_ACTION",
    };
    const state = authReducer(currentState, action);
    expect(state).toEqual(currentState);
  });

  test("should handle DELETE_COUNTRY action", () => {
    const action = {
      type: "DELETE_COUNTRY",
    };
    const state = authReducer(currentState, action);
    expect(state).toEqual({
      ...currentState,
      location: {
        ...currentState.location,
        country: undefined,
      },
    });
  });

  test("should handle SET_CITY action", () => {
    const action = {
      type: "SET_CITY",
      city: ["London"],
    };
    const state = authReducer(currentState, action);
    expect(state).toEqual({
      ...currentState,
      location: {
        ...currentState.location,
        city: action.city,
      },
    });
  });

  test("should handle DELETE_CITY action", () => {
    const action = {
      type: "DELETE_CITY",
    };
    const state = authReducer(currentState, action);
    expect(state).toEqual({
      ...currentState,
      location: {
        ...currentState.location,
        city: undefined,
      },
    });
  });

  test("should handle SET_USER action", () => {
    const action = {
      type: "SET_USER",
      user: { id: 1, username: "Test User" },
    };
    const state = authReducer(currentState, action);
    expect(state).toEqual({
      ...currentState,
      user: action.user,
    });
  });

  test("should handle DELETE_USER action", () => {
    const action = {
      type: "DELETE_USER",
    };
    const state = authReducer(currentState, action);
    expect(state).toEqual({
      ...currentState,
      user: {},
    });
  });

  test("should handle SET_USERS action", () => {
    const action = {
      type: "SET_USERS",
      users: [
        { id: 1, username: "test user 1" },
        { id: 2, username: "test user 2" },
      ],
    };
    const state = authReducer(currentState, action);
    expect(state).toEqual({
      ...currentState,
      users: action.users,
    });
  });

  test("should handle DELETE_USERS action", () => {
    const action = {
      type: "DELETE_USERS",
    };
    const state = authReducer(currentState, action);
    expect(state).toEqual({
      ...currentState,
      users: [],
    });
  });
});
