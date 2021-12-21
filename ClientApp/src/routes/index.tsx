import { Route } from "react-location";
import Login from "../components/Login";
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
    children: [{ path: "/", element: <div>Sign Up Page</div> }],
  },
];

export default appRoutes;
