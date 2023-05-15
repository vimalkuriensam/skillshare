const validator = require("validator");
const bcrypt = require("bcrypt");

const {
  InsertUser,
  VerifyCredentials,
  DeleteUserById,
} = require("../db/query");

const LoginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { user, token } = await VerifyCredentials({ username, password });
    res.status(200).send({ message: "USER_VERIFIED", user, token });
  } catch (e) {
    console.log(e.message);
    res.status(400).send({ error: e.message });
  }
};

const RegisterController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    if (!validator.isEmail(email)) throw { message: "INVALID_EMAIL_FORMAT" };
    const { user, token } = await InsertUser({
      username,
      email,
      password: hashedPassword,
    });
    if (user) res.status(201).send({ message: "USER CREATED", user, token });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

const DeleteUserController = async (req, res) => {
  const id = req.user.id;
  const resp = DeleteUserById({ id });
  if (resp) res.send({ message: "USER DELETED" });
  else throw { message: "UNABLE TO DELETE USER" };
  try {
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

module.exports = { DeleteUserController, LoginController, RegisterController };
