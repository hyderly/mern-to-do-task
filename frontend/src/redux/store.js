import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import thunk from "redux-thunk";
import logger from "redux-logger";

import {
  userRegister,
  userVerify,
  userLogin,
  forgotPassword,
} from "./user/user.reducer";

const middlewares = [thunk];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const rootReducers = combineReducers({
  userRegistered: userRegister,
  userVerified: userVerify,
  userLogin: userLogin,
  userForgotPassword: forgotPassword,
});

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

const store = createStore(
  rootReducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
