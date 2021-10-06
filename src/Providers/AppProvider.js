import React, { useState, useContext } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState("z");

  const [drinks, setDrinks] = useState([]);
  const [favdrinks, setFavDrinks] = useState([]);

  const [drinkFilter, setDrinkFilter] = useState("");

  const fetchDrinks = async () => {
    if (drinkFilter !== "") {
      setDrinkFilter("");
    }

    try {
      setLoading(true);
      const response = await fetch(
        "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + searchName
      );
      const data = await response.json();
      const info = data.drinks;

      if (info !== null) {
        const list = info.map((i) => {
          const {
            idDrink,
            strDrink,
            strDrinkThumb,
            strAlcoholic,
            strCategory,
          } = i;
          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            alcoholic: strAlcoholic,
            category: strCategory,
          };
        });
        setDrinks(list);
      } else {
        setDrinks([]);
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const filterDrinks = async () => {
    let url;

    switch (drinkFilter) {
      case "":
        return;
      case "alcoholic":
        url =
          "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic";
        break;
      case "non-alcoholic":
        url =
          "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic";
        break;
      case "cocktail":
        url =
          "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail";
        break;
      case "ordinary-drink":
        url =
          "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink";
        break;
      case "cocktail-glass":
        url =
          "https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Cocktail_glass";
        break;
      case "champagne-flute":
        url =
          "https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Champagne_flute";
        break;
    }

    try {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      const info = data.drinks;

      if (info !== null) {
        const list = info.map((i) => {
          const { idDrink, strDrink, strDrinkThumb } = i;
          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
          };
        });
        setDrinks(list);
      } else {
        setDrinks([]);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,

        drinks,
        favdrinks,

        setDrinks,
        setFavDrinks,

        searchName,
        setSearchName,

        drinkFilter,
        setDrinkFilter,

        fetchDrinks,
        filterDrinks,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
