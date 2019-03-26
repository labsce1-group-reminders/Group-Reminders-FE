import React from "react";

//Routing
import { Route, Router } from "react-router-dom";

//Components
import App from "./App";
import Dashboard from "./components/Dashboard/Dashboard";
import ProfileView from "./components/Profile/ProfileView";

//Callback
import Callback from "./Callback/callback";

//History
import history from "./history";

//Authentication
import { requiresAuth } from "./Auth/Auth";

//Use this for rendering all of our components
export const makeMainRoutes = () => {
  return (
    <Router history={history}>
      <div>
        <Route exact path='/' component={App} />
        <Route path='/home' component={Dashboard} />
        <Route path='/profile' component={ProfileView} />
        <Route path='/callback' component={Callback} />
      </div>
    </Router>
  );
};
