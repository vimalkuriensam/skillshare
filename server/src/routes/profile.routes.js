const express = require("express");

const {
  GetCityController,
  GetCountryController,
  InsertBasicInfo,
  GetBasicInfo,
  InsertWorkExperience,
  GetAllUserInfo,
} = require("../controllers/profile.controller");
const { Auth } = require("../middleware/Auth");

const router = express.Router();

router.get("/city/:id", Auth, GetCityController);
router.get("/country", Auth, GetCountryController);
router.post("/add-basic-info", Auth, InsertBasicInfo);
router.get("/get-user-info", Auth, GetBasicInfo);
router.get("/get-all-users", Auth, GetAllUserInfo);
router.post("/add-work-experience", Auth, InsertWorkExperience);

module.exports = { router };
