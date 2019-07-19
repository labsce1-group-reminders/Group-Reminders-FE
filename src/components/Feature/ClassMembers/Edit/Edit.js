import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";

import EditClassMember from "../Add/";
import NotificationsCard from "components/Feature/Notifications/Card/";
import TeamMemberNotifications from "components/Feature/Notifications/Card/TeamMember";
import Grid from "@material-ui/core/Grid";

import {
  editClassMember,
  getTrainingSeries,
  getClassMemberByID
} from "store/actions";

import { EditWrapper } from "./styles.js";

function Edit(props) {
  const {
    match,
    user_id,
    getClassMemberByID: getCMFromProps,
    getTrainingSeries: getTSFromProps
  } = props;

  useEffect(() => {
    getCMFromProps(match.params.id);
    getTSFromProps(user_id);
  }, [getCMFromProps, getTSFromProps, match, user_id]);
  const [secretMsg, setSecretMsg] = useState("");

  const sendMsgMeow = () => {
    // This was a demo function only, never intended to be used in production.
    // But if you want to test Slack notifications, just uncheck display:none in your dev tools
    const { first_name, slack_uuid } = props.classMember;
    const notification = {
      first_name,
      subject: "Slack Test",
      body: secretMsg,
      slack_uuid,
      class_member_id: props.classMember.id
    };
    const url = `${process.env.REACT_APP_API}/api/slack/sendMessageNow`;
    axios.post(url, { notification });
    setSecretMsg("");
  };
  // const buttonText = props.classMember.slack_uuid
  //   ? "Send Msg Meow"
  //   : "No Slack ID";
  const buttonText = "No Slack ID";
  return (
    <EditWrapper>
      <div style={{ display: "none" }}>
        {/* We used this to demo Slack messages*/}
        <input value={secretMsg} onChange={e => setSecretMsg(e.target.value)} />
        <button
          // disabled={!props.classMember.slack_uuid}  // TODO understand the idea here
          onClick={() => sendMsgMeow()}
        >
          {buttonText}
        </button>
      </div>

      <Grid item xs={12} lg={5}>
        <EditClassMember user_id={user_id} classMember={props.classMember} />
      </Grid>
      <Grid item xs={12} lg={5}>
        <NotificationsCard
          maxWidth="768px"
          limit={10}
          List={TeamMemberNotifications}
          member_id={match.params.id}
        />
      </Grid>
    </EditWrapper>
  );
}

const mapStateToProps = state => ({
  trainingSeries: state.trainingSeriesReducer.trainingSeries,
  classMember: state.classMembersReducer.classMember
});

export default connect(
  mapStateToProps,
  { getClassMemberByID, editClassMember, getTrainingSeries }
)(Edit);
