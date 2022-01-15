const UserStyle = (theme) => ({
  container: {
    "&:hover $userName": {
      color: "white",
    },
  },
  avatarGroup: {
    border: "none",
  },
  avatar: {
    backgroundColor: "#0046c0",
    backgroundPosition: "center",
    backgroundSize: "80%",
    backgroundRepeat: "no-repeat",
    color: "#fff",
    border: `.5px solid #0046c0`,
    fontSize: "10px",
    fontWeight: "bold",
    width: "100px",
    height: "100px",
  },
  sm: {
    width: "20px",
    height: "20px",
  },
  md: {
    width: "28px",
    height: "28px",
  },
  lg: {
    width: "36px",
    height: "36px",
  },
  xl: {
    width: "44px",
    height: "44px",
  },
  image: {
    maxWidth: "100%",
  },
  pointer: {
    cursor: "pointer",
  },
  popoverGrid: {
    position: "relative",
    "-webkit-font-smoothing": "antialiased",
    backgroundImage:
      "linear-gradient(180deg, #0964A2 0%, #1B5379 51%, #17415D 100%) ",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 96px",
    boxSizing: "content-box",
    padding: 24,
    width: 360,
    height: 120,
  },
  circularContainer: {
    padding: 24,
    width: 360,
    height: 120,
  },
  email: {
    display: "inline-block",
    position: "absolute",
    margin: 4,
  },
  icon: {
    color: "gray",
  },
});

export default UserStyle;
