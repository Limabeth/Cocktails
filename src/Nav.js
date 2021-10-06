import React from "react";
import { Link, useHistory } from "react-router-dom";

import { useGlobalContext } from "./Providers/GlobalProvider.js";

import { auth } from "./Firebase/Firebase.js";

import "./styles/Nav.css";

const Nav = () => {
  const history = useHistory();

  const { currentUser, setUserID, setFavDrinks } = useGlobalContext();

  const logoutUser = async () => {
    try {
      await auth.signOut();
      setFavDrinks([]);
      setUserID(null);
      history.push("/page/1");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar">
      <div className="nav-image">
        <img src={"/images/bartender.png"} alt="bartender"></img>
      </div>
      <div className="nav-links">
        <Link to="/page/1">Home</Link>
        <Link to="/About">About</Link>
        <Link to="/Favourites">Favourites</Link>
        {currentUser ? (
          <button onClick={logoutUser}>Sign Out</button>
        ) : (
          <Link to="/SignIn">Login</Link>
        )}
      </div>
    </div>
  );
};

export default Nav;
