import firebase from "firebase";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "./Providers/GlobalProvider.js";

import Loading from "./Loading.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import NoUser from "./NoUser.js";

const Favourites = () => {
  const { currentUser, loading, favdrinks } = useGlobalContext();

  if (loading) {
    return <Loading />;
  }

  if (!currentUser) {
    return <NoUser />;
  }

  const code = favdrinks.map((item) => <FavDrink key={item.id} info={item} />);

  return <div className="all-drinks-container">{code}</div>;
};

const FavDrink = (props) => {
  const [counter, setCounter] = useState();

  const { favdrinks, setFavDrinks } = useGlobalContext();

  const removeFromFav = () => {
    setCounter(1);
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

  useEffect(() => {
    if (counter === undefined) {
      return;
    }

    if (counter === 0) {
      let userFavDrinks = favdrinks;
      userFavDrinks = userFavDrinks.filter((item) => item.id !== props.info.id);

      setFavDrinks(userFavDrinks);
      addFavDrinksToFirebase(userFavDrinks);

      return;
    }

    const interval = setInterval(() => {
      setCounter((counter) => Math.round((counter - 0.1) * 10) / 10);
    }, 25);
    return () => clearInterval(interval);
  }, [counter]);

  return (
    <div className="drink-container" style={{ opacity: counter }}>
      <img src={props.info.image} alt="Drink"></img>
      <span>{props.info.name}</span>
      <span>{props.info.alcoholic}</span>
      <span>{props.info.category}</span>
      <Link to={"/item/:id" + props.info.id}>Details</Link>

      <span className="in-fav" onClick={removeFromFav}>
        <FontAwesomeIcon icon={faHeart} size="lg" />
      </span>
    </div>
  );
};

export default Favourites;
