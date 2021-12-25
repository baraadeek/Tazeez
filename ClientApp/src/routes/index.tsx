import { Route } from "react-location";
import Login from "../components/Login/Login";
import SignUp from "../components/Signup/Signup";
import Index from "../pages/Home";

const appRoutes: Route[] = [
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "login",
    children: [{ path: "/", element: <Login /> }],
  },
  {
    path: "signup",
    children: [{ path: "/", element: <SignUp/>}],
  },
];

export default appRoutes;
