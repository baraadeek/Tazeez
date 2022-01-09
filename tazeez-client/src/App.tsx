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

  //   const {isAuthenticated, message, userName} = useSelector<IAuthReducerState>(state => ({
  //     isAuthenticated: state.authReducer.token !== null,
  //     message: state.appReducer.message,
  //     userName: state.authReducer.userName
  // }));

  if (true) {
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
              brandName="Material Dashboard 2"
              routes={routes.map((r) => ({
                type:'collapse',
                name: r.name,
                key: r.name.toLowerCase(),
                icon: null,
                route: r.path,
                component: <r.component />,
              }))}
              // onMouseEnter={handleOnMouseEnter}
              // onMouseLeave={handleOnMouseLeave}
            />
            <Configurator />
            {/* {configsButton} */}
          </>
        )}
        {layout === "vr" && <Configurator />}
        <Switch>
          {/* {getRoutes(routes)} */}
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
    return <Auth />;
  }
}

export default App;
