import { UserRegisterTypes } from "./user.types";

export const userRegister = (state = {}, action) => {
  switch (action.type) {
    case UserRegisterTypes.USER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UserRegisterTypes.USER_REGISTER_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        success: true,
      };

    case UserRegisterTypes.USER_REGISTER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};
