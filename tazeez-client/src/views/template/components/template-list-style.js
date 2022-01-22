const TemplateListStyle = (theme) => ({
  containerGrid: {
    width: "100%",
    height: 100,
    cursor: "pointer",
  },
  descriptionGrid: {
    paddingLeft: 4,
  },
  titleContainer: {
    width: "100%",
  },
  score: {
    borderRadius: "50%",
    border: "2px solid green",
    height: "32px",
    width: "32px",
    textAlign: "center",
    paddingTop: 4,
    color: "green",
  },
  settings: {
    fontSize: "18px",
  },
  card: {
    height: 116,
    borderRadius: "0.375rem",
    border: "1px dashed",
    "justify-content": "center",
    display: "flex",
    "justify-items": "center",
  },
  badge: {
    backgroundColor: "#0046c0",
    color: "white",
    height: 25,
    width: 25,
    borderRadius: "50%",
  },
  typography: {
    textAlign: "center",
  },
  button: {
    textTransform: "capitalize",
    display: "inline-block",
    fontSize: "15px",
    color: "#ffffff !important",
    backgroundColor: "#0046c0 !important",
    fontWeight: 500,
    padding: "8px 24px",
    marginBottom: 16,
    marginTop: 16,
    borderRadius: "4px",
    "&:hover": {
      color: "#0046c0 !important",
      backgroundColor: "#111111 !important",
    },
  },
  gridButton: {
    marginRight: 16,
    marginLeft: 16,
  },
});

export default TemplateListStyle;
