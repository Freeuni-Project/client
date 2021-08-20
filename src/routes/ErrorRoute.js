import React from "react";
// router methods
import { Route, Redirect } from "react-router-dom";

const ErrorRoute = () => {
  return (
    <Route
      render={({ location }) => (
        <Redirect
          to={{
            pathname: "/",
            state: { from: location },
          }}
        />
      )}
    />
  );
};

export default ErrorRoute;
