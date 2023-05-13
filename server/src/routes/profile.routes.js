const express = require("express");

const { GetCityController, GetCountryController } = require("../controllers/profile.controller");
const { Auth } = require("../middleware/Auth");

const router = express.Router();

router.get("/city/:id", Auth, GetCityController);
router.get("/country", Auth, GetCountryController);

module.exports = { router };
