import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { Stepper } from "../../components";
import {
  getCities,
  getCountries,
  getUserInfo,
} from "../../redux/actions/auth.action";
import {
  addBasicInfo,
  addWorkExperience,
} from "../../redux/actions/profile.action";
import { ObjectCopy } from "../../utils/data";
import ProfileAction from "./container/ProfileAction";
import ProfileForm1 from "./container/ProfileForm1";
import ProfileForm2 from "./container/ProfileForm2";
import ProfileForm3 from "./container/ProfileForm3";
import ProfileForm4 from "./container/ProfileForm4";
import {
  DISPLAY_VALUES_CONSTANT,
  PROFILE_MANDATORY_FIELDS,
  USER_FIELDS,
} from "./data";

const Profile = ({ dispatch, user = {} }) => {
  const [currentStep, setCurrentStep] = useState(
    parseInt(user.info_state) || 1
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
    workExperience: [{ ...USER_FIELDS.workExperience }],
    skills: [{ ...USER_FIELDS.skills }],
    languages: [{ ...USER_FIELDS.languages }],
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
    ...DISPLAY_VALUES_CONSTANT,
  });

  useEffect(() => {
    dispatch(getUserInfo());
    fetchInfo();
  }, []);

  useEffect(() => {
    if (user.info_state != currentStep) setCurrentStep(user.info_state);
  }, [user.info_state]);

  useEffect(() => {
    fetchInfo();
  }, [JSON.stringify(displayValues)]);

  const fetchInfo = async () => {
    switch (user.info_state) {
      case 1:
      case 2:
        const country = await dispatch(getCountries());
        if (country.length) {
          if (user.info_state == 1)
            setDisplayValues((prevState) => ({
              ...prevState,
              basicInfo: { ...prevState.basicInfo, country },
            }));
          else {
            const workExperience = ObjectCopy(displayValues["workExperience"]);
            workExperience[workExperience.length - 1]["country"] = country;
            setDisplayValues((prevState) => ({ ...prevState, workExperience }));
          }
        }
    }
  };

  const onHandleValue = async (key, { target: { value } }) => {
    setUserValue((prevState) => ({
      ...prevState,
      [key]: value,
      ...(key == "country" && { city: "" }),
    }));
    if (key == "country") {
      const cities = await dispatch(getCities({ countryId: value.id }));
      setDisplayValues((prevState) => ({
        ...prevState,
        basicInfo: { ...prevState, city: cities },
      }));
    }
  };

  const onHandleProficiency = async (tableKey, key, { target: { value } }) => {
    const tableValue = JSON.parse(JSON.stringify(userValue[tableKey]));
    const arrLength = tableValue.length - 1;
    tableValue[arrLength][key] = value;
    setUserValue((prevState) => ({ ...prevState, [tableKey]: tableValue }));
    if (key == "country") {
      const cities = await dispatch(getCities({ countryId: value.id }));
      if (cities.length) {
        const displayValueCopy = JSON.parse(JSON.stringify(displayValues));
        displayValueCopy[tableKey][arrLength].city = cities;
        setDisplayValues(displayValueCopy);
      }
    }
  };

  const onChangeProficiency = (tableKey, key, index) => {
    const displayTableData = ObjectCopy(DISPLAY_VALUES_CONSTANT[tableKey]);
    if (key > 0) {
      setUserValue((prevState) => ({
        ...prevState,
        [tableKey]: [...prevState[tableKey], { ...USER_FIELDS[tableKey] }],
      }));
      setDisplayValues((prevState) => ({
        ...prevState,
        [tableKey]: [...prevState[tableKey], { ...displayTableData }],
      }));
    } else {
      let userProf = ObjectCopy(userValue[tableKey]);
      let displayProf = ObjectCopy(displayValues[tableKey]);
      userProf.splice(index, 1);
      displayProf.splice(index, 1);
      setUserValue((prevState) => ({ ...prevState, [tableKey]: userProf }));
      setDisplayValues((prevState) => ({
        ...prevState,
        [tableKey]: displayProf,
      }));
    }
  };

  const validate = (value) => {
    const error = {};
    const { fields: mandatoryFields, error: errorFields } =
      PROFILE_MANDATORY_FIELDS[user.info_state];
    mandatoryFields.forEach((key) => {
      if (value == 1) {
        if (!userValue[key]) error[key] = errorFields[key];
      } else if (value == 2) {
        const workExperience = userValue["workExperience"];
        const endExperience = workExperience[workExperience.length - 1];
        if (!endExperience[key]) error[key] = errorFields[key];
      }
    });
    return error;
  };

  const onHandleSubmit = async () => {
    try {
      const errors = validate(parseInt(user.info_state));
      if (!Object.keys(errors).length) {
        switch (parseInt(user.info_state)) {
          case 1:
            await dispatch(addBasicInfo(userValue));
          case 2:
            await dispatch(addWorkExperience(userValue));
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
            displayValues={displayValues.basicInfo}
            onHandleValue={onHandleValue}
          />
        );
      case 2:
        return (
          <ProfileForm2
            workExperiences={userValue.workExperience}
            errors={errorValue}
            displayValues={displayValues.workExperience}
            onHandleValue={onHandleProficiency.bind(this, "workExperience")}
            onChangeProficiency={onChangeProficiency.bind(
              this,
              "workExperience"
            )}
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

const mapStateToProps = ({ auth: { user } }) => ({ user });

export default connect(mapStateToProps)(Profile);
