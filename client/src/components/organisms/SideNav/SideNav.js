import React from "react";
import { Capitalize } from "../../../utils/data";
import { Title } from "../../atoms";

const SideNav = () => {
  return <div className="header__sidenav header__sidenav--wide">
    <div>
      <Title variant="osb-30-1">{Capitalize("SkillSearch")}</Title>
    </div>
  </div>;
};

export default SideNav;
