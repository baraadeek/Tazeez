const AddTempQuestionStyle = (theme) => ({
  containerChoices: {
    borderTop: "2px solid #ddd",
    marginTop: "16px",
  },
  containerGridChoices: {
    padding: 4,
  },
  Choice: {
    marginBottom: 8,
  },
  buttonDelete: {
    padding: `0px !important`,
    textTransform: "capitalize !important",
    marginBottom: `4px !important`,
  },
  marginBottom: {
    marginBottom: 8,
  },
  margin: {
    marginBottom: 8,
    marginTop: 8,
  },
  massage: {
    marginBottom: 8,
    marginLeft: 4,
    color: "#e91e63",
  },
  append: {
    padding: `0px !important`,
    marginRight: `4px !important`,
  },
  save: {
    padding: "16px 0",
  },
  buttonModal: {
    marginRight: 3,
    marginLeft: 3,
  },
  addNewQuestion: {
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
});

export default AddTempQuestionStyle;
