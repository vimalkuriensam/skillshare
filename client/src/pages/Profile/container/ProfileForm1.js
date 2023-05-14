import React, { Fragment } from "react";
import { Calendar, Dropdown, FormInput } from "../../../components";

const ProfileForm1 = ({
  userValue,
  errors,
  displayValues = [],
  onHandleValue = () => {},
}) => {
  return (
    <Fragment>
      <div className="row">
        <div className="col-1-of-3">
          <FormInput
            title="First Name"
            placeholder="First Name"
            variant="2"
            error={errors?.firstName}
            onHandleText={onHandleValue.bind(this, "firstName")}
            value={userValue.firstName}
          />
        </div>
        <div className="col-1-of-3">
          <FormInput
            title="Middle Name"
            placeholder="Middle Name"
            variant="2"
            onHandleText={onHandleValue.bind(this, "middleName")}
            value={userValue.middleName}
          />
        </div>
        <div className="col-1-of-3">
          <FormInput
            title="Last Name"
            placeholder="Last Name"
            variant="2"
            error={errors?.lastName}
            onHandleText={onHandleValue.bind(this, "lastName")}
            value={userValue.lastName}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-1-of-2">
          <Calendar
            placeholder="Date Of Birth"
            value={userValue.dob}
            error={errors?.dob}
            onHandleCalendar={onHandleValue.bind(this, "dob")}
          />
        </div>
        <div className="col-1-of-2">
          <FormInput
            title="Phone Number"
            placeholder="Phone Number"
            variant="2"
            error={errors?.phone}
            onHandleText={onHandleValue.bind(this, "phone")}
            value={userValue.phone}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-1-of-1">
          <FormInput
            title="Address Line 1"
            placeholder="Address Line 1"
            variant="2"
            error={errors?.addressLine1}
            onHandleText={onHandleValue.bind(this, "addressLine1")}
            value={userValue.addressLine1}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-1-of-1">
          <FormInput
            title="Address Line 2"
            placeholder="Address Line 2"
            variant="2"
            onHandleText={onHandleValue.bind(this, "addressLine2")}
            value={userValue.addressLine2}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-1-of-3">
          <Dropdown
            placeholder="Country"
            value={userValue.country}
            contents={displayValues.country}
            name="name"
            onHandleDropdownValue={onHandleValue.bind(this, "country")}
            variant="1"
          />
        </div>
        <div className="col-1-of-3">
          <Dropdown
            placeholder="City"
            error={errors?.city}
            value={userValue.city}
            contents={displayValues.city}
            name="name"
            onHandleDropdownValue={onHandleValue.bind(this, "city")}
            variant="1"
          />
        </div>
        <div className="col-1-of-3">
          <FormInput
            title="Pincode"
            placeholder="Pincode"
            variant="2"
            error={errors?.pincode}
            onHandleText={onHandleValue.bind(this, "pincode")}
            value={userValue.pincode}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ProfileForm1;
