import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./verifyPage.styles.css";

import Loader from "../../components/Loader/loader.component";

import { userVerificationAction } from "../../redux/user/user.actions";

const VerifyPage = ({ match }) => {
  const { verifyToken } = match.params;

  const dispatch = useDispatch();
  const userVerified = useSelector((state) => state.userVerified);
  const { loading, success, error } = userVerified;

  useEffect(() => {
    dispatch(userVerificationAction(verifyToken));
  }, [dispatch, match, verifyToken]);

  return (
    <div className="verify-page">
      <div className="verify-box">
        {loading && <Loader />}
        {success && (
          <>
            <div className="verify-message">
              Congratulation !! <br /> Email Verified
            </div>
            <Link to="/login" className="redirect-link">
              Login
            </Link>
          </>
        )}
        {error && (
          <>
            <div className="verify-message">
              {error} !!
              <br /> Please Check Mail to verify
            </div>
            <Link to="/register" className="redirect-link">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyPage;
