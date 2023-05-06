const { DATA } = require("./data");
const { pool } = require("./db");

const InsertUser = async ({ username, password, email }) => {
  try {
    const result = await pool.query(DATA.INSERT_USER, [
      username,
      email,
      password,
    ]);
    if (result) return true;
  } catch (e) {
    console.log("in query", e.detail);
    throw { message: e.detail };
  }
};

module.exports = { InsertUser };
