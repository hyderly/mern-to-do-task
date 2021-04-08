import React from "react";
import "./errorResponse.styles.css";

const ErrorResponse = ({ children, styleType }) => {
  return <div className={`${styleType}`}>{children}</div>;
};

export default ErrorResponse;
