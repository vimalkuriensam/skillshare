import React from "react";
import { connect } from "react-redux";
import { toggleNavbar } from "../../../redux/actions/utils.action";
import { Capitalize } from "../../../utils/data";
import { Icon, Title } from "../../atoms";
import SidenavTitle from "./container/SidenavTitle";

const SideNav = ({ dispatch, navbar }) => {
  const onHandleNavbar = () => dispatch(toggleNavbar());

  return (
    <div
      className={`header__sidenav ${
        navbar ? "header__sidenav--wide" : "header__sidenav--narrow"
      }`}
    >
      <SidenavTitle navbar={navbar} onHandleNavbar={onHandleNavbar} />
    </div>
  );
};

const mapStateToProps = ({ utils: { navbar = true } }) => ({ navbar });

export default connect(mapStateToProps)(SideNav);
