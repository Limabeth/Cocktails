import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { it } from "@jest/globals";

import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";

import { AppContext } from "../Context.js";

import Nav from "../Nav.js";
import Card from "../Card.js";
import About from "../About.js";
import Search from "../Search.js";
import Error from "../Error.js";
import NoUser from "../NoUser.js";
import Loading from "../Loading.js";
import { Drink, Drinks } from "../Drinks.js";
import Favourites from "../Favourites.js";
import FavDrink from "../Favourites.js";

import SignUp from "../Login/SignUp.js";
import SignIn from "../Login/SignIn.js";
import PasswordReset from "../Login/PasswordReset.js";

afterEach(cleanup);

describe("render components", () => {
  it("should render About page without crashing", () => {
    render(<About />);
  });

  it("should render Card page without crashing", () => {
    render(
      <Router>
        <Route path="/item/id:1557">
          <Card />
        </Route>
      </Router>
    );
  });

  it("should render Error page without crashing", () => {
    render(
      <Router>
        <Error />
      </Router>
    );
  });

  it("should render Loading page without crashing", () => {
    render(<Loading />);
  });

  it("should render NoUser page without crashing", () => {
    render(<NoUser />);
  });

  it("should render Search component without crashing", () => {
    const search = jest.fn();
    render(
      <AppContext.Provider value={search}>
        <Search />
      </AppContext.Provider>
    );
  });

  // Не уверен почему работает, ведь jest.fn() вроде возвращает undefined.
  it("should render Navbar component without crashing", () => {
    let currentUser,
      setUserID,
      setFavDrinks = jest.fn();

    render(
      <AppContext.Provider value={(currentUser, setUserID, setFavDrinks)}>
        <Router>
          <Nav />
        </Router>
      </AppContext.Provider>
    );
  });

  // Колхоз. Если создать какой-нибудь массив до передачи в value, то не будет работать. Пока что только так.
  it("should render Drinks component without crashing", () => {
    render(
      <AppContext.Provider
        value={{
          drinks: [
            {
              id: null,
              name: null,
              image: null,
              alcoholic: null,
              category: null,
            },
          ],
          loading: "loading",
        }}
      >
        <Drinks />
      </AppContext.Provider>
    );
  });

  // Опять колхоз.
  it("should render Drink component without crashing", () => {
    render(
      <AppContext.Provider
        value={{ currentUser: null, favdrinks: [], setFavDrinks: null }}
      >
        <Router>
          <Drink
            key={0}
            info={{
              id: null,
              name: null,
              image: null,
              alcoholic: null,
              category: null,
            }}
          />
        </Router>
      </AppContext.Provider>
    );
  });

  it("should render Favourites component without crashing", () => {
    render(
      <AppContext.Provider
        value={{ currentUser: "user", loading: "loading", favdrinks: [] }}
      >
        <Favourites />
      </AppContext.Provider>
    );
  });

  it("should render Fav Drink component without crashing", () => {
    render(
      <AppContext.Provider value={{ favdrinks: [], setFavDrinks: null }}>
        <FavDrink
          info={{
            id: null,
            name: null,
            image: null,
            alcoholic: null,
            category: null,
          }}
        />
      </AppContext.Provider>
    );
  });

  it("should render Sign Up page without crashing", () => {
    render(
      <Router>
        <SignUp />
      </Router>
    );
  });

  it("should render Sign In page without crashing", () => {
    render(
      <Router>
        <SignIn />
      </Router>
    );
  });

  it("should render password reset page without crashing", () => {
    render(
      <Router>
        <PasswordReset />
      </Router>
    );
  });
});
