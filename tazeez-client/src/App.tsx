import "./App.css";
import { Route, Redirect, Switch } from "react-router-dom";
// import routes from "./routes/routes";
import React, { Fragment, Suspense, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { IRootReducer } from "./store/reducers/rootReducer";
import routes from "routes/routes";
import Auth from "views/layouts/Auth";

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

  if (isAuthenticated) {
    const routs = routes.map((rout) => (
      <Route key={rout.id} path={rout.path} exact component={rout.component} />
    ));
    const mainPage = routes.find((r) => r.isMain === true);

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {layout === "dashboard" && (
          <>
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
            <Configurator />
            {/* {configsButton} */}
          </>
        )}
        {layout === "vr" && <Configurator />}
        <Switch>
          {routs}
          {/* <Route path="*" element={<Navigate to="/dashboard" />} /> */}
        </Switch>
      </ThemeProvider>
    );

    return (
      <Fragment>
        {/* <Layout onLogout={onLogout} currentUser={userName}> */}
        <Suspense fallback={<div>Loading ...</div>}>
          <Switch>
            {routs}
            <Route path="/" component={Auth} />
            <Redirect to={mainPage!.path} />
          </Switch>
        </Suspense>
        {/* </Layout> */}
      </Fragment>
    );
  } else {
    return <Switch>
       <Route  path={ROUTES_PATH_ENUM.Home} exact component={Auth} />
       <Route  path={ROUTES_PATH_ENUM.Login} exact component={Login} />
       <Redirect to={ROUTES_PATH_ENUM.Home} />
    </Switch>
  }
}

export default App;
