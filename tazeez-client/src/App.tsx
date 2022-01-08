import "./App.css";
import {Route, Redirect, Switch} from "react-router-dom";
// import routes from "./routes/routes";
import React, { Fragment, Suspense } from "react";
import {  useSelector } from "react-redux";
import { IRootReducer } from "./store/reducers/rootReducer";
import routes from "routes/routes";
import Auth from "views/layouts/Auth";



function App() {
  // const { t } = useTranslation(namespaces.pages.home);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();


  const isAuthenticated = useSelector<IRootReducer>(
    (state) => state.authReducer.token !== null
  ) as boolean;

  //   const {isAuthenticated, message, userName} = useSelector<IAuthReducerState>(state => ({
  //     isAuthenticated: state.authReducer.token !== null,
  //     message: state.appReducer.message,
  //     userName: state.authReducer.userName
  // }));

  if (isAuthenticated) {
    const routs = routes.map((rout) => (
      <Route key={rout.id} path={rout.path} exact component={rout.component} />
    ));
    const mainPage = routes.find((r) => r.isMain === true);

    return (
      <Fragment>
        {/* <Layout onLogout={onLogout} currentUser={userName}> */}
        <Suspense fallback={<div>Loading ...</div>}>
          <Switch>
            {routs}
            <Route path="/" component={Auth} />
            <Redirect to={mainPage!.path}  />
          </Switch>
        </Suspense>
        {/* </Layout> */}
      </Fragment>
    );
  } else {
    return (
      <Auth/>
    );
  }
}

export default App;
