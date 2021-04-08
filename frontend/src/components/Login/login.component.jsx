import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import ErrorResponse from "../ErrorResponse/errorResponse.component";

import { userLoginAction } from "../../redux/user/user.actions";

const LoginForm = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, success, error } = userLogin;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(userLoginAction(email, password));
  };

  useEffect(() => {
    if (success) {
      history.push("/to-do");
    }
    if (userInfo) {
      history.push("/to-do");
    }
  }, [history, success, userInfo]);

  return (
    <div className="form-box">
      {error && <ErrorResponse styleType="danger">{error}</ErrorResponse>}
      <h1 className="form-title">User Login</h1>
      <form onSubmit={submitHandler}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="btn-box">
          <button className="submit-btn" type="submit">
            {loading ? (
              <div class="lds-ripple">
                <div></div>
              </div>
            ) : (
              <span>Login</span>
            )}
          </button>
          <Link className="forgot-password">Forgot Password?</Link>
        </div>
      </form>
    </div>
  );
};

export default withRouter(LoginForm);
