import React, { useState } from "react";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import PermIdentity from "@material-ui/icons/PermIdentityOutlined";
import Home from "@material-ui/icons/HomeOutlined";
import QuestionAnswer from "@material-ui/icons/QuestionAnswerOutlined";
import Timeline from "@material-ui/icons/TimelineOutlined";
import ModeComment from "@material-ui/icons/ModeCommentOutlined";
import { withStyles } from "@material-ui/core/styles";
import { styles, Popover } from "../styles.js";

function TabNavigation(props) {
  const { classes, newResponses } = props;
  const [overviewHover, setOverviewHover] = useState(false);
  const [classMembersHover, setClassMembersHover] = useState(false);
  const [classHover, setClassHover] = useState(false);
  const [trainingSeriesHover, setTrainingSeriesHover] = useState(false);
  const [messagesHover, setMessagesHover] = useState(false);
  const [responsesHover, setResponsesHover] = useState(false);
  const [groupsHover, setGroupsHover] = useState(false);

  return (
    <BottomNavigation
      data-tour={window.innerWidth < 650 ? "7" : null}
      value={props.topTab}
      onChange={(e, value) => {
        props.setTopTab(value);
      }}
      style={{
        width: "100%",
        whiteSpace: "nowrap",
        background: "rgb(255,255,255)",
        position: "relative"
      }}
    >
      <BottomNavigationAction
        label="Overview"
        value="overview"
        icon={<Home />}
        color="primary"
        onMouseEnter={ ()=> {
          setOverviewHover(true);
        }}
        onMouseLeave={()=> {
          setOverviewHover(false);
        }}
      />
      <Popover
        style={overviewHover ? { display: "block" } : { display: "none" }}
      >
        Overview
      </Popover>
      <BottomNavigationAction
        label="Class Members"
        value="class members"
        icon={<PermIdentity />}
        onMouseEnter={() => {
          setClassMembersHover(true);
        }}
        onMouseLeave={() => {
          setClassMembersHover(false);
        }}
      />
      <Popover
        style={classMembersHover ? { display: "block" } : { display: "none" }}
      >
        Class Members
      </Popover>
      <BottomNavigationAction
          label="Class"
          value="class"
          icon={<PermIdentity />}
          onMouseEnter={() => {
            setClassHover(true);
          }}
          onMouseLeave={() => {
            setClassHover(false);
          }}
      />
      <Popover
          style={classHover ? { display: "block" } : { display: "none" }}
      >
        Class
      </Popover>
      <BottomNavigationAction
        label="Training Series"
        value="training series"
        icon={<Timeline />}
        onMouseEnter={() => {
          setTrainingSeriesHover(true);
        }}
        onMouseLeave={() => {
          setTrainingSeriesHover(false);
        }}
      />
      <Popover
        style={trainingSeriesHover ? { display: "block" } : { display: "none" }}
      >
        Training Series
      </Popover>
      <BottomNavigationAction
        label="Notifications"
        value="notifications"
        icon={<QuestionAnswer />}
        onMouseEnter={() => {
          setMessagesHover(true);
        }}
        onMouseLeave={() => {
          setMessagesHover(false);
        }}
      />
      <Popover
        style={messagesHover ? { display: "block" } : { display: "none" }}
      >
        Notifications
      </Popover>
      <BottomNavigationAction
        onClick={() => {
          props.setTopTab("responses");
        }}
        label="Responses"
        value="responses"
        icon={<ModeComment />}
        onMouseEnter={() => {
          setResponsesHover(true);
        }}
        onMouseLeave={() => {
          setResponsesHover(false);
        }}
      />
      {newResponses.length ? <div className={classes.circle} /> : ""}
      <Popover
        style={responsesHover ? { display: "block" } : { display: "none" }}
      >
        Responses
      </Popover>
      <BottomNavigationAction
        label="Groups"
        value="Groups"
        icon={<PermIdentity />}
        onMouseEnter={() => {
          setGroupsHover(true);
        }}
        onMouseLeave={() => {
          setGroupsHover(false);
        }}
      />
      <Popover
        style={groupsHover ? { display: "block" } : { display: "none" }}
      >
        Groups
      </Popover>
    </BottomNavigation>
  );
}
export default withStyles(styles)(TabNavigation);
