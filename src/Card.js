import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";

import Loading from "./Loading.js";

import "./styles/Card.css";

const Card = () => {
  let { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(null);

  const fetchDrink = async () => {
    setLoading(true);
    fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + id)
      .then((response) => response.json())
      .then(function (data) {
        const drinkInfo = data.drinks[0];
        if (drinkInfo !== null) {
          const {
            strDrink: name,
            strCategory: category,
            strDrinkThumb: image,
            strAlcoholic: alcoholic,
            strGlass: glass,
            strInstructions: instructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
            strIngredient6,
            strIngredient7,
            strIngredient8,
            strIngredient9,
            strIngredient10,
            strIngredient11,
            strIngredient12,
            strIngredient13,
            strIngredient14,
            strIngredient15,
          } = drinkInfo;

          const ingredients = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
            strIngredient6,
            strIngredient7,
            strIngredient8,
            strIngredient9,
            strIngredient10,
            strIngredient11,
            strIngredient12,
            strIngredient13,
            strIngredient14,
            strIngredient15,
          ];
          const drink = {
            name,
            image,
            category,
            alcoholic,
            glass,
            instructions,
            ingredients,
          };

          setInfo(drink);
        } else {
          setInfo(null);
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDrink();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!info) {
    return <Loading />;
  }

  return (
    <div className="drink-card">
      <div>
        <img src={info.image} alt="Drink" />
      </div>
      <div>
        <table>
          <tbody>
            <tr>
              <td>Name: </td>
              <td>{info.name}</td>
            </tr>
            <tr>
              <td>Category: </td>
              <td>{info.category}</td>
            </tr>
            <tr>
              <td>Alcoholic: </td>
              <td>{info.alcoholic}</td>
            </tr>
            <tr>
              <td>Glass: </td>
              <td>{info.glass}</td>
            </tr>
            <tr>
              <td>Instructions: </td>
              <td>{info.instructions}</td>
            </tr>
            <tr>
              <td>Ingredients: </td>
              <td>
                {info.ingredients.map((item, index) => {
                  if (item !== null) {
                    return (
                      <span key={index} className="ingredient">
                        {item}
                        <br></br>
                      </span>
                    );
                  }
                })}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Card;
