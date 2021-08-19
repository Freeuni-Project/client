import React from "react";
// redux hook
import { useSelector } from "react-redux";
// router methods
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
  const authToken = useSelector((state) => state.auth.token);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authToken ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
