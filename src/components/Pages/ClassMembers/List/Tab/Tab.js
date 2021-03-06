// main page for displaying list of all training series
import React, { useEffect } from "react";
import { connect } from "react-redux";

import history from "history.js";
import DeleteModal from "components/UI/Modals/deleteModal";
import { getClassMember } from "store/actions";

import { TeamsMember } from "./styles.js";
import { Typography } from "@material-ui/core/";

function Tab({ user_id, getFiltered, getClassMember, classMembers, classes }) {
  useEffect(() => {
    getClassMember(user_id);
  }, [getClassMember, user_id]);

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {getFiltered(classMembers).map(classMember => {
        // TODO actually loop through classes and find the class name by id
        const classObj = classMembers.find(tm => tm.id === classMember.class_id);
        const className = classObj.title
          ? `${classObj.title}`
          : "Not assigned (TODO: fix)";
        return (
          <TeamsMember key={classMember.id}>
            <div
              style={{ cursor: "pointer" }}
              onClick={e => {
                history.push(`/home/class-member/${classMember.id}`);
              }}
            >
              <Typography variant="subtitle1">
                {classMember.first_name} {classMember.last_name}
              </Typography>
              <hr />
              <Typography variant="subtitle2">
                {classMember.email || (
                  <p style={{ color: "rgba(0,0,0,0.3)" }}>No email assigned</p>
                )}
              </Typography>
              <Typography variant="overline">
                {classMember.phone_number}
              </Typography>
              <Typography variant="overline">Class: {className}</Typography>
            </div>
            <DeleteModal
              deleteType="classMember"
              classMemberId={classMember.id}
              user_id={user_id}
            />
          </TeamsMember>
        );
      })}
    </div>
  );
}

const mapStateToProps = state => ({
  classMembers: state.classMembersReducer.classMembers
});

export default connect(
  mapStateToProps,
  { getClassMember }
)(Tab);
//(withStyles(styles)(Tab));
