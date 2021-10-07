import firebase from "firebase";

import Loading from "./Loading.js";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import React, { useState } from "react";

import Zoom from "react-reveal/Zoom";
import Flip from "react-reveal/Flip";

import { useGlobalContext } from "./Providers/GlobalProvider.js";

import "./styles/Drinks.css";

const IMG_SearchFail = require("./images/searchfail.png").default;

const Drinks = () => {
  const [page, setPage] = useState(1);
  const { drinks, loading } = useGlobalContext();

  if (loading) {
    return <Loading />;
  }

  if (drinks.length === 0) {
    return (
      <div className="search-fail">
        <span>
          Oops! It looks like we can't find your favourite drink {":("}
        </span>
        <img src={IMG_SearchFail} alt="Fallout Angry"></img>
      </div>
    );
  }

  const renderDrinks = () => {
    const code = drinks.map((item, index) => {
      const start = (page - 1) * 9;
      const end = page * 9;
      if (index > start && index <= end) {
        return <Drink key={item.id} info={item} />;
      }
    });

    return code;
  };

  const renderPageNumbers = () => {
    const number = Math.floor(drinks.length / 9);

    let code = [];

    for (let i = 1; i <= number; i++) {
      code.push(
        <button key={i} onClick={() => setPage(i)}>
          <Link to={"/page/" + i} className="page-number">
            {i}
          </Link>
        </button>
      );
    }

    return code;
  };

  return (
    <>
      <div className="all-drinks-container">{renderDrinks()}</div>
      <div className="page-numbers">{renderPageNumbers()}</div>
    </>
  );
};

const Drink = (props) => {
  const [fav, setFav] = useState(false);

  const { currentUser, favdrinks, setFavDrinks } = useGlobalContext();

  const addToFav = () => {
    let userFavDrinks = favdrinks;

    if (currentUser) {
      const drinkIDs = userFavDrinks.map((item) => item.id);

      if (!drinkIDs.includes(props.info.id)) {
        userFavDrinks.push({
          id: props.info.id,
          name: props.info.name,
          image: props.info.image,
          alcoholic: props.info.alcoholic,
          category: props.info.category,
        });

        setFav(true);
        setFavDrinks(userFavDrinks);
        addFavDrinksToFirebase(userFavDrinks);
        
      } else {
        userFavDrinks = userFavDrinks.filter(
          (item) => item.id !== props.info.id
        );
        setFav(false);
        setFavDrinks(userFavDrinks);
        addFavDrinksToFirebase(userFavDrinks);
      }
    } else {
      return;
    }
  };

  const isInFav = () => {
    const drinkIDs = favdrinks.map((item) => item.id);
    if (drinkIDs.includes(props.info.id)) {
      return true;
    } else {
      return false;
    }
  };

  const addFavDrinksToFirebase = async (newDrinks) => {
    const id = firebase.auth().currentUser.uid;
    const firestore = firebase.firestore();
    const docRef = firestore.doc("users/" + id);

    try {
      await docRef.set({ drinks: newDrinks }, { merge: true });
    } catch (error) {
      console.log(error);
    }
  };

  const renderDrink = () => {
    return (
      <div className="drink-container">
        <img src={props.info.image} alt="Drink"></img>
        <span>{props.info.name}</span>
        <span>{props.info.alcoholic}</span>
        <span>{props.info.category}</span>
        <Link to={"/item/" + props.info.id}>Details</Link>
        {currentUser && (
          <span className={isInFav() ? "in-fav" : "add-fav"} onClick={addToFav}>
            <FontAwesomeIcon icon={faHeart} size="lg" />
          </span>
        )}
      </div>
    );
  };

  return (
    <>
      {isInFav() ? (
        <Flip right>{renderDrink()}</Flip>
      ) : (
        <Zoom>{renderDrink()}</Zoom>
      )}
    </>
  );
};

export { Drinks, Drink };
