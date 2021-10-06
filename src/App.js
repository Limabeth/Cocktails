import React from "react";
import { Redirect } from "react-router";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { PrivateRoute } from "./PrivateRoute.js";

import { GlobalProvider } from "./Providers/GlobalProvider.js";
import { AppProvider } from "./Providers/AppProvider.js";
import { UserProvider } from "./Providers/UserProvider.js";

import Nav from "./Nav.js";
import Home from "./Home.js";
import Card from "./Card.js";
import About from "./About.js";
import Error from "./Error.js";
import Favourites from "./Favourites.js";

import SignIn from "./Login/SignIn.js";
import SignUp from "./Login/SignUp.js";
import PasswordReset from "./Login/PasswordReset.js";

const AppRouter = () => {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path ="/">
          <Redirect to="/page/1"/>
        </Route>
        <Route path="/page/:n">
          <Home />
        </Route>
        <Route path="/item/:id">
          <Card />
        </Route>
        <Route path="/About">
          <About />
        </Route>
        <PrivateRoute path="/SignUp" component={SignUp} />
        <PrivateRoute path="/SignIn" component={SignIn} />
        <PrivateRoute path="/PasswordReset" component={PasswordReset} />
        <Route path="/Favourites">
          <Favourites />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </Router>
  );
};

const App = () => {
  return (
    <AppProvider>
      <UserProvider>
        <GlobalProvider>
          <AppRouter />
        </GlobalProvider>
      </UserProvider>
    </AppProvider>
  );
};

export default App;
