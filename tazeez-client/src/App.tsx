import "./App.css";
import { Route, Redirect, Switch } from "react-router-dom";
// import routes from "./routes/routes";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { IRootReducer } from "./store/reducers/rootReducer";
import { normalRoutes, authRoutes } from "routes/routes";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { EmotionCache } from "@emotion/react";
import createCache from "@emotion/cache";
import { useMaterialUIController } from "context";

// Material Dashboard 2 React themes
import { ROUTES_PATH_ENUM } from "common/constants/routesPathEnum";
import HomeLayout from "views/layouts/HomeLayout/HomeLayout";
import AdminLayout from "views/layouts/AdminLayout/AdminLayout";
// import themeRTL from "assets/theme/theme-rtl";

function App() {
  const [controller, dispatch] = useMaterialUIController();
  // const { t } = useTranslation(namespaces.pages.home);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [rtlCache, setRtlCache] = useState<EmotionCache | null>(null);

  const { direction } = controller;

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
    (state) => state.auth.isAuth
  ) as boolean;

  if (isAuthenticated) {
    const routs = authRoutes.map((rout) => (
      <Route key={rout.id} path={rout.path} exact component={rout.component} />
    ));

    return (
      <AdminLayout routes={authRoutes}>
        {routs}
        <Redirect to={ROUTES_PATH_ENUM.Template} />
      </AdminLayout>
    );
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
