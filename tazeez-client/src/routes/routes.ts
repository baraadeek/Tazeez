import Auth from "views/layouts/Auth";
import { ROUTES_NAME_ENUM } from "../common/constants/routesNameEnum";
import { ROUTES_PATH_ENUM } from "../common/constants/routesPathEnum";
import Login from "../views/login/Login";

export type IRoute = {
  name: string;
  path: string;
  component: any;
  id: number;
  isMain?: boolean;
  icon?: any;
};

const routes: IRoute[] = [
  {
    name: ROUTES_NAME_ENUM.Home,
    path: ROUTES_PATH_ENUM.Home,
    component: Auth,
    // icon: SupervisorAccountIcon,
    isMain: true,
  },
   {
    name: ROUTES_NAME_ENUM.Login,
    path: ROUTES_PATH_ENUM.Login,
    component: Login,
    // icon: SupervisorAccountIcon,
    isMain: true,
  }
].map((rout, index) => Object.assign(rout, { id: index + 1 }));

export default routes;
