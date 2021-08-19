// redux hooks
import { useSelector } from "react-redux";
// router methods
import { Switch } from "react-router-dom";
// custom  routes
import PrivateRoute from "./routes/PrivateRoute.js";
import PublicRoute from "./routes/PublicRoute.js";
// components
import Main from "./screens/Main.jsx";
import Login from "./screens/Login.jsx";
import Register from "./screens/Register.jsx";

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
    </Switch>
  );
}

export default App;
