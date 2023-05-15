import React, { Fragment } from "react";
import { Button, Dropdown } from "../../../components";

const ProfileForm4 = ({
  displayValues = [],
  languages = [],
  onHandleValue = () => {},
  onChangeProficiency = () => {},
}) => {
  const isAddLanguageDisabled = (index) => {
    const lastLanguage = languages[languages.length - 1];
    if (
      lastLanguage.language &&
      lastLanguage.proficiency &&
      index == languages.length - 1
    )
      return true;
    return false;
  };
  return (
    <Fragment>
      {languages.map((language, index) => (
        <Fragment key={index}>
          <div className="row">
            <div className="col-1-of-2">
              <Dropdown
                placeholder="Language"
                value={language.language}
                name="language"
                contents={displayValues[index]["languages"]}
                onHandleDropdownValue={onHandleValue.bind(this, "language")}
              />
            </div>
            <div className="col-1-of-2">
              <Dropdown
                placeholder="Proficiency"
                value={language.proficiency}
                contents={displayValues[index]["proficiency"]}
                onHandleDropdownValue={onHandleValue.bind(this, "proficiency")}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-1-of-2">
              <Button
                variant="4-1"
                disabled={!(languages.length > 1)}
                onButtonClick={onChangeProficiency.bind(this, -1, index)}
                content="REMOVE LANGUAGE"
              />
            </div>
            <div className="col-1-of-2">
              <Button
                variant="5-1"
                disabled={!isAddLanguageDisabled(index)}
                onButtonClick={onChangeProficiency.bind(this, 1, index)}
                content="ADD LANGUAGE"
              />
            </div>
          </div>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default ProfileForm4;
