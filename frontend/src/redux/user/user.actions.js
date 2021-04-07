import axios from "axios";

import { UserRegisterTypes } from "./user.types";

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
