import React, { Fragment } from "react";
import {
  Button,
  Calendar,
  Checkbox,
  Dropdown,
  FormInput,
} from "../../../components";

const ProfileForm2 = ({
  displayValues = {},
  workExperience = {},
  errors = {},
  onHandleValue = () => {},
  onAddExperience = () => {},
  onRemoveExperience = () => {},
}) => {
  return (
    <Fragment>
      <div className="row">
        <div className="col-1-of-1">
          <FormInput
            title="Company Name"
            placeholder="Company Name"
            variant="2"
            error={errors?.companyName}
            onHandleText={onHandleValue.bind(this, "companyName")}
            value={workExperience.companyName}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-1-of-2">
          <Calendar placeholder="Start Date" />
        </div>
        <div className="col-1-of-2">
          <Calendar placeholder="End Date" />
        </div>
      </div>
      <div className="row">
        <div className="col-1-of-2">&nbsp;</div>
        <div className="col-1-of-2">
          <Checkbox
            id="current-experience"
            value={workExperience.current}
            checkBoxInput={onHandleValue.bind(this, "current")}
            variant="2"
          >
            I currently work here
          </Checkbox>
        </div>
      </div>
      <div className="row">
        <div className="col-1-of-2">
          <Dropdown
            placeholder="Country"
            value={workExperience.country}
            contents={displayValues?.country}
            name="name"
            onHandleDropdownValue={onHandleValue.bind(this, "country")}
            variant="1"
          />
        </div>
        <div className="col-1-of-2">
          <Dropdown
            placeholder="City"
            error={errors?.city}
            value={workExperience.city}
            contents={displayValues?.city}
            name="name"
            onHandleDropdownValue={onHandleValue.bind(this, "city")}
            variant="1"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-1-of-2">
          <Button
            variant="4-1"
            onButtonClick={onRemoveExperience}
            content="REMOVE EXPERIENCE"
          />
        </div>
        <div className="col-1-of-2">
          <Button
            variant="5-1"
            onButtonClick={onAddExperience}
            content="ADD EXPERIENCE"
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ProfileForm2;
