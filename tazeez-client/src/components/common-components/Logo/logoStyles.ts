import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { mainPrimaryColor } from "assets/theme/base/colors";

const useLogoStyles = makeStyles((theme: Theme) =>
  createStyles({
    logoText: {
      color: mainPrimaryColor,
    },
    logoDivContainer: {
      width: "100%",
    },
  })
);

export default useLogoStyles;
