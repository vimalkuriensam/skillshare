const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateAuthToken = ({ ...stmts }) =>
  jwt.sign({ ...stmts }, process.env.JWT_SECRET);

const passwordMatch = async ({ password, hashedPassword }) =>
  await bcrypt.compare(password, hashedPassword);

module.exports = { generateAuthToken, passwordMatch };
