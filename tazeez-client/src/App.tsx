import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
// import routes from "./routes/routes";
import React, { Fragment, Suspense } from "react";
import {  useSelector } from "react-redux";
import { IRootReducer } from "./store/reducers/rootReducer";
import routes from "routes/routes";



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
      <Route key={rout.id} path={rout.path} element={rout.component} />
    ));
    const mainPage = routes.find((r) => r.isMain === true);

    return (
      <Fragment>
        {/* <Layout onLogout={onLogout} currentUser={userName}> */}
        <Suspense fallback={<div>Loading ...</div>}>
          <Routes>
            {routs}
            <Route path="/" element={<div>Hello</div>} />
            <Navigate to={mainPage!.path} replace={true} />
          </Routes>
        </Suspense>
        {/* </Layout> */}
      </Fragment>
    );
  } else {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
