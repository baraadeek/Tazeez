import * as React from "react";
import useLogoStyles from "./logoStyles";

export interface ILogoProps {}

export default function Logo(props: ILogoProps) {
  const classes = useLogoStyles(props);

  return (
    <div className={classes.logoDivContainer}>
      <h1 className={classes.logoText}>تعزيز</h1>
    </div>
  );
}
