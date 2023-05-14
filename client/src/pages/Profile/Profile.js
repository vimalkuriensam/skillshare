import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Stepper } from "../../components";
import { getCities, getCountries } from "../../redux/actions/auth.action";
import ProfileAction from "./container/ProfileAction";
import ProfileForm1 from "./container/ProfileForm1";

const Profile = ({ dispatch }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userValue, setUserValue] = useState({
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

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  const onHandleValue = (key, { target: { value } }) => {
    setUserValue((prevState) => ({ ...prevState, [key]: value }));
  };
  return (
    <section className="section-profile">
      <Stepper
        steps={["Basic Info", "Work Experience", "Skills", "Languages"]}
        currentStep={currentStep}
      />
      <div className="profile__formContainer">
        <ProfileForm1 userValue={userValue} onHandleValue={onHandleValue} />
      </div>
      <ProfileAction />
    </section>
  );
};

export default connect()(Profile);
