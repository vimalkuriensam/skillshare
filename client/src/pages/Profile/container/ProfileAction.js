import React from "react";
import { Button } from "../../../components";

const ProfileAction = ({ onSubmitForm = () => {}, onResetForm = () => {} }) => (
  <div className="profile__action">
    <Button onButtonClick={onSubmitForm} variant="1-2" content="Submit" />
    <Button onButtonClick={onResetForm} variant="3-1" content="Reset" />
  </div>
);

export default ProfileAction;
