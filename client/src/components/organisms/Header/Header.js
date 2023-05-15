import React, { useState } from "react";
import history from "../../../utils/history/history";
import { connect } from "react-redux";
import { deleteToken, deleteUser } from "../../../redux/actions/auth.action";
import { Icon } from "../../atoms";
import BlacklistComponent from "../../../hoc/BlacklistComponent";
import { withRouter } from "../../../hooks/WithRouter";

const Header = ({ dispatch }) => {
  const [popupNav, setPopupNav] = useState(false);

  const onTogglePopupNav = () => setPopupNav((prevState) => !prevState);

  const onHandleLogout = () => {
    dispatch(deleteUser());
    dispatch(deleteToken());
    history.push("/");
  };
  return (
    <div className="header">
      <div className="header__user" onClick={onTogglePopupNav}>
        <Icon name="User" />
      </div>
      {popupNav && (
        <div className="header__popupNavContainer">
          <ul>
            <li onClick={onHandleLogout}>Logout</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default connect()(Header);
