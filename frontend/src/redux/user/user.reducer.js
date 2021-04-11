import {
  UserRegisterTypes,
  UserVerifyTypes,
  UserLoginTypes,
  UserForgotPasswordTypes,
} from "./user.types";

export const userRegister = (state = { success: false }, action) => {
  switch (action.type) {
    case UserRegisterTypes.USER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UserRegisterTypes.USER_REGISTER_SUCCESS:
      return {
        loading: false,
        success: true,
        message: action.payload.message,
      };

    case UserRegisterTypes.USER_REGISTER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        message: action.payload,
      };

    default:
      return state;
  }
};

export const userVerify = (state = {}, action) => {
  switch (action.type) {
    case UserVerifyTypes.USER_VERIFY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UserVerifyTypes.USER_VERIFY_SUCCESS:
      return {
        loading: false,
        success: true,
        message: action.payload.message,
      };

    case UserVerifyTypes.USER_VERIFY_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export const userLogin = (state = { success: false }, action) => {
  switch (action.type) {
    case UserLoginTypes.USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UserLoginTypes.USER_LOGIN_SUCCESS:
      return {
        loading: false,
        success: true,
        userInfo: action.payload,
      };

    case UserLoginTypes.USER_LOGIN_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export const forgotPassword = (state = {}, action) => {
  switch (action.type) {
    case UserForgotPasswordTypes.USER_FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UserForgotPasswordTypes.USER_FORGOT_PASSWORD_SUCCESS:
      return {
        loading: false,
        success: true,
        message: action.payload.message,
      };

    case UserForgotPasswordTypes.USER_FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};
