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
    position: "relative",
    top: 16,
  },
  avatar: {
    marginRight: "14px",
  },
}));

export default function AvatarWithText() {
  const classes = useStyles();

  return (
    <div className={classes.avatarContainer}>
      <div className={classes.avatarLabel}>
        <Avatar
          className={classes.avatar}
          alt="Jack Sparrow"
          src="https://images.pexels.com/photos/6386956/pexels-photo-6386956.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        />
        <Typography variant="body2"> Jack Sparrow</Typography>
      </div>
    </div>
  );
}
