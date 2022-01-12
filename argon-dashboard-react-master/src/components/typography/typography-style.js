const JP_FONT_SIZE = {
  xl: "32px",
  lg: "24px",
  md: "18px",
  sm: "13px",
  xs: "10px",
};

const TypographyStyle = (theme) => ({
  fontWeight: {
    fontWeight: ({ fontWeight }) => fontWeight,
  },
  root: {
    color: ({ fontcolor, disabled }) =>
      disabled ? "rgba(70, 72, 74, 0.5)" : fontcolor || "none",
    textDecoration: ({ disabled }) => (disabled ? "line-through" : "none"),
    marginRight: ({ spacing }) => `${spacing}px`,
  },
  overflow: {
    "-webkit-line-clamp": ({ numberOfLines }) => numberOfLines,
    overflow: "hidden",
    textOverflow: "ellipsis",
    "-webkit-box-orient": "vertical",
    display: "-webkit-box",
    fontSize: ({ fontSize }) => fontSize,
    overflowWrap: "anywhere",
  },
  h1: {
    letterSpacing: "-0.64px",
    fontSize: ({ fontSize }) => fontSize || JP_FONT_SIZE["xl"],
    color: ({ fontcolor }) =>
      fontcolor
        ? fontcolor
        : `linear-gradient(90deg, #1B5379 10%, rgba(33,149,243,1) 40%) 0% 0% no-repeat padding-box`,
    fontWeight: "bold",
  },
  h2: {
    fontSize: ({ fontSize }) => fontSize || JP_FONT_SIZE["lg"],
    color: ({ fontcolor }) => (fontcolor ? fontcolor : "rgba(70,72,74,0.9)"),
    fontWeight: "bold",
    letterSpacing: "-0.48px",
  },
  h3: {
    fontSize: ({ fontSize }) => fontSize || JP_FONT_SIZE["md"],
    color: ({ fontcolor }) => (fontcolor ? fontcolor : "rgba(70,72,74,0.9)"),
    fontWeight: "bold",
    lineHeight: ({ lineHeight }) => `${lineHeight}px` || "15px",
  },
  h4: {
    fontSize: ({ fontSize }) => fontSize || JP_FONT_SIZE["sm"],
    color: ({ fontcolor }) => (fontcolor ? fontcolor : "rgba(70, 72, 74, 0.5)"),
    fontWeight: ({ fontWeight }) => fontWeight || "regular",
    letterSpacing: "1.04px",
    textTransform: "uppercase",
  },
  rightMargined: {
    marginRight: "5px",
  },
  textTransform: {
    textTransform: "uppercase",
  },
});

export default TypographyStyle;
