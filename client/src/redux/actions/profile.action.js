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
