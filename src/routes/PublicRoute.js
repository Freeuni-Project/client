import React from "react";
// redux hook
import { useSelector } from "react-redux";
// router methods
import { Route, Redirect } from "react-router-dom";

const PublicRoute = ({ children, rest }) => {
  const authToken = useSelector((state) => state.auth.token);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authToken ? (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        ) : (
          children
        )
      }
    />
  );
};

export default PublicRoute;
