import React, { useState } from "react";
import { FormInput, Stepper } from "../../components";

const Profile = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userValue, setUserValue] = useState({
    firstName: "",
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
      {/* <FormInput
        title="First Name"
        placeholder="First Name"
        variant="2"
        onHandleText={onHandleValue.bind(this, "firstName")}
        value={userValue.firstName}
      /> */}
    </section>
  );
};

export default Profile;
