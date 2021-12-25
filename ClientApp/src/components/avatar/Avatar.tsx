import React from "react";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  avatarContainer: {
    display: "flex",
    cursor: "pointer",
  },
  avatarLabel: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    marginRight: "14px",
  },
}));

export default function AvatarWithText(props) {
  const { user, onClick } = props;
  const classes = useStyles();

  return (
    <div className={classes.avatarContainer} onClick={(e) => onClick(e)}>
      <div className={classes.avatarLabel}>
        <Avatar className={classes.avatar} alt={user?.name} src="">
          <i className="icofont-doctor-alt" style={{ color: "#0046c0" }}></i>
        </Avatar>
        <Typography variant="body2"> {user?.name}</Typography>
      </div>
    </div>
  );
}
