import React from "react";

import { Switch, Route } from "react-router-dom";

import Header from "./components/Nav/nav.component";
import RegisterPage from "./pages/RegisterPage/register.component";

const App = () => {
  return (
    <>
      <Header />
      <div className="main-container">
        <Switch>
          <Route path="/register" component={RegisterPage} />
        </Switch>
      </div>
    </>
  );
};

export default App;
