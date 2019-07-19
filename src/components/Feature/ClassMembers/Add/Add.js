import React, { useReducer, useEffect } from "react";
import { connect } from "react-redux";

import {
  addClassMember,
  editClassMember,
  getClassMember,
  getAllMessages,
  getNotifications,
  addNotification,
  deleteNotification
} from "store/actions";
import history from "history.js";

import { initialState, reducer } from "./reducer";
import MemberInfoForm from "./helpers/MemberInfoForm.js";
import Relationships from "./helpers/Relationships.js";
import SelectSlackID from "./helpers/SelectSlackID.js";
import Buttons from "./helpers/Buttons.js";
import phoneNumberTest from "./helpers/testPhoneNumber.js";
import InfoPopup from "components/UI/InfoPopup/InfoPopup.js";
import updateNotifications from "./helpers/updateNotifications.js";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { styles, MainContainer, MemberInfoContainer } from "./styles.js";

function Add(props) {
  const {
    addClassMember,
    editClassMember,
    getClassMember,
    getAllMessages,
    getNotifications,
    addNotification,
    deleteNotification,
    classesArray,
    classMember,
    classMembers,
    notifications,
    messages,
    user_id
  } = props;

  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    // CDM
    getAllMessages();
    getNotifications();
    getClassMember();
    // TODO not sure the need to edit class_id vvv
    if (classMember) {
      const class_id = classMember.class_id ? classMember.class_id : "";
      dispatch({
        type: "EDITING_MEMBER",
        payload: { ...classMember, class_id }
      });
    }
  }, [
    getAllMessages,
    getNotifications,
    getClassMember,
    user_id,
    dispatch,
    classMember
  ]);
  useEffect(() => {
    // Checks input conditions.  If all required field conditions are met, Add Member button is activated
    const payload = !(
      state.classMember.first_name &&
      state.classMember.last_name &&
      state.classMember.email &&
      !phoneNumberTest(state.classMember.phone_number)
    );
    dispatch({ type: "UPDATE_DISABLED", payload });
  }, [state.classMember, user_id]);

  const updateMember = (key, value) => {
    dispatch({ type: "UPDATE_MEMBER", key, payload: value });
  };

  const editExistingMember = e => {
    e.preventDefault();
    const updateNotifObj = {
      state,
      classMembers,
      notifications,
      messages,
      deleteNotification,
      addNotification
    };
    updateNotifications(updateNotifObj);
    editClassMember(state.classMember);
    dispatch({ type: "DISPLAY_SNACKBAR", payload: true });
    history.push("/home");
  };

  const addNewClassMember = e => {
    e.preventDefault();
    addClassMember(state.classMember);
    dispatch({ type: "TOGGLE_ROUTING" });
    dispatch({ type: "DISPLAY_SNACKBAR", payload: true });
    history.push("/home");
  };
  const { classes } = props;
  return (
    <MainContainer
      style={{ position: "relative" }}
      maxWidth={props.maxWidth}
      maxHeight={props.maxHeight}
    >
      <InfoPopup
        left="10px"
        style={{ position: "relative" }}
        popOverText={
          <p>
            On this page you can add a new Class Member! If you've already got
            some Class Members, you can assign them as a class_id.
            Whenever a class member is assigned to a training series, you can
            choose to send them a notifications as well.
          </p>
        }
      />
      <form
        className={classes.form}
        onSubmit={e =>
            classMember ? editExistingMember(e) : addNewClassMember(e)
        }
      >
        <Paper className={classes.paper}>
          <Typography variant="title">
            {classMember ? "Edit Class Member" : "Add New Class Member"}
          </Typography>
          <Divider className={classes.divider} />
          <MemberInfoContainer>
            <MemberInfoForm
              state={state}
              updateMember={updateMember}
              classes={classes}
            />
            <SelectSlackID
              state={state}
              updateMember={updateMember}
              dispatch={dispatch}
            />
            <Relationships
              state={state}
              dispatch={dispatch}
              classMembers={classMembers}
              classesArray={classesArray}
            />
          </MemberInfoContainer>

          <Buttons
            state={state}
            classes={classes}
            status={classMember ? "edit" : "add"}
          />
        </Paper>
      </form>
    </MainContainer>
  );
}

const mapStateToProps = state => ({
  messages: state.messagesReducer.messages,
  notifications: state.notificationsReducer.notifications,
  classMembers: state.classMembersReducer.classMembers,
  classesArray: state.classesReducer.classes,
});

export default connect(
  mapStateToProps,
  {
    addClassMember,
    editClassMember,
    getClassMember,
    getAllMessages,
    getNotifications,
    addNotification,
    deleteNotification
  }
)(withStyles(styles)(Add));
