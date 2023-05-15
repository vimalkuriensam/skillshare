const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateAuthToken = ({ ...stmts }) =>
  jwt.sign({ ...stmts }, process.env.JWT_SECRET);

const passwordMatch = async ({ password, hashedPassword }) =>
  await bcrypt.compare(password, hashedPassword);

const FIELDS = {
  BASIC_INFO: [
    "firstName",
    "lastName",
    "dob",
    "phone",
    "addressLine1",
    "city",
    "pincode",
  ],
  WORK_EXPERIENCE: ["companyName", "startDate", "current", "city"],
  SKILLS: ["skill", "proficiency"],
  LANGUAGES: ["language", "proficiency"],
};

module.exports = { generateAuthToken, passwordMatch, FIELDS };
