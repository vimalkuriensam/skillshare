const { generateAuthToken, passwordMatch } = require("../utils");

const { DATA } = require("./data");
const { pool } = require("./db");

const InsertUser = async ({ username, password, email }) => {
  try {
    const result = await pool.query(DATA.INSERT_USER, [
      username,
      email,
      password,
    ]);
    if (result) {
      const user = await SearchUserByUsername({ username });
      const token = generateAuthToken({
        id: user.id,
        username: user.username,
      });
      return { user, token };
    }
  } catch (e) {
    console.log("in query", e.detail);
    throw { message: e.detail };
  }
};

const DeleteUsers = async () => {
  try {
    const resp = await pool.query(DATA.DELETE_ALL_USERS);
    if (resp) return true;
  } catch (e) {
    throw { message: e.message };
  }
};

const DeleteUserById = async ({ id }) => {
  try {
    const resp = await pool.query(DATA.DELETE_USER_BY_ID, [id]);
    if (resp) return true;
  } catch (e) {
    throw { message: e.message };
  }
};

const SearchUserByUsername = async ({ username }) => {
  try {
    const { rows } = await pool.query(DATA.GET_USER_USERNAME, [username]);
    const user = rows[0];
    delete user["password"];
    return user;
  } catch (e) {
    console.log("in query", e.detail);
    throw { message: e.detail };
  }
};

const SearchUserById = async ({ id }) => {
  try {
    const { rows } = await pool.query(DATA.GET_USER_ID, [id]);
    const user = rows[0];
    delete user["password"];
    return user;
  } catch (e) {
    throw { message: e.message };
  }
};

const VerifyCredentials = async ({ username, password }) => {
  try {
    const { rows } = await pool.query(DATA.GET_USER_USERNAME, [username]);
    const user = rows[0];
    if (!user) throw new Error("INVALID_CREDENTIALS");
    const isMatch = await passwordMatch({
      password: password,
      hashedPassword: user.password,
    });
    if (!isMatch) throw new Error("INVALID_CREDENTIALS");
    delete user["password"];
    const token = generateAuthToken({
      id: user.id,
      username: user.username,
    });
    return { user, token };
  } catch (e) {
    throw e;
  }
};

const GetCountries = async () => {
  try {
    const { rows: countries } = await pool.query(DATA.GET_COUNTRIES);
    if (!countries) return { countries: [] };
    return { countries };
  } catch (e) {
    throw e;
  }
};

const GetCities = async ({ id }) => {
  try {
    const { rows: cities } = await pool.query(DATA.GET_CITIES, [id]);
    return { cities };
  } catch (e) {
    throw e;
  }
};

const GetCityById = async ({ id }) => {
  try {
    const {
      rows: [{ name }],
    } = await pool.query(DATA.GET_CITY, [id]);
    return { city: name };
  } catch (e) {
    throw e;
  }
};

const GetSkills = async () => {
  try {
    const { rows: skills } = await pool.query(DATA.GET_ALL_SKILLS);
    if (!skills) return { skills: [] };
    return { skills };
  } catch (e) {
    throw e;
  }
};

const GetLanguages = async () => {
  try {
    const { rows: languages } = await pool.query(DATA.GET_ALL_LANGUAGES);
    if (!languages) return { languages: [] };
    return { languages };
  } catch (e) {
    throw e;
  }
};

const AddBasicInfo = async (values) => {
  try {
    const {
      id,
      firstName,
      middleName = "",
      lastName,
      dob,
      phone,
      addressLine1,
      addressLine2,
      city,
      pincode,
    } = values;
    const {
      rows: [user],
    } = await pool.query(DATA.INSERT_BASIC_INFO, [
      firstName,
      middleName,
      lastName,
      dob,
      phone,
      id,
    ]);
    if (user) {
      delete user["password"];
      const {
        rows: [address],
      } = await pool.query(DATA.INSERT_ADDRESS_INFO, [
        addressLine1,
        addressLine2,
        city,
        pincode,
        id,
      ]);
      return { user, address };
    } else throw { message: "SQL ERROR OCCURED..." };
  } catch (e) {
    throw e;
  }
};

