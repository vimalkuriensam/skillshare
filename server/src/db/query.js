const { generateAuthToken, passwordMatch } = require("../utils");

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
      const token = generateAuthToken({
        id: user.user_id,
        username: user.username,
      });
      return { user, token };
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
    delete user["password"];
    return user;
  } catch (e) {
    console.log("in query", e.detail);
    throw { message: e.detail };
  }
};

const SearchUserById = async ({ id }) => {
  try {
    const { rows } = await pool.query(DATA.GET_USER_ID, [id]);
    const user = rows[0];
    delete user["password"];
    return user;
  } catch (e) {
    throw { message: e.message };
  }
};

const VerifyCredentials = async ({ username, password }) => {
  try {
    const { rows } = await pool.query(DATA.GET_USER_USERNAME, [username]);
    const user = rows[0];
    if (!user) throw new Error("INVALID_CREDENTIALS");
    const isMatch = await passwordMatch({
      password: password,
      hashedPassword: user.password,
    });
    if (!isMatch) throw new Error("INVALID_CREDENTIALS");
    delete user["password"];
    const token = generateAuthToken({
      id: user.user_id,
      username: user.username,
    });
    return { user, token };
  } catch (e) {
    throw e;
  }
};

const GetCountries = async () => {
  try {
    const { rows: countries } = await pool.query(DATA.GET_COUNTRIES);
    if (!countries) return { countries: [] };
    return { countries };
  } catch (e) {
    throw e;
  }
};

module.exports = {
  InsertUser,
  SearchUserByUsername,
  SearchUserById,
  VerifyCredentials,
  GetCountries,
};
