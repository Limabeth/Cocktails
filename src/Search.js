import React from "react";
import { useGlobalContext } from "./Providers/GlobalProvider.js";

import "./styles/Search.css";

const Search = () => {
  const {
    setSearchName,
    setDrinkFilter,
  } = useGlobalContext();

  const searchDrink = (e) => {
    setSearchName(e.target.value);
  };

  const startFilteringDrinks = (e) => {
    switch (e.target.getAttribute("data-filter")) {
      case "alcoholic":
        setDrinkFilter("alcoholic");
        break;
      case "non-alcoholic":
        setDrinkFilter("non-alcoholic");
        break;
      case "cocktail":
        setDrinkFilter("cocktail");
        break;
      case "ordinary-drink":
        setDrinkFilter("ordinary-drink");
        break;
      case "cocktail-glass":
        setDrinkFilter("cocktail-glass");
        break;
      case "champagne-flute":
        setDrinkFilter("champagne-flute");
        break;
    }
  };

  return (
    <div className="search-container">
      <span>Search your favourite cocktail</span>
      <input
        type="text"
        name="cocktail_name"
        onChange={(e) => searchDrink(e)}
      ></input>
      <div className="filters">
        <button className="filter">Filter</button>
        <div className="dropdown">
          <span data-filter="alcoholic" onClick={(e) => startFilteringDrinks(e)}>
            Alcoholic
          </span>
          <span data-filter="non-alcoholic" onClick={(e) => startFilteringDrinks(e)}>
            Non Alcoholic
          </span>
          <span data-filter="cocktail" onClick={(e) => startFilteringDrinks(e)}>
            Cocktail
          </span>
          <span data-filter="ordinary-drink" onClick={(e) => startFilteringDrinks(e)}>
            Ordinary Drink
          </span>
          <span data-filter="cocktail-glass" onClick={(e) => startFilteringDrinks(e)}>
            Cocktail Glass
          </span>
          <span data-filter="champagne-flute" onClick={(e) => startFilteringDrinks(e)}>
            Champagne Flute
          </span>
        </div>
      </div>
    </div>
  );
};

export default Search;
