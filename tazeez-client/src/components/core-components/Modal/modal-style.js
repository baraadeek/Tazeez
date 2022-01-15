const ModalStyle = (theme) => ({
  root: {
    verticalAlign: "middle",
    borderBottom: "none",
    background: "white",
    paddingBottom: "0",
    minHeight: "16.43px",
  },
  dialogRoot: {
    height: "auto",
  },
  paper: {
    position: "static",
    borderRadius: "15px",
  },
  iconClass: {
    fontSize: "32px",
    color: "#1A73E8",
  },
  slackIcon: {
    height: 50,
  },
  greenIcon: {
    fontSize: "32px",
    color: "green",
  },
  title: {
    marginBottom: "10px ",
  },

  dialogContent: {
    height: "auto",
  },
  disabled: {
    "pointer-events": "none",
    "-webkit-user-select": "none",
    "-moz-user-select": "none",
    "-ms-user-select": "none",
    "user-select": "none",
    opacity: 0.8,
  },
  close: {
    position: "absolute !important",
    marginTop: "4px",
  },
  dialogFooter: {
    justifyContent: "center",
    padding: "20px",
  },
  titleIcon: { fontSize: "16px", verticalAlign: "middle" },
  titleText: {
    display: "inline-block",
  },
  rootActionBtns: {
    marginRight: "16px",
  },
  rootDialogActions: {
    padding: "20px",
  },
  rootDialogContent: {
    padding: "0px !important",
  },
  rootDialogTitle: { padding: "0px 24px !important", height: 48 },
  titleColor: ({ titleColor }) => titleColor,
  height: {
    height: 48,
  },
  circularContainer: {
    minHeight: 400,
  },
});

export default ModalStyle;
