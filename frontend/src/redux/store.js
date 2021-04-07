import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import thunk from "redux-thunk";
import logger from "redux-logger";

import { userRegister } from "./user/user.reducer";

const middlewares = [thunk];

const rootReducers = combineReducers({
  userRegistered: userRegister,
});

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
