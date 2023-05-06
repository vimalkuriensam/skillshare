const validator = require("validator");

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
    if (!validator.isEmail(email)) throw { message: "INVALID_EMAIL_FORMAT" };
    const result = await InsertUser({ username, email, password });
    if (result) res.status(201).send({ message: "USER CREATED" });
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
