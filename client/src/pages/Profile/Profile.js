import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Stepper } from "../../components";
import { getCities, getCountries } from "../../redux/actions/auth.action";
import ProfileAction from "./container/ProfileAction";
import ProfileForm1 from "./container/ProfileForm1";

const Profile = ({ dispatch, countries = [], cities = [] }) => {
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
  const [displayValues, setDisplayValues] = useState({
    country: [],
    city: [],
  });

  useEffect(() => {
    dispatch(getCountries());
  }, []);

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
  return (
    <section className="section-profile">
      <Stepper
        steps={["Basic Info", "Work Experience", "Skills", "Languages"]}
        currentStep={currentStep}
      />
      <div className="profile__formContainer">
        <ProfileForm1
          userValue={userValue}
          displayValues={displayValues}
          onHandleValue={onHandleValue}
        />
      </div>
      <ProfileAction />
    </section>
  );
};

const mapStateToProps = ({ auth: { location } }) => ({
  countries: location.country,
  cities: location.city,
});

export default connect(mapStateToProps)(Profile);
