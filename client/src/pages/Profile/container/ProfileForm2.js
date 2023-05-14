import React, { Fragment } from "react";
import {
  Button,
  Calendar,
  Checkbox,
  Dropdown,
  FormInput,
} from "../../../components";
import { PROFILE_MANDATORY_FIELDS } from "../data";

const ProfileForm2 = ({
  displayValues = {},
  workExperiences = [],
  errors = {},
  onHandleValue = () => {},
  onChangeProficiency = () => {},
}) => {
  const isAddExpDisabled = () => {
    const lastExp = workExperiences[workExperiences.length - 1];
    const isFieldComplete = PROFILE_MANDATORY_FIELDS[2].fields.every(
      (field) => !!lastExp[field]
    );
    const lastWorkingDate = (function () {
      if (!lastExp.current && !!lastExp.endDate) return true;
      else if (lastExp.current) return true;
      return false;
    })();
    if (isFieldComplete && lastWorkingDate) return true;
    return false;
  };
  return (
    <Fragment>
      {workExperiences.map((workExperience, index) => (
        <Fragment key={index}>
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
              <Calendar
                placeholder="Start Date"
                value={workExperience.startDate}
                onHandleCalendar={onHandleValue.bind(this, "startDate")}
              />
            </div>
            <div className="col-1-of-2">
              <Calendar
                placeholder="End Date"
                value={workExperience.endDate}
                onHandleCalendar={onHandleValue.bind(this, "endDate")}
              />
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
                contents={displayValues[index]?.country}
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
                contents={displayValues[index]?.city}
                name="name"
                onHandleDropdownValue={onHandleValue.bind(this, "city")}
                variant="1"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-1-of-2">
              <Button
                disabled={!(workExperiences.length > 1)}
                variant="4-1"
                onButtonClick={onChangeProficiency.bind(this, -1, index)}
                content="REMOVE EXPERIENCE"
              />
            </div>
            <div className="col-1-of-2">
              <Button
                disabled={!isAddExpDisabled()}
                variant="5-1"
                onButtonClick={onChangeProficiency.bind(this, 1, index)}
                content="ADD EXPERIENCE"
              />
            </div>
          </div>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default ProfileForm2;
