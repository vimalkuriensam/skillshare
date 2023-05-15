import moment from "moment";
import apiService from "../../api-interceptor/authAxios";
import { deleteUser, setUser } from "./auth.action";

export const addBasicInfo = (user) => async (dispatch) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      dob,
      phone,
      addressLine1,
      addressLine2,
      city,
      pincode,
    } = user;
    const { data, status } = await apiService().post(
      `/api/v1/profile/add-basic-info`,
      {
        firstName,
        middleName,
        lastName,
        dob: moment(dob).format("YYYY-MM-DD"),
        phone,
        addressLine1,
        addressLine2,
        city: city.id,
        pincode,
      }
    );
    if (status == 200) {
      dispatch(deleteUser());
      dispatch(setUser({ user: data["data"]["user"] }));
      return true;
    }
  } catch (e) {
    console.log(e.message);
  }
};

export const addWorkExperience =
  ({ workExperience = [] }) =>
  async (dispatch) => {
    try {
      let we = workExperience.map(
        ({ current, startDate, endDate, city, companyName }) => ({
          companyName,
          startDate: moment(startDate).format("YYYY-MM-DD"),
          endDate: current ? "" : moment(endDate).format("YYYY-MM-DD"),
          current,
          city: city.id,
        })
      );
      const { data, status } = await apiService().post(
        `/api/v1/profile/add-work-experience`,
        { workExperience: we }
      );
      if (status == 200) {
        dispatch(setUser({ user: data["data"]["user"] }));
      }
    } catch (e) {
      console.log(e.message);
    }
  };

export const addSkills =
  ({ skills = [] }) =>
  async (dispatch) => {
    try {
      const skillList = skills.map(({ skill, proficiency }) => ({
        skill: skill.id,
        proficiency,
      }));
      const { data, status } = await apiService().post(
        `/api/v1/profile/add-skills`,
        { skills: skillList }
      );
      if (status == 200) {
        dispatch(deleteUser());
        dispatch(setUser({ user: data["data"]["user"] }));
      }
    } catch (e) {
      console.log(e.message);
    }
  };

export const addLanguages =
  ({ languages = [] }) =>
  async (dispatch) => {
    try {
      const languageList = languages.map(({ language, proficiency }) => ({
        language: language.id,
        proficiency,
      }));
      const { data, status } = await apiService().post(
        `/api/v1/profile/add-languages`,
        { languages: languageList }
      );
      if (status == 200) {
        dispatch(deleteUser());
        dispatch(setUser({ user: data["data"]["user"] }));
      }
    } catch (e) {
      console.log(e.message);
    }
  };

export const decodeUser =
  (user = {}) =>
  async (dispatch) => {
    try {
      const city = await dispatch(getCityById({ id: user.city_id }));
      const workExperience = user.work_experience.filter(
        (item, index, array) =>
          array.findIndex((obj) => obj.id === item.id) === index
      );
      const languages = await Promise.all(
        user.languages
          .filter(
            (item, index, array) =>
              array.findIndex((obj) => obj.id === item.id) === index
          )
          .map(async ({ language_id, proficiency }) => ({
            language_id: await dispatch(getLanguageById({ id: language_id })),
            proficiency,
          }))
      );
      const skills = await Promise.all(
        user.skills
          .filter(
            (item, index, array) =>
              array.findIndex((obj) => obj.id === item.id) === index
          )
          .map(async ({ skill_id, proficiency }) => ({
            skill_id: await dispatch(getSkillById({ id: skill_id })),
            proficiency,
          }))
      );
      return {
        ...user,
        city_id: city,
        languages,
        skills,
        work_experience: workExperience,
      };
    } catch (e) {
      console.log(e.message);
    }
  };

export const getCityById =
  ({ id }) =>
  async (dispatch) => {
    try {
      const { data, status } = await apiService().get(
        `/api/v1/profile/city-by-id/${id}`
      );
      if (status == 200) return data["data"]["city"];
    } catch (e) {
      console.log(e.message);
    }
  };

export const getSkillById =
  ({ id }) =>
  async (dispatch) => {
    try {
      const { data, status } = await apiService().get(
        `/api/v1/profile/skill-by-id/${id}`
      );
      if (status == 200) return data["data"]["skill"];
    } catch (e) {
      console.log(e.message);
    }
  };

export const getLanguageById =
  ({ id }) =>
  async (dispatch) => {
    try {
      const { data, status } = await apiService().get(
        `/api/v1/profile/language-by-id/${id}`
      );
      if (status == 200) return data["data"]["language"];
    } catch (e) {
      console.log(e.message);
    }
  };
