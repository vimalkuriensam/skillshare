import React from "react";
import { connect } from "react-redux";
import { toggleNavbar } from "../../../redux/actions/utils.action";
import { Capitalize } from "../../../utils/data";
import { Icon, Title } from "../../atoms";
import SidenavTitle from "./container/SidenavTitle";
import { NAVCONTENTS } from "./data";

const SideNav = ({ dispatch, navbar }) => {
  const onHandleNavbar = () => dispatch(toggleNavbar());

  const onHandleIcon = (link) => console.log(link);

  return (
    <div
      className={`header__sidenav ${
        navbar ? "header__sidenav--wide" : "header__sidenav--narrow"
      }`}
    >
      <SidenavTitle navbar={navbar} onHandleNavbar={onHandleNavbar} />
      <div>
        {NAVCONTENTS.map(({ title, link, icon }, index) => (
          <div className="header__nav" key={index} onClick={onHandleIcon.bind(this, link)}>
            <Icon name={icon} />
            <Title className="u-margin-left-10" variant="alr-20-1">{Capitalize(title)}</Title>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = ({ utils: { navbar = true } }) => ({ navbar });

export default connect(mapStateToProps)(SideNav);
