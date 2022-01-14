import "./App.css";
import { Route, Redirect, Switch } from "react-router-dom";
// import routes from "./routes/routes";
import React, { Fragment, Suspense, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { IRootReducer } from "./store/reducers/rootReducer";
import { normalRoutes, authRoutes } from "routes/routes";

// Material Dashboard 2 React components

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createCache from "@emotion/cache";
import { useMaterialUIController } from "context";

// Material Dashboard 2 React themes
import theme from "assets/theme";
import { ROUTES_PATH_ENUM } from "common/constants/routesPathEnum";
import Login from "views/login/Login";
import HomeLayout from "views/layouts/HomeLayout/HomeLayout";
import AdminLayout from "views/layouts/AdminLayout/AdminLayout";
// import themeRTL from "assets/theme/theme-rtl";

function App() {
  const [controller, dispatch] = useMaterialUIController();

  // const { t } = useTranslation(namespaces.pages.home);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [rtlCache, setRtlCache] = useState<EmotionCache | null>(null);

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

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      //@ts-ignore
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  const isAuthenticated = useSelector<IRootReducer>(
    (state) => state.authReducer.token !== null
  ) as boolean;

  if (true) {
    // const routs = authRoutes.map((rout) => (
    //   <Route key={rout.id} path={rout.path} exact component={rout.component} />
    // ));
    const mainPage = authRoutes.find((r) => r.isMain === true);

    return <AdminLayout routes={authRoutes}>{"Ahmad"}</AdminLayout>;
  } else {
    return (
      <HomeLayout>
        <Switch>
          {normalRoutes.map((rout) => (
            <Route
              key={rout.id}
              path={rout.path}
              exact
              component={rout.component}
            />
          ))}
          <Redirect to={ROUTES_PATH_ENUM.Home} />
        </Switch>
      </HomeLayout>
    );
  }
}

export default App;
