import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ErrorResponse from "../ErrorResponse/errorResponse.component";

import swal from "sweetalert";

import { userRegisterAction } from "../../redux/user/user.actions";

import "./register.styles.css";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const userRegistered = useSelector((state) => state.userRegistered);
  const { message, loading, success, error } = userRegistered;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(userRegisterAction(name, email, password, confirmPassword));

    if (success) {
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="form-box">
      {success && <ErrorResponse styleType="success">{message}</ErrorResponse>}
      {error && <ErrorResponse styleType="danger">{error}</ErrorResponse>}

      <h1 className="form-title">User Register</h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div className="btn-box">
          <button className="submit-btn" type="submit">
            {loading ? (
              <div class="lds-ripple">
                <div></div>
              </div>
            ) : (
              <span>Register</span>
            )}
          </button>
          {/* <button className="reset-btn" onClick={resetFields}>
            Reset
          </button> */}
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
