import { Outlet, ReactLocation, Router } from "react-location";
import { ReactLocationDevtools } from "react-location-devtools";
import appRoutes from "./routes";

const reactLocation = new ReactLocation();

function App() {
  return (
    <Router location={reactLocation} routes={appRoutes}>
      <Outlet />
      <ReactLocationDevtools initialIsOpen={false} />
    </Router>
  );
}

export default App;
