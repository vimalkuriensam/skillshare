const { DATA } = require("../db/data");
const {
  AddWorkExperience,
  GetCountries,
  GetCities,
  AddBasicInfo,
  GetSkills,
  GetLanguages,
  AddSkills,
  AddLanguages,
  GetCityById,
} = require("../db/query");
const { FIELDS } = require("../utils");
const { pool } = require("../db/db");

const GetCountryController = async (req, res) => {
  try {
    const { countries } = await GetCountries();
    res.status(200).send({ message: "COUNTRIES FETCHED", countries });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

const GetCityController = async (req, res) => {
  try {
    const id = req.params?.id;
    if (!id) throw { error: "country id not provided" };
    const { cities } = await GetCities({ id });
    res.status(200).send({ message: "CITIES FETCHED", cities });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

const GetCityByIdController = async (req, res) => {
  try {
    const id = req.params?.id;
    if (!id) throw { error: "city id not provided" };
    const { city } = await GetCityById({ id });
    res.status(200).send({ message: "CITY FETCHED", city });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

const InsertBasicInfo = async (req, res) => {
  try {
    const bodyParams = req.body;
    const id = req.user.id;
    const fieldCheck = FIELDS.BASIC_INFO.map((field) =>
      !!bodyParams[field] ? null : field
    ).filter((val) => !!val);
    if (fieldCheck.length)
      throw {
        message: {
          message: "MANDATORY FIELDS MISSING",
          missingFields: fieldCheck,
        },
      };
    const { user, address } = await AddBasicInfo({ ...bodyParams, id });
    res.send({ message: "PROFILE UPDATED", user: { ...user, ...address } });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

const GetBasicInfo = async (req, res) => {
  try {
    const id = req.user.id;
    const {
      rows: [user],
    } = await pool.query(DATA.GET_USER_LEFT_JOINT, [id]);
    res.send({
      message: "USER DETAILS FETCHED",
      user: { ...user },
    });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

const GetAllUserInfo = async (req, res) => {
  try {
    const { rows } = await pool.query(DATA.GET_ALL_USER_LEFT_JOINT);
    res.send({
      message: "USER DETAILS FETCHED",
      users: rows.map(({ password, ...rest }) => ({ ...rest })),
    });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

const InsertWorkExperience = async (req, res) => {
  try {
    const id = req.user.id;
    const { workExperience = null } = req.body;
    if (!workExperience)
      throw { message: "Please provide work experience field" };
    if (workExperience.constructor.name != "Array")
      throw { message: "INVALID WORK EXPERIENCE FORMAT" };
    workExperience.forEach((exp, index) => {
      const fieldCheck = FIELDS.WORK_EXPERIENCE.map((field) =>
        exp[field] == null || exp[field] == undefined ? field : null
      ).filter((val) => !!val);
      if (fieldCheck.length)
        throw {
          message: {
            message: "MANDATORY FIELDS MISSING",
            missingFields: fieldCheck,
            index,
          },
        };
    });
    const user = await AddWorkExperience({ workExperience, id });
    if (user) res.send({ message: "WORK EXPERIENCES ADDED", user });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

const GetAllSkills = async (req, res) => {
  try {
    const { skills } = await GetSkills();
    res.status(200).send({ message: "SKILLS FETCHED", skills });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

const GetAllLanguages = async (req, res) => {
  try {
    const { languages } = await GetLanguages();
    res.status(200).send({ message: "LANGUAGES FETCHED", languages });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

const InsertSkills = async (req, res) => {
  try {
    const id = req.user.id;
    const { skills = null } = req.body;
    if (!skills) throw { message: "Please provide skills field" };
    if (skills.constructor.name != "Array")
      throw { message: "INVALID SKILLS FIELD FORMAT" };
    skills.forEach((skill, index) => {
      const fieldCheck = FIELDS.SKILLS.map((s) =>
        skill[s] == null || skill[s] == undefined ? s : null
      ).filter((val) => !!val);
      if (fieldCheck.length)
        throw {
          message: {
            message: "MANDATORY FIELDS MISSING",
            missingFields: fieldCheck,
            index,
          },
        };
    });
    const user = await AddSkills({ skills, id });
    if (user) res.send({ message: "SKILLS ADDED", user });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

const InsertLanguages = async (req, res) => {
  try {
    const id = req.user.id;
    const { languages = null } = req.body;
    if (!languages) throw { message: "Please provide languages field" };
    if (languages.constructor.name != "Array")
      throw { message: "INVALID LANGUAGES FIELD FORMAT" };
    languages.forEach((language, index) => {
      const fieldCheck = FIELDS.LANGUAGES.map((s) =>
        language[s] == null || language[s] == undefined ? s : null
      ).filter((val) => !!val);
      if (fieldCheck.length)
        throw {
          message: {
            message: "MANDATORY FIELDS MISSING",
            missingFields: fieldCheck,
            index,
          },
        };
    });
    const user = await AddLanguages({ languages, id });
    if (user) res.send({ message: "LANGUAGES ADDED", user });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

module.exports = {
  GetCountryController,
  GetCityController,
  InsertBasicInfo,
  GetBasicInfo,
  GetAllUserInfo,
  InsertWorkExperience,
  InsertSkills,
  InsertLanguages,
  GetAllSkills,
  GetAllLanguages,
  GetCityByIdController,
};
