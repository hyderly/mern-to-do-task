import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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

    if (password === confirmPassword) {
      dispatch(userRegisterAction(name, email, password, confirmPassword));

      if (success) {
        swal("You Are Registered", "Pleae Check Verfication Email");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
    }
  };

  return (
    <div className="register-box">
      {/* {error && swal("bad job!", "You clicked the button!", "success")}
      {success && swal("Good job!", "You clicked the button!", "success")} */}
      <h1 className="register-title">User Register</h1>
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
            {loading && (
              <div class="lds-ripple">
                <div></div>
              </div>
            )}
            Register
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
