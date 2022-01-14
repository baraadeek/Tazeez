import * as React from "react";
// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createCache from "@emotion/cache";
import { useMaterialUIController } from "context";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Material Dashboard 2 React themes
import theme from "assets/theme";
import { ROUTES_PATH_ENUM } from "common/constants/routesPathEnum";
import { IRoute } from "routes/routes";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// import themeRTL from "assets/theme/theme-rtl";

interface IAdminLayoutProps {
  routes: IRoute[];
}

const AdminLayout: React.FunctionComponent<IAdminLayoutProps> = (props) => {
  const { routes } = props;
  const [controller, dispatch] = useMaterialUIController();

  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  console.log(
    "🚀 ~ file: AdminLayout.tsx ~ line 41 ~ sidenavColor",
    sidenavColor
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        <DashboardLayout>
          <DashboardNavbar />
          <CssBaseline />
          <Sidenav
            color={sidenavColor}
            brand={null}
            brandName="Tazeez"
            routes={routes.map((r) => ({
              type: "collapse",
              name: r.name,
              key: r.name.toLowerCase(),
              icon: null,
              route: r.path,
              component: <r.component />,
            }))}
          />
        </DashboardLayout>
      </ThemeProvider>
    </>
  );
};

export default AdminLayout;
