import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

// Material UI
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

// Styles
import TypographyStyle from "./typography-style.js";

const useStyles = makeStyles(TypographyStyle);

function TypographyComponent(props) {
  // Hooks
  const classes = useStyles(props);
  //props
  const {
    children,
    type,
    overFlow,
    className,
    textTransform,
    fontWeight,
    ...rest
  } = props;

  //classNames
  const classnames = classNames(
    {
      [classes[type]]: type,
      [classes.overflow]: overFlow,
      [classes.root]: true,
      [classes.textTransform]: textTransform,
      [classes.fontWeight]: fontWeight,
    },
    classes.root,
    className
  );

  return (
    <Typography className={classnames} {...rest}>
      {children}
    </Typography>
  );
}

TypographyComponent.defaultProps = {
  overFlow: false,
  numberOfLines: 1,
};
TypographyComponent.propTypes = {
  lineHeight: PropTypes.number,
  children: PropTypes.any,
  disabled: PropTypes.bool,
  overFlow: PropTypes.bool,
  fontcolor: PropTypes.string,
  type: PropTypes.oneOf(["h1", "h2", "h3", "h4"]),
  numberOfLines: PropTypes.number,
  fontSize: PropTypes.number,
};

export default TypographyComponent;
