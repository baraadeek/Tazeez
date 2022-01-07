import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";

import CardStyle from "./card-style";
const useStyles = makeStyles(CardStyle);

function CardComponent(props) {
  const classes = useStyles(props);
  const {
    children,
    leftSided,
    rightSided,
    leftAnchor,
    center,
    className,
    sideColor,
    ...rest
  } = props;

  const classnames = classNames(
    classes.card,
    {
      [classes.center]: center,
      [classes.leftSided]: leftSided,
      [classes.rightSided]: rightSided,
      [classes.leftAnchor]: leftAnchor,
    },
    className
  );

  return (
    <Card className={classnames} {...rest}>
      {children}
    </Card>
  );
}

CardComponent.defaultProps = {
  leftSided: false,
  rightSided: false,
  center: false,
  sideColor: "secondary",
};

CardComponent.propTypes = {
  classes: PropTypes.object,
  leftSided: PropTypes.bool,
  rightSided: PropTypes.bool,
  center: PropTypes.bool,
  sideColor: PropTypes.any,
  children: PropTypes.any,
};

export default CardComponent;
