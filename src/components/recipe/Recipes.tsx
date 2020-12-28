import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export const RecipeList = (): React.ReactElement => {
  const { recipes } = useContext(AppContext);

  return (
    <ul className="recipeList" data-testid="recipes">
      {recipes.map((recipe) => (
        <li key={recipe.id} className="recipeList__item">
          <img
            className="recipeList__item--img"
            src={recipe.image}
            alt="recipe preview"
          />
          <h1 className="recipeList__item--title">{recipe.title}</h1>
        </li>
      ))}
    </ul>
  );
};

export default RecipeList;
