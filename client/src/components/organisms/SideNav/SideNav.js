import React from "react";
import { Capitalize } from "../../../utils/data";
import { Icon, Title } from "../../atoms";

const SideNav = () => {
  return (
    <div className="header__sidenav header__sidenav--wide">
      <div className="header__sidenavContainer">
        <Title variant="osb-30-1">{Capitalize("SkillSearch")}</Title>
        <Icon name="Hamburger" />
      </div>
    </div>
  );
};

export default SideNav;
