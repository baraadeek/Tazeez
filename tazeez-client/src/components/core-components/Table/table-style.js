const hexToRgb = (input) => {
  input = input + "";
  input = input.replace("#", "");
  let hexRegex = /[0-9A-Fa-f]/g;
  if (!hexRegex.test(input) || (input.length !== 3 && input.length !== 6)) {
    throw new Error("input is not a valid hex color.");
  }
  if (input.length === 3) {
    let first = input[0];
    let second = input[1];
    let last = input[2];
    input = first + first + second + second + last + last;
  }
  input = input.toUpperCase(input);
  let first = input[0] + input[1];
  let second = input[2] + input[3];
  let last = input[4] + input[5];
  return (
    parseInt(first, 16) +
    ", " +
    parseInt(second, 16) +
    ", " +
    parseInt(last, 16)
  );
};
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

const defaultFont = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontWeight: "300",
  lineHeight: "1.5em",
};

const tableStyle = (theme) => ({
  right: {
    textAlign: "right",
  },
  table: {
    marginBottom: "0",
    width: "100%",
    maxWidth: "100%",
    backgroundColor: "transparent",
    borderSpacing: "0",
    borderCollapse: "collapse",
    overflow: "auto",
  },
  tableShoppingHead: {
    fontSize: "0.9em !important",
    textTransform: "uppercase !important",
  },
  tableHeadFontSize: {
    fontSize: "1.25em !important",
  },
  tableHeadCell: {
    color: "rgba(" + hexToRgb("#000") + ", 0.87)",
    border: "none !important",
  },
  tableCell: {
    ...defaultFont,
    lineHeight: "1.42857143",
    padding: "12px 8px!important",
    verticalAlign: "middle",
    fontSize: "1em",
    borderBottom: "1px solid rgba(224, 224, 224, 1) !important",
    borderTop: "1px solid " + grayColor[5],
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      minHeight: "24px",
      minWidth: "32px",
    },
  },
  tableCellTotal: {
    fontWeight: "500",
    fontSize: "1.25em",
    paddingTop: "14px",
    textAlign: "right",
  },
  tableCellAmount: {
    fontSize: "26px",
    fontWeight: "300",
    marginTop: "5px",
    textAlign: "right",
  },
  tableResponsive: {
    // width: "100%",
    minHeight: "0.1%",
    overflowX: "auto",
  },
  tableStripedRow: {
    backgroundColor: grayColor[12],
  },
  tableRowHover: {
    "&:hover": {
      backgroundColor: grayColor[13],
    },
  },
  tableRowBody: {
    height: "48px",
  },
  tableRowHead: {
    height: "56px",
  },
  textAlignCenter: {
    minHeight: 400,
  },
});

export default tableStyle;
