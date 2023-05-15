import {
  deleteCity,
  deleteCountry,
  deleteToken,
  deleteUser,
  deleteUsers,
  setCity,
  setCountry,
  setToken,
  setUser,
  setUsers,
} from "../../../redux/actions/auth.action";

describe("Test the auth action file", () => {
  test("should set up set user action object", () => {
    const user = {};
    const action = setUser({ user });
    expect(action).toEqual({ type: "SET_USER", user });
  });

  test("should setup delete user action object", () => {
    const action = deleteUser();
    expect(action).toEqual({ type: "DELETE_USER" });
  });

  test("should set up set token action object", () => {
    const testToken = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      testToken += characters.charAt(randomIndex);
    }
    const action = setToken({ value: testToken });
    expect(action).toEqual({ type: "SET_TOKEN", value: testToken });
  });

  test("should set up delete token action object", () => {
    const action = deleteToken();
    expect(action).toEqual({ type: "DELETE_TOKEN" });
  });

  test("should create an action to set the country", () => {
    const country = ["UK", "India"];
    const action = setCountry({ country });
    expect(action).toEqual({
      type: "SET_COUNTRY",
      country,
    });
  });

  test("should create an action to delete the country", () => {
    const action = deleteCountry();
    expect(action).toEqual({
      type: "DELETE_COUNTRY",
    });
  });

  test("should create an action to set the city", () => {
    const city = ["London", "Birmingham"];
    const action = setCity({ city });
    expect(action).toEqual({
      type: "SET_CITY",
      city,
    });
  });

  test("should create an action to delete the city", () => {
    const action = deleteCity();
    expect(action).toEqual({
      type: "DELETE_CITY",
    });
  });

  test("should create an action to delete users", () => {
    const action = deleteUsers();
    expect(action).toEqual({
      type: "DELETE_USERS",
    });
  });

  test("should create an action to set users", () => {
    const users = [{ username: "abc" }, { username: "def" }];
    const action = setUsers({ users });
    expect(action).toEqual({
      type: "SET_USERS",
      users,
    });
  });
});
