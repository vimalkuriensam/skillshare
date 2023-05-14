import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Stepper } from "../../components";
import {
  getCities,
  getCountries,
  getUserInfo,
} from "../../redux/actions/auth.action";
import { addBasicInfo } from "../../redux/actions/profile.action";
import ProfileAction from "./container/ProfileAction";
import ProfileForm1 from "./container/ProfileForm1";
import ProfileForm2 from "./container/ProfileForm2";
import ProfileForm3 from "./container/ProfileForm3";
import ProfileForm4 from "./container/ProfileForm4";
import { PROFILE_MANDATORY_FIELDS } from "./data";

const Profile = ({ dispatch, countries = [], cities = [], user = {} }) => {
  const [currentStep, setCurrentStep] = useState(
    3//parseInt(user.info_state) || 1
  );
  const [userValue, setUserValue] = useState({
    firstName: "" || user?.first_name,
    middleName: "" || user?.middle_name,
    lastName: "" || user?.last_name,
    dob: "" || user?.dob,
    email: "" || user?.email,
    phone: "" || user?.phone,
    addressLine1: "" || user?.address_line1,
    addressLine2: "" || user?.address_line2,
    city: "" || user?.city,
    country: "",
    pincode: "" || user?.pincode,
    workExperience: [
      {
        companyName: "",
        startDate: "",
        endDate: "",
        current: false,
        city: "",
        summary: "",
      },
    ],
    skills: [
      {
        skill: "",
        proficiency: "",
      },
    ],
    languages: [{ language: "", proficiency: "" }],
  });

  const [errorValue, setErrorValue] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    country: "",
    pincode: "",
  });
  const [displayValues, setDisplayValues] = useState({
    country: [],
    city: [],
  });

  useEffect(() => {
    dispatch(getUserInfo());
    dispatch(getCountries());
  }, []);
  
  // useEffect(() => {
  //   if (user.info_state != currentStep) setCurrentStep(3); //user.info_state
  // }, [user.info_state]);

  useEffect(() => {
    setDisplayValues((prevState) => ({
      ...prevState,
      country: countries,
      city: cities,
    }));
  }, [JSON.stringify(countries), JSON.stringify(cities)]);

  const onHandleValue = (key, { target: { value } }) => {
    setUserValue((prevState) => ({
      ...prevState,
      [key]: value,
      ...(key == "country" && { city: "" }),
    }));
    if (key == "country") {
      dispatch(getCities({ countryId: value.id }));
    }
  };

  const validate = () => {
    const error = {};
    const { fields: mandatoryFields, error: errorFields } =
      PROFILE_MANDATORY_FIELDS[user.info_state];
    mandatoryFields.forEach((key) => {
      if (!userValue[key]) error[key] = errorFields[key];
    });
    return error;
  };

  const onHandleSubmit = async () => {
    try {
      const errors = validate();
      if (!Object.keys(errors).length) {
        console.log(user.info_state);
        switch (parseInt(user.info_state)) {
          case 1:
            await dispatch(addBasicInfo(userValue));
        }
      } else setErrorValue((prevState) => ({ ...prevState, ...errors }));
    } catch (e) {
      console.log(e.message);
    }
  };

  const getForm = () => {
    switch (currentStep) {
      case 1:
        return (
          <ProfileForm1
            userValue={userValue}
            errors={errorValue}
            displayValues={displayValues}
            onHandleValue={onHandleValue}
          />
        );
      case 2:
        return (
          <ProfileForm2
            workExperience={userValue.workExperience}
            errors={errorValue}
            onHandleValue={onHandleValue}
          />
        );
      case 3:
        return (
          <ProfileForm3
            skills={userValue.skills}
            errors={errorValue}
            onHandleValue={onHandleValue}
          />
        );
      case 4:
        return <ProfileForm4 />;
    }
  };

  return (
    <section className="section-profile">
      <Stepper
        steps={["Basic Info", "Work Experience", "Skills", "Languages"]}
        currentStep={currentStep}
      />
      <div className="profile__formContainer">{getForm()}</div>
      <ProfileAction onSubmitForm={onHandleSubmit} />
    </section>
  );
};

const mapStateToProps = ({ auth: { location, user } }) => ({
  user,
  countries: location.country,
  cities: location.city,
});

export default connect(mapStateToProps)(Profile);
