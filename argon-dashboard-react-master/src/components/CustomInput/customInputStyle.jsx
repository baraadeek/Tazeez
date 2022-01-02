const grayColor = [
  "#999",
  "#777",
  "#3C4858",
  "#AAAAAA",
  "#D2D2D2",
  "#DDD",
  "#555555",
  "#333",
  "#eee",
  "#ccc",
  "#e4e4e4",
  "#E5E5E5",
  "#f9f9f9",
  "#f5f5f5",
  "#495057",
  "#e7e7e7",
  "#212121",
  "#c8c8c8",
  "#505050",
];
const infoColor = ["#00acc1"];
const dangerColor = ["#f44336"];

const customInputStyle = {
  disabled: {
    "&:before": {
      borderColor: "transparent !important",
    },
  },
  underline: {
    "&:hover:not($disabled):before,&:before": {
      borderColor: grayColor[4] + "!important",
      borderWidth: "1px !important",
    },
    "&:after": {
      borderColor: infoColor[0],
    },
    "& + p": {
      fontWeight: "300",
    },
  },
  underlineError: {
    "&:after": {
      borderColor: dangerColor[0],
    },
  },
  labelRoot: {
    color: grayColor[3] + " !important",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "1.42857",
    top: "10px",
    letterSpacing: "unset",
    "& + $underline": {
      marginTop: "0px",
    },
  },
  labelRootError: {
    color: dangerColor[0] + " !important",
  },
  formControl: {
    margin: "0 0 17px 0",
    paddingTop: "27px",
    position: "relative",
    verticalAlign: "unset",
    "& svg,& .fab,& .far,& .fal,& .fas,& .material-icons": {
      color: grayColor[14],
    },
  },
  whiteUnderline: {
    "&:hover:not($disabled):before,&:before": {
      backgroundColor: "#fff",
    },
    "&:after": {
      backgroundColor: "#fff",
    },
  },
  input: {
    color: grayColor[14],
    height: "unset",
    "&,&::placeholder": {
      fontSize: "14px",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: "400",
      lineHeight: "1.42857",
      opacity: "1",
    },
    "&::placeholder": {
      color: grayColor[3],
    },
  },
  whiteInput: {
    "&,&::placeholder": {
      color: "#fff",
      opacity: "1",
    },
  },
};

export default customInputStyle;
