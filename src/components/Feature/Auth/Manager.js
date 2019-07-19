import React from "react";
import {Input, Paper, Typography} from "@material-ui/core";
 export default ({value, changeHandler, classes}) =>{

    return (
        <Paper className={classes.organizationCreate}>
          <Typography className={classes.textTitle}>
              Please enter an country:
          </Typography>
            <Input value={value}
                   placeholder={"Please enter a country"}
                   onChange={changeHandler}
                   name={"country"}
            />

      </Paper>
    );

}

