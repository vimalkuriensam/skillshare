const express = require("express");

const {
  LoginController,
  RegisterController,
  DeleteUserController,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/login", LoginController);
router.get("/all", (req, res) => {
  res.send({message: "Get Request"})
})
router.post("/signup", RegisterController);
router.delete("/destroyUser", DeleteUserController);

module.exports = { router };
