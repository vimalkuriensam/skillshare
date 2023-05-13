import React, { useState } from "react";
import { FormInput, Stepper } from "../../components";
import Dropdown from "../../components/atoms/dropdown/Dropdown";
import ProfileForm1 from "./container/ProfileForm1";

const Profile = () => {
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
    </section>
  );
};

export default Profile;
