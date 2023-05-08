const jwt = require("jsonwebtoken");

const generateAuthToken = ({ ...stmts }) =>
  jwt.sign({ ...stmts }, process.env.JWT_SECRET);

module.exports = { generateAuthToken };
