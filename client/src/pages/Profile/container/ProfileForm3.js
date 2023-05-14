import React, { Fragment } from "react";
import { Button, Dropdown } from "../../../components";

const ProfileForm3 = ({ onAddSkill = () => {}, onRemoveSkill = () => {} }) => {
  return (
    <Fragment>
      <div className="row">
        <div className="col-1-of-2">
          <Dropdown placeholder="Skills" />
        </div>
        <div className="col-1-of-2">
          <Dropdown placeholder="Proficiency" />
        </div>
      </div>
      <div className="row">
        <div className="col-1-of-2">
          <Button
            variant="4-1"
            onButtonClick={onRemoveSkill}
            content="REMOVE SKILL"
          />
        </div>
        <div className="col-1-of-2">
          <Button
            variant="5-1"
            onButtonClick={onAddSkill}
            content="ADD SKILL"
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ProfileForm3;
