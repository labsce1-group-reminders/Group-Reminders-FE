// main page for displaying list of all training series
import React, { useEffect } from "react";
import { connect } from "react-redux";

import styled from "styled-components";

import history from "history.js";

import DeleteModal from "components/UI/Modals/deleteModal";
import { getClassMember } from "store/actions";

import { withStyles } from "@material-ui/core/styles";
import { ListItem, ListItemText } from "@material-ui/core/";
import { ListStyles, styles } from "./styles.js";

function Overview({
  user_id,
  getFiltered,
  getClassMember,
  classMembers,
  classes
}) {
  useEffect(() => {
    getClassMember(user_id);
  }, [getClassMember, user_id]);

  return (
    <ListStyles>
      {getFiltered(classMembers).map(
        ({ first_name, last_name, id, user_id, class_id }) => {
          return (
            <SingleMember key={id} component="li" className={classes.listItem}>
              <ListItemText
                primary={first_name + " " + last_name}
                secondary={"Class ID: "+ class_id}
                onClick={() => history.push(`/home/class-member/${id}`)}
              />

              <DeleteModal
                deleteType="classMember"
                classMemberId={id}
                className={`material-icons ${classes.icons}`}
                user_id={user_id}
              />
            </SingleMember>
          );
        }
      )}
    </ListStyles>
  );
}

const mapStateToProps = state => ({
  classMembers: state.classMembersReducer.classMembers
});

export default connect(
  mapStateToProps,
  { getClassMember }
)(withStyles(styles)(Overview));

const SingleMember = styled(ListItem)``;
