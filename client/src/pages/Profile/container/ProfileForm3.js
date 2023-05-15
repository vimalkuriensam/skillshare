import React, { Fragment } from "react";
import { Button, Dropdown } from "../../../components";

const ProfileForm3 = ({
  displayValues = [],
  skills = [],
  onHandleValue = () => {},
  onChangeProficiency = () => {},
}) => {
  const isAddSkillDisabled = (index) => {
    const lastSkill = skills[skills.length - 1];
    if (lastSkill.skill && lastSkill.proficiency && index == skills.length - 1)
      return true;
    return false;
  };
  return (
    <Fragment>
      {skills.map((skill, index) => (
        <Fragment key={index}>
          <div className="row">
            <div className="col-1-of-2">
              <Dropdown
                placeholder="Skills"
                value={skill.skill}
                contents={displayValues[index]["skills"] || []}
                onHandleDropdownValue={onHandleValue.bind(this, "skill")}
                name="skill"
              />
            </div>
            <div className="col-1-of-2">
              <Dropdown
                placeholder="Proficiency"
                value={skill.proficiency}
                contents={displayValues[index]["proficiency"]}
                onHandleDropdownValue={onHandleValue.bind(this, "proficiency")}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-1-of-2">
              <Button
                variant="4-1"
                disabled={!(skills.length > 1)}
                onButtonClick={onChangeProficiency.bind(this, 1, index)}
                content="REMOVE SKILL"
              />
            </div>
            <div className="col-1-of-2">
              <Button
                variant="5-1"
                disabled={!isAddSkillDisabled(index)}
                onButtonClick={onChangeProficiency.bind(this, 1, index)}
                content="ADD SKILL"
              />
            </div>
          </div>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default ProfileForm3;
