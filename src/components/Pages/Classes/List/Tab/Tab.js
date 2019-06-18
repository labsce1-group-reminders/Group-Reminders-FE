// main page for displaying list of all training series
import React, { useEffect } from "react";
import { connect } from "react-redux";

import history from "history.js";
import { getClasses } from "store/actions";

import { Classes } from "./styles.js";
import { Typography } from "@material-ui/core/";

function Tab({ id, getFiltered, getClasses, classes, dispatch }) {
  useEffect(() => {
    console.log("use effect", id)
    getClasses();
    
  }, [getClasses, id]);

  return (
    
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {getFiltered(classes).map(classObj => {
        const className = classObj.title
        return (
          <Classes key={classObj.id}>
            <div
              style={{ cursor: "pointer" }}
              onClick={e => {
                history.push(`/home/class/${classObj.id}`);
              }}
            >
              <Typography variant="subtitle1">
                {className} 
              </Typography>
              <hr />
          </div>
          </Classes>

        );
      })}
    </div>
  );
}

const mapStateToProps = state => {
  console.log("map state to props", state);
  return ({
  classes: state.classesReducer.classes
});
}

export default connect(
  mapStateToProps,
  { getClasses }
)(Tab);
//(withStyles(styles)(Tab));
