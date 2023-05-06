const express = require("express");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    res.send();
  } catch (e) {
    console.log(e);
  }
});

module.exports = { router };
