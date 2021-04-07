import { UserRegisterTypes } from "./user.types";

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
        message: action.payload.message,
      };

    default:
      return state;
  }
};
