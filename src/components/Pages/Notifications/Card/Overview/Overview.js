// main page for displaying list of all training series
import React, { useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";
import phoneFormatter from "phone-formatter";

import { getNotifications } from "store/actions";

import { withStyles } from "@material-ui/core/styles";
import { ListItem, ListItemText, Typography } from "@material-ui/core/";
import { ListStyles, styles } from "./styles.js";

function Overview(props) {
  const {
    pagination,
    filters,
    filter,
    getNotifications: getNotificationsFromProps,
    notifications,
    classes
  } = props;

  useEffect(() => {
    getNotificationsFromProps();
  }, [getNotificationsFromProps]);

  const setFilters = { items: notifications, pagination, filters };

  const formatted = filter(setFilters).map(
    ({
      id,
      first_name,
      last_name,
      send_date,
      subject,
      name,
      email,
      phone_number,
      series
    }) => {
      const formattedSendDate = moment(send_date)
        .add(1, "hours")
        .format("MMMM Do");
      return (
        <ListItem key={id} className={classes.listItem}>
          <ListItemText
            primary={`${subject} | ${series}`}
            secondary={`${first_name} ${last_name} | ${
              email
                ? email
                : phone_number
                ? phoneFormatter.format(phone_number, "(NNN) NNN-NNNN")
                : name
            }`}
          />
          <Typography className={classes.send_date}>
            {filters.status === "pending" ? "Send Date" : "Sent on"}
            <br />
            {formattedSendDate}
          </Typography>
        </ListItem>
      );
    }
  );
  return <ListStyles>{formatted}</ListStyles>;
}

const mapStateToProps = state => ({
  notifications: state.notificationsReducer.notifications
});

export default connect(
  mapStateToProps,
  { getNotifications }
)(withStyles(styles)(Overview));
