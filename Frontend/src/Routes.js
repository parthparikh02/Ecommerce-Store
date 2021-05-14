import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./core/Home";

import App from "./App";
import PrivateRoutes from "./auth/helper/PrivateRoutes";
import Signup from "./user/Signup";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signup" exact component={Signup} />
        <Route path="/" exact component={Home} />
        {/* <PrivateRoutes path="/user/dashboard" exact component={} /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
