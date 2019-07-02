import React from "react";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {withStyles} from "@material-ui/core/styles";

import {styles} from "../styles.js";
// import {initialState, reducer} from "../reducer";

function Relationships({state, dispatch, classMembers, classes, classesArray = []}) {
    const roles = ["class"];
    const classMinusSelf = classesArray.filter(m => m.id !== state.classMember.class_id);
    const classSelf = classesArray.filter(m => m.id === state.classMember.class_id);

    const [memberClass, setMemberClass] = React.useState({
        title: classSelf.length !== 0 ? classSelf[0]["title"]: "Select class",
    });
    const updateRole =  async (event) => {
        try{
            dispatch({type: "UPDATE_MEMBER", key: `class_id`, payload: event.target.value});
            console.log("memberClass=",{memberClass})
        }catch (error) {
            dispatch({type: "UPDATE_MEMBER_FAILED", key: `class_id`, payload: error});
        }
    };

    let relations = roles.map(role => {
        let title = role[0].toUpperCase() + role.substring(1);
        title = classMinusSelf.length ? title : `Add a Class First`;
        return (
            <FormControl key={role} className={classes.formControl}>
                <InputLabel htmlFor={`${role}-simple`}>{title}</InputLabel>
                <Select
                    disabled={!classMinusSelf.length}
                    onChange={event => {
                        updateRole(event)
                            .finally(()=> setMemberClass({ "title": event.target.value}))
                    }}
                    value={memberClass.title}
                    inputProps={{
                        name: `title`,
                        id: `${role}-simple`,
                    }}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {classMinusSelf.map(m =>
                        <MenuItem key={`${role}_${m.id}`} value={m.id}>
                            {m.title}
                        </MenuItem>
                    )}
                </Select>
            </FormControl>
        );
    });
    return (
        <>
            {relations}
        </>
    );
}

export default withStyles(styles)(Relationships);
