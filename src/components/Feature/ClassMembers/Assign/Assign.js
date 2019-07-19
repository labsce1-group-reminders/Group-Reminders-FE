import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getClassMember, getNotifications, getTrainingSeriesClassMembers,
} from "store/actions";

import { withStyles } from "@material-ui/core/styles";
import { Paper, Button, Typography } from "@material-ui/core/";
import Pagination from "material-ui-flat-pagination";

import { styles, HeaderContainer, HolderText } from "./styles.js";

function Assign(props) {
  const [offset, setOffset] = useState(0);
  const limit = props.limit || 5;

  const {
    List,
    classes,
    user_id,
    history,
    match: { params },
    getClassMember,
    getTrainingSeriesClassMembers,
      id,
  } = props;

  useEffect(() => {
    getClassMember(user_id);
    getTrainingSeriesClassMembers(id);
  }, [getClassMember, getTrainingSeriesClassMembers, id, user_id]);

  // Filter unique class member IDs from notifications
  // Add is_sent to filter to remove old messages?
  const cmIDs = new Set(
    props.trainingSeriesClassMembers
      .filter(n => n.training_series_id === parseInt(params.id))
      .map(n => n.class_member_id)
  );
  const assignedMembers = props.classMembers.filter(t => cmIDs.has(t.id));

  return (
    <Paper className={classes.paper}>
      <HeaderContainer>
        <Typography variant="title" className={classes.assignedTitle}>
          Assigned Class Members
        </Typography>
        <Button
          disabled={!props.classMembers.length}
          className={classes.assignButton}
          variant={"outlined"}
          onClick={() => history.push(`/home/assign-members/${id}`)}
        >
          {assignedMembers.length ? "Assign More Members" : "Assign Members"}
        </Button>
      </HeaderContainer>
      <List
        params={params}
        classMembers={assignedMembers.slice(offset, offset + limit)}
        history={history}
      />
      {props.classMembers.length && !assignedMembers.length && (
        <>
          <Typography variant="subheading" className={classes.messageTextTop}>
            This training series currently does not have any class members
            assigned to it.
          </Typography>
          <Typography variant="subheading" className={classes.messageText}>
            Click the button above to create assignments.
          </Typography>
        </>
      )}
      {!props.classMembers.length && !assignedMembers.length && (
        <Typography variant="subheading" className={classes.messageText}>
          <HolderText>
            <p>You don't have any class members to assign.</p>
            <p>
              <Link to="/home/create-class-member">Click here</Link> to add a
              member to your account.
            </p>
          </HolderText>
        </Typography>
      )}
      <Pagination
        limit={limit}
        offset={offset}
        total={assignedMembers.length}
        centerRipple={true}
        onClick={(e, newOffset) => setOffset(newOffset)}
      />
    </Paper>
  );
}

const mapStateToProps = state => ({
  notifications: state.notificationsReducer.notifications,
  classMembers: state.classMembersReducer.classMembers,
  trainingSeriesClassMembers: state.trainingSeriesReducer.trainingSeriesClassMembers,

  messages: state.messagesReducer.messages
});

export default connect(
  mapStateToProps,
  { getClassMember, getNotifications, getTrainingSeriesClassMembers }
)(withStyles(styles)(Assign));
