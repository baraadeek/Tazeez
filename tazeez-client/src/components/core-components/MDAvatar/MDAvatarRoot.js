/**
=========================================================
* Material Dashboard 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";

export default styled(Avatar)(({ theme, ownerState }) => {
  const { palette, functions, typography, boxShadows } = theme;
  const { shadow, bgColor, size } = ownerState;

  const { gradients, transparent, white } = palette;
  const { pxToRem, linearGradient } = functions;
  const { size: fontSize, fontWeightRegular } = typography;

  // backgroundImage value
  const backgroundValue =
    bgColor === "transparent"
      ? transparent.main
      : linearGradient(gradients[bgColor]?.main, gradients[bgColor]?.state);

  // size value
  let sizeValue;

  switch (size) {
    case "xs":
      sizeValue = {
        width: `${pxToRem(24)} !important`,
        height: `${pxToRem(24)} !important`,
        fontSize: fontSize.xs,
      };
      break;
    case "sm":
      sizeValue = {
        width: `${pxToRem(36)} !important`,
        height: `${pxToRem(36)} !important`,
        fontSize: fontSize.sm,
      };
      break;
    case "lg":
      sizeValue = {
        width: `${pxToRem(58)} !important`,
        height: `${pxToRem(58)} !important`,
        fontSize: fontSize.sm,
      };
      break;
    case "xl":
      sizeValue = {
        width: `${pxToRem(74)} !important`,
        height: `${pxToRem(74)} !important`,
        fontSize: fontSize.md,
      };
      break;
    case "xxl":
      sizeValue = {
        width: `${pxToRem(110)} !important`,
        height: `${pxToRem(110)} !important`,
        fontSize: fontSize.md,
      };
      break;
    default: {
      sizeValue = {
        width: `${pxToRem(48)} !important`,
        height: `${pxToRem(48)} !important`,
        fontSize: fontSize.md,
      };
    }
  }

  return {
    background: backgroundValue,
    color: white.main,
    fontWeight: fontWeightRegular,
    boxShadow: boxShadows[shadow],
    ...sizeValue,
  };
});