const GetAddress = async ({ id }) => {
  try {
    const {
      rows: [address],
    } = await pool.query(DATA.GET_ADDRESS, [id]);
    return { address };
  } catch (e) {
    throw e;
  }
};

const AddWorkExperience = async ({ workExperience = [], id }) => {
  try {
    let exp = "";
    workExperience.forEach(
      ({ companyName, startDate, endDate, current, city }, index) => {
        if (!index)
          exp += `'${companyName}', '${startDate}', '${endDate}', '${current}', '${city}', '${id}')`;
        else
          exp += `, ('${companyName}', '${startDate}', '${endDate}', '${current}', '${city}', '${id}' )`;
      }
    );
    exp = `${DATA.INSERT_WORK_EXPERIENCE}${exp};`;
    const deleteResp = await pool.query(DATA.DELETE_WORK_EXPERIENCE, [id]);
    if (deleteResp) {
      const resp = await pool.query(exp);
      if (resp) {
        await pool.query(DATA.UPDATE_INFO_STATE, [3, id]);
        const {
          rows: [user],
        } = await pool.query(DATA.GET_USER_LEFT_JOINT, [id]);
        if (user) {
          delete user["password"];
          return user;
        }
      } else throw { message: "ERROR_ADDING_WORK_EXPERIENCES" };
    } else throw { message: "ERROR_DELETING_WORK_EXPERIENCES" };
  } catch (e) {
    throw e;
  }
};

const AddSkills = async ({ skills = [], id }) => {
  try {
    let s = "";
    skills.forEach(({ skill, proficiency }, index) => {
      if (!index) s += `'${skill}', '${proficiency}', '${id}')`;
      else s += `, ('${skill}', '${proficiency}', '${id}')`;
    });
    s = `${DATA.INSERT_USER_SKILLS}${s};`;
    const deleteResp = await pool.query(DATA.DELETE_SKILLS, [id]);
    if (deleteResp) {
      const resp = await pool.query(s);
      if (resp) {
        await pool.query(DATA.UPDATE_INFO_STATE, [4, id]);
        const {
          rows: [user],
        } = await pool.query(DATA.GET_USER_LEFT_JOINT, [id]);
        if (user) {
          delete user["password"];
          return user;
        }
      } else throw { message: "ERROR_ADDING_SKILLS" };
    } else throw { message: "ERROR_DELETING_SKILLS" };
  } catch (e) {
    throw e;
  }
};

const AddLanguages = async ({ languages = [], id }) => {
  try {
    let s = "";
    languages.forEach(({ language, proficiency }, index) => {
      if (!index) s += `'${language}', '${proficiency}', '${id}')`;
      else s += `, ('${language}', '${proficiency}', '${id}')`;
    });
    s = `${DATA.INSERT_USER_LANGUAGES}${s};`;
    const deleteResp = await pool.query(DATA.DELETE_LANGUAGES, [id]);
    if (deleteResp) {
      const resp = await pool.query(s);
      if (resp) {
        await pool.query(DATA.UPDATE_INFO_STATE, [5, id]);
        const {
          rows: [user],
        } = await pool.query(DATA.GET_USER_LEFT_JOINT, [id]);
        if (user) {
          delete user["password"];
          return user;
        }
      } else throw { message: "ERROR_ADDING_SKILLS" };
    } else throw { message: "ERROR_DELETING_SKILLS" };
  } catch (e) {
    throw e;
  }
};

const GetWorkExperience = async ({ id }) => {
  try {
    const { rows = [] } = await pool.query(DATA.GET_WORK_EXPERIENCE, [id]);
    return { workExperience: rows };
  } catch (e) {
    throw e;
  }
};

module.exports = {
  AddBasicInfo,
  InsertUser,
  SearchUserByUsername,
  SearchUserById,
  VerifyCredentials,
  GetAddress,
  GetCountries,
  GetCities,
  AddWorkExperience,
  GetWorkExperience,
  GetLanguages,
  GetSkills,
  AddSkills,
  AddLanguages,
  DeleteUsers,
  DeleteUserById,
  GetCityById,
};
