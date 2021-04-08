import React, { useState } from "react";
import RegisterForm from "../../components/Register/register.component";

import "./registerPage.styles.css";

const RegisterPage = () => {
  return (
    <div className="form-page">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
