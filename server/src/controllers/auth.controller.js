const validator = require("validator");
const bcrypt = require("bcrypt");

const { InsertUser } = require("../db/query");

const LoginController = async (req, res) => {
  try {
  } catch (e) {
    console.log(e.message);
  }
};

const RegisterController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    if (!validator.isEmail(email)) throw { message: "INVALID_EMAIL_FORMAT" };
    const { user } = await InsertUser({
      username,
      email,
      password: hashedPassword,
    });
    if (user) res.status(201).send({ message: "USER CREATED", user });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

const DeleteUserController = async (req, res) => {
  try {
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = { DeleteUserController, LoginController, RegisterController };
