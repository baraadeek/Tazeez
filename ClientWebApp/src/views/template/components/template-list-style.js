const TemplateListStyle = (theme) => ({
  containerGrid: {
    width: "100%",
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
    fontSize: "15px",
    fontWeight: 500,
    padding: "8px 24px",
    marginBottom: 16,
    marginTop: 16,
    borderRadius: "4px",
  },
  gridButton: {
    marginRight: 16,
    marginLeft: 16,
  },
});

export default TemplateListStyle;
