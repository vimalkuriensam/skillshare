import React from "react";
import { Capitalize } from "../../../../utils/data";
import { Icon, Title } from "../../../atoms";

const SidenavTitle = ({ navbar, onHandleNavbar = () => {} }) => (
  <div className="header__sidenavContainer">
    {navbar && <Title variant="osb-30-1">{Capitalize("SkillSearch")}</Title>}
    <Icon
      name="Hamburger"
      className="u-cursor-pointer"
      onIconClick={onHandleNavbar}
    />
  </div>
);

export default SidenavTitle;
