import React, { useEffect } from "react";
import { withRouter } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { logoutAction } from "../../redux/user/user.actions";

import "./nav.styles.css";

const Nav = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userLogout = () => {
    dispatch(logoutAction());
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [history, userInfo]);

  return (
    <div className="nav-box">
      <Link to="/" className="nav-title">
        To-Do
      </Link>
      <div className="nav-links">
        <Link to="/to-do" className="nav-links">
          Todo's
        </Link>
        <Link to="/account" className="nav-links">
          Account
        </Link>
        {userInfo ? (
          <Link className="nav-links" onClick={userLogout}>
            {userInfo.name}(logout)
          </Link>
        ) : (
          <Link to="/login" className="nav-links">
            Login
          </Link>
        )}

        <Link to="/register" className="nav-links">
          Register
        </Link>
      </div>
    </div>
  );
};

export default withRouter(Nav);
