import React, { Fragment } from "react";
import { Button, Dropdown } from "../../../components";

const ProfileForm2 = ({
  onAddExperience = () => {},
  onRemoveExperience = () => {},
}) => {
  return (
    <Fragment>
      <div className="row">
        <div className="col-1-of-2">
          <Dropdown placeholder="Language" />
        </div>
        <div className="col-1-of-2">
          <Dropdown placeholder="Proficiency" />
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
