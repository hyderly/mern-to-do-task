import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { forgotPasswordAction } from "../../redux/user/user.actions";

import ErrorResponse from "../../components/ErrorResponse/errorResponse.component";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const userForgotPassword = useSelector((state) => state.userForgotPassword);
  const { loading, error, success, message } = userForgotPassword;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPasswordAction(email));
  };

  return (
    <div className="page-box">
      <div className="form-box">
        {error && <ErrorResponse styleType="danger">{error}</ErrorResponse>}
        {success && (
          <ErrorResponse styleType="success">{message}</ErrorResponse>
        )}
        <h1 className="form-title">Forgot Password</h1>
        <form onSubmit={submitHandler}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="btn-box">
            <button className="submit-btn" type="submit">
              {loading ? (
                <div class="lds-ripple">
                  <div></div>
                </div>
              ) : (
                <span>Send Mail</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
