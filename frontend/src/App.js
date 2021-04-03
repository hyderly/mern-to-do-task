import React from "react";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Switch, Route } from "react-router-dom";

import Header from "./components/Nav/nav.component";

const App = () => {
  return (
    <>
      <Header />
      <h1>React Application</h1>
    </>
  );
};

export default App;
