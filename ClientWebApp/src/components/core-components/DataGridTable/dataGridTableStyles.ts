import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import sharedStyles from "common/shareStyles/sharedStyles";

const useDataGridTableStyles = makeStyles((theme: Theme) =>
  createStyles({
    ...sharedStyles,
    cardBody: {
      border: "none",
      padding: 0,
    },
    dataGridTable: {
      border: "none !important",
    },
    cardBodyHeaderTitle: {
      fontSize: 22,
    },
    cardComponent: {
      margin: 0,
    },
  })
);

export default useDataGridTableStyles;
