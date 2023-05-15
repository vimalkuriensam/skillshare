const express = require("express");

const {
  GetCityController,
  GetCountryController,
  InsertBasicInfo,
  GetBasicInfo,
  InsertWorkExperience,
  GetAllUserInfo,
  InsertSkills,
  InsertLanguages,
} = require("../controllers/profile.controller");
const { Auth } = require("../middleware/Auth");

const router = express.Router();

router.get("/city/:id", Auth, GetCityController);
router.get("/country", Auth, GetCountryController);
router.post("/add-basic-info", Auth, InsertBasicInfo);
router.get("/get-user-info", Auth, GetBasicInfo);
router.get("/get-all-users", Auth, GetAllUserInfo);
router.post("/add-work-experience", Auth, InsertWorkExperience);
router.post("/add-skills", Auth, InsertSkills);
router.post("/add-languages", Auth, InsertLanguages);

module.exports = { router };
