import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export const IngredientList = (): React.ReactElement => {
  const { ingredients, onRemoveIngredient } = useContext(AppContext);

  return (
    <section data-testid="ingredients">
      <ul className="ingredientList">
        {ingredients.map((ingredient) => (
          <li className="ingredientList__item" key={ingredient.id}>
            <button onClick={onRemoveIngredient(ingredient.id)}>-</button>
            <img
              className="ingredientList__item--img"
              src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
            />
            <h1 className="ingredientList__item--title">{ingredient.name}</h1>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default IngredientList;
