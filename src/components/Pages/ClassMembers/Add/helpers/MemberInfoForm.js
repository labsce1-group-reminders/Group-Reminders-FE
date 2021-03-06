import React from "react";
import NumberFormat from "react-number-format";

import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "../styles.js";

function MemberInfoForm({ classes, state, updateMember }) {
  return (
    <>
      <TextField
        autoFocus={true}
        id="standard-name"
        label="First Name"
        className={classes.textFieldMain}
        value={state.classMember.first_name}
        onChange={e => updateMember("first_name", e.target.value)}
        margin="normal"
        required
      />
      <TextField
        id="standard-name"
        label="Last Name"
        className={classes.textFieldMain}
        value={state.classMember.last_name}
        onChange={e => updateMember("last_name", e.target.value)}
        margin="normal"
        required
      />

      <NumberFormat
        format="+1 (###) ###-####"
        type="tel"
        id="standard-name"
        label="Phone Number"
        customInput={TextField}
        className={classes.textFieldMain}
        value={state.classMember.phone_number}
        onChange={e => updateMember("phone_number", e.target.value)}
        margin="normal"
        required
      />
      <TextField
        id="standard-name"
        label="Email"
        type="email"
        className={classes.textFieldMain}
        value={state.classMember.email}
        onChange={e => updateMember("email", e.target.value)}
        margin="normal"
      />
    </>
  );
}

export default withStyles(styles)(MemberInfoForm);
