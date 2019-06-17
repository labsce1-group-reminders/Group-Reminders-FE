import React from "react";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core/styles";

import { styles } from "../styles.js";

function Relationships({ state, dispatch, classMembers, classes, classArray=[] }) {
  const roles = ["class"];
  const classMinusSelf = classArray.filter(m => m.id !== state.classMember.class_id);

  return (
    <>
      {roles.map(role => {
        let title = role[0].toUpperCase() + role.substring(1);
        title = classMinusSelf.length ? title : `Add a Class First`;
        const updateRole = (id, name) => {
          dispatch({ type: "UPDATE_MEMBER", key: `${role}_id`, payload: id });
          dispatch({
            type: `UPDATE_${role.toUpperCase()}_NAME`,
            payload: name
          });
        };
        return (
          <FormControl key={role} className={classes.formControl}>
            <InputLabel htmlFor={`${role}-simple`}>{title}</InputLabel>
            <Select
              disabled={!classMinusSelf.length}
              value={state.classMember[`${role}_id`]}
              onChange={(e, value) => {
                updateRole(e.target.value, value.props.children);
              }}
              inputProps={{
                name: `member${title}`,
                id: `${role}-simple`
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {classMinusSelf.map(m => {
                const name = `${m.title}`;
                return (
                  <MenuItem key={`${role}_${m.id}`} value={m.id}>
                    {name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        );
      })}
    </>
  );
}

export default withStyles(styles)(Relationships);
