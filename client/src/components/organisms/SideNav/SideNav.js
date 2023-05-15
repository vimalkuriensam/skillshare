import React, { Fragment } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import useCurrentPath from "../../../hooks/CurrentPath";
import { toggleNavbar } from "../../../redux/actions/utils.action";
import { Capitalize, USER_TYPES } from "../../../utils/data";
import { Icon, Title } from "../../atoms";
import SidenavTitle from "./container/SidenavTitle";
import { NAVCONTENTS } from "./data";

const SideNav = ({ dispatch, navbar, type }) => {
  const navigate = useNavigate();
  const currentPath = useCurrentPath(
    NAVCONTENTS.map((nav) => ({ path: nav.link }))
  );

  const onHandleNavbar = () => dispatch(toggleNavbar());

  const onHandleIcon = (link) => navigate(link);

  return (
    <div
      className={`header__sidenav ${
        navbar ? "header__sidenav--wide" : "header__sidenav--narrow"
      }`}
    >
      <SidenavTitle navbar={navbar} onHandleNavbar={onHandleNavbar} />
      <div className="u-margin-top-30">
        {NAVCONTENTS.map(({ title, link, icon, type: utype }, index) => (
          <Fragment key={index}>
            {(utype == USER_TYPES.COMMON || utype == type) && (
              <div
                className={`header__nav ${
                  currentPath && currentPath == link
                    ? "header__nav--active"
                    : "header__nav--inactive"
                }`}
                key={index}
                onClick={onHandleIcon.bind(this, link)}
              >
                <Icon name={icon} />
                {navbar && (
                  <Title className="u-margin-left-10" variant="alr-20-1">
                    {Capitalize(title)}
                  </Title>
                )}
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = ({
  utils: { navbar = true },
  auth: {
    user: { type = USER_TYPES.USER },
  },
}) => ({ navbar, type });

export default connect(mapStateToProps)(SideNav);
