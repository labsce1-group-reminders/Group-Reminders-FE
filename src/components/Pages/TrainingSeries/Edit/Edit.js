import React from "react";

import Title from "./helpers/Title.js";
import AssignTeamMembers from "components/Pages/TeamMembers/Assign/";
import AssignList from "components/Pages/TeamMembers/List/Assign/";
import Messages from "../Messages/";
import MessagesList from "../List/Messages/";

import { withStyles } from "@material-ui/core/styles";
import { Paper, Divider } from "@material-ui/core/";

import { styles, PageContainer } from "./styles.js";

function Edit(props) {
  const { classes } = props;

  return (
    <PageContainer>
      <Paper className={classes.paper}>
        <Title history={props.history} match={props.match} />
        <Divider variant="fullWidth" className={classes.divider} />
        <Messages
          List={MessagesList}
          ts_id={props.match.params.id}
          history={props.history}
        />
      </Paper>
      <AssignTeamMembers
        history={props.history}
        match={props.match}
        user_id={props.user_id}
        List={AssignList}
        ts_id={props.match.params.id}
      />
    </PageContainer>
  );
}

export default withStyles(styles)(Edit);