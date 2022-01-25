import { mainPrimaryColor } from "assets/theme/base/colors";
import hexToRgb from "assets/theme/functions/hexToRgb";

const adminNavbarLinksStyle = (theme) => ({
  dropdownItem: {
    fontFamily: "roboto !important",
    lineHeight: "1.5em",
    fontSize: "15px",
    padding: "6px 12px",
    margin: "5px 5px",
    borderRadius: "2px",
    position: "relative",
    transition: "all 150ms linear",
    clear: "both",
    fontWeight: "400",
    height: "48px",
    color: "#333",
    whiteSpace: "nowrap",
    minHeight: "unset",
    alignItems: "center",
  },
  primaryHover: {
    "&:hover": {
      backgroundColor: mainPrimaryColor,
      color: "white",
      boxShadow:
        "0 4px 20px 0 rgba(" +
        hexToRgb("#000") +
        ",.14), 0 7px 10px -5px rgba(" +
        hexToRgb(mainPrimaryColor) +
        ",.4)",
      "& svg": {
        color: "white",
      },
    },
  },
  color: {
    backgroundColor: "white",
  },
  popoverList: {
    minWidth: 100,
  },
  paddingMenuList: {
    padding: 0,
  },
  styleDivider: {
    margin: " 0px",
    flexShrink: 0,
    background: "rgba(34, 51, 84, 0.1)",
    border: "0px",
    height: "1px",
  },
  typographyFont: {
    lineHeight: 1.5,
    fontHeight: 700,
    color: "#344767",
    display: "block",
    textAlign: "start",
  },
  fontLine: {
    fontWeight: "bold",
    fontSize: "14px",
    lineHeight: 1.43,
    textAlign: "start",
  },
  borderButton: {
    padding: "6px 8px",
    borderRadius: "6px",
  },
  widthIcon: {
    minWidth: 40,
  },
  borderNavButton: {
    width: "248px",
    margin: "0 2px",
    padding: "6px 24px",
    borderRadius: "6px",
  },
  typographyShowMenu: {
    lineHeight: 1.5,
    fontHeight: 500,
    color: "white",
    display: "block",
  },

  paddingGrid: {
    padding: "16px",
    borderRadius: "6px",
    minWidth: "210px",
  },
  dividerGray: {
    margin: "10px 15px 0",
    borderBottom: "2px solid rgba(255, 255, 255, 0.2)",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
});

export default adminNavbarLinksStyle;
