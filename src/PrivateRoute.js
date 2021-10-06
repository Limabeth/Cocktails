import React from "react";
import { Route, Redirect } from "react-router";
import { useGlobalContext } from "./Providers/GlobalProvider";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useGlobalContext();

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser === null ? <Component {...props} /> : <Redirect to="/page/1" />;
      }}
    ></Route>
  );
};
