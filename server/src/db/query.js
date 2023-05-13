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
        id: user.id,
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

const GetCities = async ({ id }) => {
  try {
    const { rows: cities } = await pool.query(DATA.GET_CITIES, [id]);
    return { cities };
  } catch (e) {
    throw e;
  }
};

const AddBasicInfo = async (values) => {
  try {
    const {
      id,
      firstName,
      middleName = "",
      lastName,
      dob,
      phone,
      addressLine1,
      addressLine2,
      city,
      pincode,
    } = values;
    const {
      rows: [user],
    } = await pool.query(DATA.INSERT_BASIC_INFO, [
      firstName,
      middleName,
      lastName,
      dob,
      phone,
      id,
    ]);
    if (user) {
      delete user["password"];
      const {
        rows: [address],
      } = await pool.query(DATA.INSERT_ADDRESS_INFO, [
        addressLine1,
        addressLine2,
        city,
        pincode,
        id,
      ]);
      return { user, address };
    } else throw { message: "SQL ERROR OCCURED..." };
  } catch (e) {
    throw e;
  }
};

const GetAddress = async ({ id }) => {
  try {
    const {
      rows: [address],
    } = await pool.query(DATA.GET_ADDRESS, [id]);
    return { address };
  } catch (e) {
    throw e;
  }
};

module.exports = {
  AddBasicInfo,
  InsertUser,
  SearchUserByUsername,
  SearchUserById,
  VerifyCredentials,
  GetAddress,
  GetCountries,
  GetCities,
};
