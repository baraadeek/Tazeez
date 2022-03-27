import { createStyles, makeStyles, Theme } from "@material-ui/core";
import sharedStyles from "common/shareStyles/sharedStyles";

const useAssignedQuestionnaireStyles = makeStyles((theme: Theme) =>
  createStyles({
    ...sharedStyles,
    attachmentBox: {
      border: "1px solid gray",
      borderRadius:10,
      "& button":{
        color:'white!important'
      }
    },
    question: {
      fontSize: "2rem",
      display: "inline",
      textTransform: "capitalize",
    },
    questionText: {
      textTransform: "capitalize",
      display: "inline",
      fontSize: "2rem",
    },
    cardComponent: {
      margin:0,
    },
    choicesContainer: {
      display: "flex",
      flexGrow: 1,
      "& > div": {
        flexGrow: 1,
        display: "flex",
        flexDirection: "row",
        "& label": {},
      },
    },
    choicesText: {
      fontSize: "1.5rem",
      textTransform: "capitalize",
    },
    choiceCheckBox: {
      textTransform: "capitalize",
    },
    get textField() {
      return {
        ...sharedStyles.displayFlexGrowFull,
        "& div": {
          ...sharedStyles.displayFlexGrowFull,
          "& textArea": {
            height: "calc(100% - 20px) !important",
          },
        },
      };
    },
  })
);

export default useAssignedQuestionnaireStyles;
