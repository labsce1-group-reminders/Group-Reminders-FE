// main page for displaying list of all training series
import React, { useEffect } from "react";
import { connect } from "react-redux";

import styled from "styled-components";

import history from "history.js";

import DeleteModal from "components/UI/Modals/deleteModal";
import { getClassMember, getClasses} from "store/actions";

import { withStyles } from "@material-ui/core/styles";
import { ListItem, ListItemText } from "@material-ui/core/";
import { ListStyles, styles } from "./styles.js";

function Overview({
  user_id,
  getFiltered,
  getClassMember,
  getClasses,
  classesArray,
  classMembers,
  classes
}) {
  useEffect(() => {
    getClassMember();
  }, [getClassMember, user_id]);

  useEffect(() => {
    getClasses();
  }, [getClasses, user_id]);
  // change classesArray to key-value pair, for better performance in accessing individual class.
  let classObj = {};
  classesArray.forEach( c => {
    classObj[c.id] = c;
  });
  return (
    <ListStyles>
      {getFiltered(classMembers).map(
        ({ first_name, last_name, id, user_id, class_id }) => {
          const className = classObj[class_id] ? `${classObj[class_id].title}`
              : "Not assigned";
          return (
            <SingleMember key={id} component="li" className={classes.listItem}>
              <ListItemText
                primary={first_name + " " + last_name}
                secondary={"Class: "+ className}
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
  classMembers: state.classMembersReducer.classMembers,
  classesArray: state.classesReducer.classes,
});

export default connect(
  mapStateToProps,
  { getClassMember, getClasses }
)(withStyles(styles)(Overview));

const SingleMember = styled(ListItem)``;
