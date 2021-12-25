import { Outlet, ReactLocation, Router } from "react-location";
import { ReactLocationDevtools } from "react-location-devtools";
import appRoutes from "./routes";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import history from "./history";

const reactLocation = new ReactLocation();
import rootReducer from "./reducer";
import thunk from "redux-thunk";

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

function App() {
  return (
    <Provider store={store}>
      <Router location={reactLocation} routes={appRoutes} history={history}>
        <Outlet />
        <ReactLocationDevtools initialIsOpen={false} />
      </Router>
    </Provider>
  );
}

export default App;
