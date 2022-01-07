const CardStyle = (theme) => ({
  card: {
    minHeight: 44,
    backgroundColor: "white",
    display: "flex",
    width: "100%",
    borderRadius: "0px",
    alignItems: "center",
    padding: "0 16px",
    paddingLeft: "10px",
    paddingRight: "10px",
  },
  leftAnchor: {
    borderLeft: "5px solid",
  },
  leftSided: {
    borderTopLeftRadius: "5px",
    borderBottomLeftRadius: "5px",
  },
  rightSided: {
    borderTopRightRadius: "5px",
    borderBottomRightRadius: "5px",
  },
  center: {
    display: "flex",
    justifyContent: "center",
  },
});

export default CardStyle;
