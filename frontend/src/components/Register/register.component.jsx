import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { userRegisterAction } from "../../redux/user/user.actions";

import "./register.styles.css";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const userRegistered = useSelector((state) => state.userRegistered);
  const { user, loading, success, error } = userRegistered;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      dispatch(userRegisterAction("ali", "ali@gmail.com", 123456, 123456));
    }
  };

  return (
    <div className="register-box">
      <h1 className="register-title">User Register</h1>
      <form onSubmit={submitHandler}>
        <input type="text" placeholder="Enter Name" />
        <input type="email" placeholder="Enter Email" />
        <input type="password" placeholder="Enter Password" />
        <input type="password" placeholder="Confirm Password" />
        <div className="btn-box">
          <button className="submit-btn" type="submit">
            Register
          </button>
          <button className="reset-btn">Reset</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
