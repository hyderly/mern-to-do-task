import axios from "axios";

import {
  UserRegisterTypes,
  UserVerifyTypes,
  UserLoginTypes,
} from "./user.types";

export const userRegisterAction = (
  name,
  email,
  password,
  confirmPassword
) => async (dispatch) => {
  try {
    dispatch({
      type: UserRegisterTypes.USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/register",
      { name, email, password, confirmPassword },
      config
    );

    dispatch({
      type: UserRegisterTypes.USER_REGISTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UserRegisterTypes.USER_REGISTER_FAIL,
      payload: error.response?.data.error,
    });
  }
};

export const userVerificationAction = (verifyToken) => async (dispatch) => {
  try {
    dispatch({ type: UserVerifyTypes.USER_VERIFY_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/users/emailverify/${verifyToken}`,
      "",
      config
    );

    dispatch({
      type: UserVerifyTypes.USER_VERIFY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UserVerifyTypes.USER_VERIFY_FAIL,
      payload: error.response?.data.error,
    });
  }
};

export const userLoginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: UserLoginTypes.USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    dispatch({
      type: UserLoginTypes.USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: UserLoginTypes.USER_LOGIN_FAIL,
      payload: error.response?.data.error,
    });
  }
};

export const logoutAction = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({
    type: UserLoginTypes.USER_LOGOUT,
  });
};
