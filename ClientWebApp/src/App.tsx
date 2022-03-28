import "./App.css";
import { Route, Redirect, Switch } from "react-router-dom";
// import routes from "./routes/routes";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { IRootReducer } from "./store/reducers/rootReducer";
import { normalRoutes, authRoutes } from "routes/routes";

// Material Dashboard 2 React themes
import HomeLayout from "views/layouts/HomeLayout/HomeLayout";
// import AdminLayout from "views/layouts/AdminLayout/AdminLayout";
// import themeRTL from "assets/theme/theme-rtl";

function App() {
  const direction = useSelector<IRootReducer, string>(
    (state) => state.app.direction
  );
  // const { t } = useTranslation(namespaces.pages.home);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  const isAuthenticated = useSelector<IRootReducer>(
    (state) => state.auth.isAuth
  ) as boolean;

  //   const routs = authRoutes.map((rout) => (
  //     <Route key={rout.id} path={rout.path} exact component={rout.component} />
  //   ));
  //   const mainRoute = authRoutes.filter((r) => r.isMain)[0];
  //   return (
  //     <AdminLayout routes={authRoutes}>
  //       {routs}
  //       <Redirect to={mainRoute!.path} />
  //     </AdminLayout>
  //   );
  // } else {

  const rout = isAuthenticated ? authRoutes : normalRoutes;
  const mainRoute = rout.filter((r) => r.isMain)[0];

  return (
    <HomeLayout routes={rout.filter((r) => !r.isHidden)}>
      <Switch>
        {rout.map((rout) => (
          <Route
            key={rout.id}
            path={rout.path}
            exact
            component={rout.component}
          />
        ))}
        <Redirect to={mainRoute.path} />
      </Switch>
    </HomeLayout>
  );
}

export default App;
