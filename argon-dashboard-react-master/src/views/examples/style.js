const adminNavbarLinksStyle = (theme) => ({
  search: {
    margin: "0",
    paddingTop: "7px",
    paddingBottom: "7px",
    [theme.breakpoints.down("sm")]: {
      margin: "10px 15px",
      float: "none !important",
      paddingTop: "1px",
      paddingBottom: "1px",
      padding: "10px 15px",
      width: "auto",
    },
  },
  searchInput: {
    paddingTop: "2px",
  },
  searchRTL: {
    [theme.breakpoints.down("sm")]: {
      marginRight: "18px !important",
    },
    [theme.breakpoints.up("md")]: {
      marginLeft: "12px",
    },
  },
  linkText: {
    zIndex: "4",
    fontSize: "14px",
    margin: "0!important",
    textTransform: "none",
  },
  buttonLink: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      margin: "5px 15px 0",
      width: "auto",
      height: "auto",
      "& svg": {
        width: "30px",
        height: "24px",
        marginRight: "19px",
        marginLeft: "3px",
      },
      "& .fab,& .fas,& .far,& .fal,& .material-icons": {
        width: "30px",
        fontSize: "24px",
        lineHeight: "30px",
        marginRight: "19px",
        marginLeft: "3px",
      },
    },
  },
  searchButton: {
    [theme.breakpoints.down("sm")]: {
      top: "-50px !important",
      marginRight: "38px",
      float: "right",
    },
  },
  top: {
    zIndex: "4",
  },
  searchIcon: {
    width: "17px",
    zIndex: "4",
  },
  links: {
    width: "20px",
    height: "20px",
    zIndex: "4",
    [theme.breakpoints.down("sm")]: {
      display: "block",
      width: "30px",
      height: "30px",
      color: "inherit",
      opacity: "0.8",
      marginRight: "16px",
      marginLeft: "-5px",
    },
  },

  wrapperRTL: {
    [theme.breakpoints.up("md")]: {
      paddingLeft: "16px",
    },
  },
  buttonLinkRTL: {
    [theme.breakpoints.down("sm")]: {
      alignItems: "center",
      justifyContent: "flex-end",
      width: "-webkit-fill-available",
      margin: "10px 15px 0",
      padding: "10px 15px",
      display: "block",
      position: "relative",
    },
  },
  labelRTL: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: "row-reverse",
      justifyContent: "initial",
      display: "flex",
    },
  },
  linksRTL: {
    [theme.breakpoints.down("sm")]: {
      marginRight: "-5px !important",
      marginLeft: "16px !important",
    },
  },
  managerClasses: {
    [theme.breakpoints.up("md")]: {
      display: "inline-block",
    },
  },
  headerLinksSvg: {
    width: "20px !important",
    height: "20px !important",
  },
  popperClose: {
    pointerEvents: "none",
    display: "none !important",
  },
  popperNav: {
    [theme.breakpoints.down("sm")]: {
      position: "static !important",
      left: "unset !important",
      top: "unset !important",
      transform: "none !important",
      willChange: "unset !important",
      "& > div": {
        boxShadow: "none !important",
        marginLeft: "0rem",
        marginRight: "0rem",
        transition: "none !important",
        marginTop: "0px !important",
        marginBottom: "0px !important",
        padding: "0px !important",
        backgroundColor: "transparent !important",
        "& ul li": {
          color: "#fff" + " !important",
          margin: "10px 15px 0!important",
          padding: "10px 15px !important",
          "&:hover": {
            backgroundColor: "hsla(0,0%,78%,.2)",
            boxShadow: "none",
          },
        },
      },
    },
  },
  manager: {
    "& > div > button:first-child > span:first-child, & > div > a:first-child > span:first-child":
      {
        width: "100%",
      },
  },
  innerManager: {
    "& > div > button,& > div > a": {
      margin: "0px !important",
      color: "inherit !important",
      padding: "10px 20px !important",
      "& > span:first-child": {
        width: "100%",
        justifyContent: "flex-start",
      },
    },
  },
  target: {
    "& > button:first-child > span:first-child, & > a:first-child > span:first-child":
      {
        display: "inline-block",
      },
    "& $caret": {
      marginLeft: "0px",
    },
  },
  dropdown: {
    borderRadius: "3px",
    border: "0",
    boxShadow: "0 2px 5px 0 rgba(0,0,0, 0.26)",
    top: "100%",
    zIndex: "1000",
    minWidth: "160px",
    padding: "5px 0",
    margin: "2px 0 0",
    fontSize: "14px",
    textAlign: "left",
    listStyle: "none",
    backgroundColor: "#fff",
    backgroundClip: "padding-box",
  },
  menuList: {
    padding: "0",
  },
  popperResponsive: {
    zIndex: "1200",
    [theme.breakpoints.down("sm")]: {
      zIndex: "1640",
      position: "static",
      float: "none",
      width: "auto",
      marginTop: "0",
      backgroundColor: "transparent",
      border: "0",
      boxShadow: "none",
      color: "black",
    },
  },
  dropdownItem: {
    fontSize: "13px",
    padding: "10px 20px",
    margin: "0 5px",
    borderRadius: "2px",
    position: "relative",
    transition: "all 150ms linear",
    display: "block",
    clear: "both",
    fontWeight: "400",
    height: "100%",
    whiteSpace: "nowrap",
    minHeight: "unset",
  },
  primaryHover: {
    "&:hover": {
      backgroundColor: "red",
      color: "#fff",
      boxShadow: "0 4px 20px 0 rgba(0,0,0,.14), 0 7px 10px -5px rgba(0,0,0,.4)",
    },
  },

  dropdownItemRTL: {
    textAlign: "right",
  },
  dropdownDividerItem: {
    margin: "5px 0",
    backgroundColor: "rgba(0,0,0, 0.12)",
    height: "1px",
    overflow: "hidden",
  },
  buttonIcon: {
    width: "20px",
    height: "20px",
  },
  caret: {
    transition: "all 150ms ease-in",
    display: "inline-block",
    width: "0",
    height: "0",
    marginLeft: "4px",
    verticalAlign: "middle",
    borderTop: "4px solid",
    borderRight: "4px solid transparent",
    borderLeft: "4px solid transparent",
  },
  caretActive: {
    transform: "rotate(180deg)",
  },
  caretDropup: {
    transform: "rotate(180deg)",
  },
  caretRTL: {
    marginRight: "4px",
  },
  dropdownHeader: {
    display: "block",
    padding: "0.1875rem 1.25rem",
    fontSize: "0.75rem",
    lineHeight: "1.428571",
    color: "#DDD",
    whiteSpace: "nowrap",
    fontWeight: "inherit",
    marginTop: "10px",
    "&:hover,&:focus": {
      backgroundColor: "transparent",
      cursor: "auto",
    },
  },
  noLiPadding: {
    padding: "0",
  },
});

export default adminNavbarLinksStyle;
