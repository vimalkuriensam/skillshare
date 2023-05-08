const { DATA } = require("./data");
const { pool } = require("./db");

const InsertUser = async ({ username, password, email }) => {
  try {
    const result = await pool.query(DATA.INSERT_USER, [
      username,
      email,
      password,
    ]);
    if (result) {
      const user = await SearchUserByUsername({ username });
      return { user };
    }
  } catch (e) {
    console.log("in query", e.detail);
    throw { message: e.detail };
  }
};

const SearchUserByUsername = async ({ username }) => {
  try {
    const { rows } = await pool.query(DATA.GET_USER_USERNAME, [username]);
    const user = rows[0];
    console.log("user", user);
    delete user["password"];
    return user;
  } catch (e) {
    console.log("in query", e.detail);
    throw { message: e.detail };
  }
};

module.exports = { InsertUser };
