const express = require("express");

const {
  LoginController,
  RegisterController,
  DeleteUserController,
} = require("../controllers/auth.controller");
const { Auth } = require("../middleware/Auth");

const router = express.Router();

router.post("/login", LoginController);
router.post("/signup", RegisterController);
router.delete("/destroyUser", Auth, DeleteUserController);

module.exports = { router };
