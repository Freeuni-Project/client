// router methods
import { Switch } from "react-router-dom";
// custom  routes
import PrivateRoute from "./routes/PrivateRoute.js";
import PublicRoute from "./routes/PublicRoute.js";
import ErrorRoute from "./routes/ErrorRoute.js";
// components
import Main from "./screens/Main.jsx";
import Login from "./screens/Login.jsx";
import Register from "./screens/Register.jsx";
import CurrentProject from "./screens/CurrentProject.jsx";

function App() {
  return (
    <Switch>
      <PrivateRoute path="/" exact>
        <Main />
      </PrivateRoute>
      <PublicRoute path="/login">
        <Login />
      </PublicRoute>
      <PublicRoute path="/register">
        <Register />
      </PublicRoute>
      <PrivateRoute
        path="/project/:id"
        component={CurrentProject}
      ></PrivateRoute>
      <ErrorRoute path="*" />
    </Switch>
  );
}

export default App;
