import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";
import styled from "styled-components";

import Button from "@material-ui/core/Button";
import { Paper } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

import SingleMemberCheck from "./singleMemberCheck.js";
import {
  getTeamMembers,
  getTrainingSeries,
  addNotification,
  getAllMessages
} from "store/actions";

function AddMemberToTrainingSeries(props) {
  const [activeMembers, setActiveMembers] = useState([]); //an array of all IDS of members being added to a series
  const [startDate, setStartDate] = useState(moment().format("YYYY-MM-DD"));

  // Abstracting to remove useEffect dependency warnings
  const {
    getTeamMembers: getMembersFromProps,
    getTrainingSeries: getTSFromProps,
    getAllMessages: getMessagesFromProps,
    match,
    user_id
  } = props;
  const {
    params: { id }
  } = match;

  const getNewNotification = (id, msg) => {
    const memberServices = props.teamMembers.filter(mem => mem.id === id);
    console.log(id);
    return {
      team_member_id: id,
      service_id: memberServices[0].phone_number
        ? 1
        : memberServices[0].email
        ? 2
        : 3,
      message_id: msg.id,
      num_attempts: 0,
      is_sent: false,
      send_date: moment(startDate)
        .add(msg.days_from_start, "days")
        .toISOString()
    };
  };

  const addMember = member_id => {
    //this function is passed down to the single members. on check, it sets or removes their + mentors/managers ids from activeMembers.
    let newMembers = [...activeMembers];
    if (newMembers.includes(member_id)) {
      let index = newMembers.indexOf(member_id);
      newMembers.splice(index, 1);
    } else {
      newMembers.push(member_id);
    }
    setActiveMembers(newMembers);
  };

  useEffect(() => {
    getMembersFromProps(user_id);
    getTSFromProps(id);
    getMessagesFromProps();
  }, [getMembersFromProps, getTSFromProps, getMessagesFromProps, user_id, id]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!activeMembers.length) return;
    const newNotifications = [];
    let roles = getRoles(props.messages[0]);
    activeMembers.forEach(idSet => {
      props.messages.forEach(msg => {
        //find member who has memberID and check what services they have available to them
        roles.forEach(role => {
          if (msg[`for_${role}`] && idSet[role]) {
            newNotifications.push(getNewNotification(idSet[role], msg));
          }
        });
      });
    });
    newNotifications.forEach(n => {
      props.addNotification(n);
    });
    props.history.push(`/home/training-series/${props.match.params.id}`);
  };

  return (
    <Wrapper>
      <h1>
        {props.trainingSeries.length &&
          props.trainingSeries.filter(
            series => parseInt(series.id) === parseInt(props.match.params.id)
          )[0].title}
      </h1>
      <p>
        Employee's will be sent {props.messages.length} message(s) throughout
        this training series.
      </p>
      <div>
        {props.teamMembers.map(member => {
          return (
            <SingleMemberCheck
              addMember={addMember}
              key={member.id}
              teamMember={member}
            />
          );
        })}
      </div>
      <form noValidate>
        <TextField
          id="date"
          label="Start Date"
          type="date"
          defaultValue={moment().format("YYYY-MM-DD")}
          InputLabelProps={{
            shrink: true
          }}
          onChange={e => {
            setStartDate(e.target.value); //gives a text version of date in YYY-MM-DD
          }}
        />
      </form>
      <Button
        style={{ margin: "15px" }}
        variant="contained"
        color="primary"
        type="submit"
        onClick={e => handleSubmit(e)}
      >
        submit
      </Button>
    </Wrapper>
  );
}

const mapStateToProps = state => {
  return {
    messages: state.messagesReducer.messages,
    teamMembers: state.teamMembersReducer.teamMembers,
    trainingSeries: state.trainingSeriesReducer.trainingSeries
  };
};

export default connect(
  mapStateToProps,
  {
    getTeamMembers,
    getTrainingSeries,
    addNotification,
    getAllMessages
  }
)(AddMemberToTrainingSeries);

const Wrapper = styled(Paper)`
  margin: auto;
  padding: 10px;
  width: 80%;
  max-width: 1000px;
`;

function getRoles(msg) {
  // No, this isn't necessary for 3 roles. But this will scale better if more roles are added
  const roles = [];
  for (let prop in msg) {
    if (prop.substring(0, 4) === "for_") {
      roles.push(prop.substring(4));
    }
  }
  return roles;
}
