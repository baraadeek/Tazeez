import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { Box, makeStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import Tooltip from "@material-ui/core/Tooltip";

import Account from "./account.png";

import TZTypography from "components/tz-typography/tz-typography";
import UserStyle from "./Profile-style";

const useStyles = makeStyles(UserStyle);

const VISIBLE_AVATAR_MAX_COUNT = 2;

export const getInitials = (name = "", capitalize = true) => {
  if (!name || !name.length) {
    return "";
  }

  let firstInitial;
  let lastInitial;
  const splitName = name.trim().split(" ");

  if (splitName.length > 1) {
    firstInitial = splitName[0][0] || "";
    lastInitial = splitName[1][0] || "";
  } else {
    firstInitial = splitName[0][0] || "";
    lastInitial = splitName[0][1] || "";
  }

  const initialsToReturn = `${firstInitial}${lastInitial}`;
  return capitalize ? initialsToReturn.toUpperCase() : initialsToReturn;
};

export function formatUserObj(user) {
  let userObject = { ...user };
  if (!user.fullName) {
    userObject = { ...userObject, fullName: userObject.name };
  }
  return userObject;
}

function UserAvatar(props) {
  // Hooks
  const classes = useStyles(props);
  const {
    totalCount,
    users,
    size,
    showName,
    showFullName,
    hover,
    className,
    showTooltip,
    typographyType,
    fontcolor,
    onAvatarClick,
  } = props;
  const classnames = classNames(
    classes.avatar,
    { [classes[size]]: size },
    className
  );

  const Container = showTooltip ? Tooltip : Box;

  const renderAvatar = () => {
    let array = [];

    for (let i = 0; i < users.length; i++) {
      const userObj = formatUserObj(users[i]);

      const containerProps = showTooltip
        ? {
            title: userObj?.fullName ? userObj?.fullName : "",
            style: {
              backgroundImage: userObj?.image
                ? ""
                : userObj?.fullName
                ? ""
                : `url(${Account})`,
            },
            className: onAvatarClick ? classes.pointer : {},
            key: i.toFixed,
            onClick: (e) => onAvatarClick && onAvatarClick(e),
          }
        : { key: 0 };
      array.push(
        <Container {...containerProps}>
          <Avatar
            variant="circular"
            src={`${userObj?.image}`}
            className={classnames}
          >
            {showName ? getInitials(userObj?.fullName) : ""}
          </Avatar>
        </Container>
      );
    }
    if (totalCount - VISIBLE_AVATAR_MAX_COUNT > 0) {
      array.push(
        <Avatar key={Date.now()} variant="circular" className={classnames}>
          +
          {totalCount - VISIBLE_AVATAR_MAX_COUNT > 9
            ? 9
            : totalCount - VISIBLE_AVATAR_MAX_COUNT}
        </Avatar>
      );
    }

    return array;
  };

  return users?.length ? (
    <Box
      display={"flex"}
      alignItems={"center"}
      className={classNames({ [classes.container]: hover })}
    >
      {users?.length ? (
        <AvatarGroup classes={{ avatar: classes.avatarGroup }} spacing={4}>
          {renderAvatar()}
        </AvatarGroup>
      ) : null}
      {showFullName ? (
        <Box display={"flex"} marginLeft={1} overflow={"hidden"}>
          <TZTypography
            overFlow
            type={typographyType}
            fontcolor={fontcolor ? fontcolor : hover ? " " : "gray"}
          >
            {users[0]?.fullName || users[0]?.name}
          </TZTypography>
        </Box>
      ) : null}
    </Box>
  ) : (
    <div></div>
  );
}

UserAvatar.defaultProps = {
  totalCount: 1,
  size: "md",
  showName: true,
  showTooltip: true,
  typographyType: "para",
};

UserAvatar.propTypes = {
  users: PropTypes.array,
  totalCount: PropTypes.number,
  size: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
  showName: PropTypes.bool,
  showFullName: PropTypes.bool,
  hover: PropTypes.bool,
  typographyType: PropTypes.string,
  fontcolor: PropTypes.string,
  onAvatarClick: PropTypes.func,
};

export default UserAvatar;
