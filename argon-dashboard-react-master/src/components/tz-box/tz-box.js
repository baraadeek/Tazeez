import { forwardRef } from "react";

import PropTypes from "prop-types";

// Custom styles for MDBox
import TZBoxRoot from "./tz-box-root";

const TZBox = forwardRef(
  (
    {
      variant,
      bgColor,
      color,
      opacity,
      borderRadius,
      shadow,
      coloredShadow,
      ...rest
    },
    ref
  ) => (
    <TZBoxRoot
      {...rest}
      ref={ref}
      ownerState={{
        variant,
        bgColor,
        color,
        opacity,
        borderRadius,
        shadow,
        coloredShadow,
      }}
    />
  )
);

TZBox.defaultProps = {
  variant: "contained",
  bgColor: "transparent",
  color: "dark",
  opacity: 1,
  borderRadius: "none",
  shadow: "none",
  coloredShadow: "none",
};

TZBox.propTypes = {
  variant: PropTypes.oneOf(["contained", "gradient"]),
  bgColor: PropTypes.string,
  color: PropTypes.string,
  opacity: PropTypes.number,
  borderRadius: PropTypes.string,
  shadow: PropTypes.string,
  coloredShadow: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
    "none",
  ]),
};

export default TZBox;
