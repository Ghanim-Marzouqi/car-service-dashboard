import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Container } from "reactstrap";

import { authRoutes as routes } from "../routes/Routes";

const AuthLayout = () => {

  const getRoutes = (routes) => {
    return routes.map((route, i) =>
      <Route
        key={i}
        path={route.layout + route.path}
        component={route.component} />
    );
  }

  return (
    <Container>
      <Switch>
        {getRoutes(routes)}
        <Redirect from="/auth" to="/auth/login" />
      </Switch>
    </Container>
  );
}

export default AuthLayout;