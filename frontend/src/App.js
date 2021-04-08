import React from "react";

import { Switch, Route } from "react-router-dom";

import Header from "./components/Nav/nav.component";
import RegisterPage from "./pages/RegisterPage/register.component";
import LoginPage from "./pages/LoginPage/loginPage.component";
import VerifyPage from "./pages/VerifyPage/verifyPage.component";

const App = () => {
  return (
    <>
      <Header />
      <div className="main-container">
        <Switch>
          <Route path="/register" component={RegisterPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/verify/:verifyToken" component={VerifyPage} />
        </Switch>
      </div>
    </>
  );
};

export default App;
