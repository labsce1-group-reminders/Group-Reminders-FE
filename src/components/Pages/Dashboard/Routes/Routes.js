import React from "react";
import { Router, Route } from "react-router-dom";

import Profile from "components/Pages/Profile";
import EditClassMember from "components/Pages/ClassMembers/Edit/";
import CreateTrainingSeries from "components/Pages/TrainingSeries/Add/CreateTrainingSeries";
import EditTrainingSeries from "components/Pages/TrainingSeries/Edit/";
import AddClassMember from "components/Pages/ClassMembers/Add/";
import CreateMessage from "components/Pages/TrainingSeries/Add/CreateMessage";
import MessagePage from "components/Pages/TrainingSeries/Add/MessagePage";
import HelpModal from "components/UI/HelpModal/HelpModal.js";
import ContactModal from "components/UI/ContactModal/ContactModal.js";

import AddMemberToTrainingSeries from "components/Pages/TrainingSeries/Add/AddMemberToTrainingSeries.js";

import Dashboard from "../Dashboard";
import { LandingPage } from "components/Pages/LandingPage/LandingPage/";
import Role from "../../WhoyouarePage/Role";

function Routes(props) {
  const { setDisplaySnackbar, history, setIsTourOpen } = props;
  const disableSnackbar = () => {
    setDisplaySnackbar(false);
  };
  const activateTutorial = () => {
    props.history.push("/home");
    setIsTourOpen(true);
  };
  return (
    <Router history={history}>
      <Route
        exact
        path="/home/help"
        render={renderProps => (
          <HelpModal
            {...renderProps}
            history={props.history}
            userId={props.user.id}
          />
        )}
      />
      <Route
        exact
        path="/home/contact"
        render={renderProps => (
          <ContactModal
            {...renderProps}
            history={props.history}
            userId={props.user.id}
          />
        )}
      />
      <Route
        exact
        path="/home"
        render={renderProps => (
          <Dashboard
            {...renderProps}
            disableSnackbar={disableSnackbar}
            history={props.history}
            user_id={props.user.id}
          />
        )}
      />
      <Route
        path="/home/profile"
        render={renderProps => (
          <Profile
            {...renderProps}
            activateTutorial={activateTutorial}
            disableSnackbar={disableSnackbar}
          />
        )}
      />
      <Route
        path="/home/class-member/:id"
        render={renderProps => (
          <EditClassMember {...renderProps} user_id={props.user.id} />
        )}
      />
      <Route
        path="/home/create-class-member/"
        render={renderProps => (
          <AddClassMember {...renderProps} user_id={props.user.id} />
        )}
      />
      <Route
        path="/home/create-training-series"
        render={renderProps => (
          <CreateTrainingSeries {...renderProps} user_id={props.user.id} />
        )}
      />
      <Route
        path="/home/training-series/:id"
        render={renderProps => (
          <EditTrainingSeries {...renderProps} user_id={props.user.id} />
        )}
      />
      <Route
        path="/home/create-message"
        render={renderProps => <CreateMessage {...renderProps} />}
      />

      <Route
        path="/home/assign-members/:id"
        render={renderProps => (
          <AddMemberToTrainingSeries {...renderProps} user_id={props.user.id} />
        )}
      />
      <Route path="/home/message/:id" component={MessagePage} />

      <Route exact path="/role" component={Role} />
    </Router>
  );
}

export default Routes;
