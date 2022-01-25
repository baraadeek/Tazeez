import sharedStyles from "common/shareStyles/sharedStyles";
import { createStyles, makeStyles, Theme } from "@material-ui/core";


const useICTableStyle = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 650,
    },
    loader: {
      minHeight: 150,
      width: "100%",
    },
    collapseTableCell: {
      paddingBottom: 0,
      paddingTop: 0,
      border: "none",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    selectedRow: {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
    },
    ...sharedStyles as any
  })
);

export default useICTableStyle;
