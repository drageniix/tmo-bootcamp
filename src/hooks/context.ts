import { useState } from "react";
import {
  BasicIngredient,
  searchIngredients,
  searchRecipes,
} from "../api/recipe";
import { AppContextType, defaultContext } from "../context/AppContext";

export const useRecipeSearch = (): AppContextType => {
  const [recipes, setRecipes] = useState(defaultContext.recipes);
  const [ingredients, setIngredients] = useState(defaultContext.ingredients);
  const [searchedIngredients, setSearchedIngredients] = useState(
    defaultContext.searchedIngredients
  );

  const onSearchIngredients = async (input: string) => {
    const ingredients = await searchIngredients(input);
    setSearchedIngredients(ingredients);
  };

  const onAddIngredient = async (chosenIngredient: BasicIngredient) => {
    if (!ingredients.includes(chosenIngredient)) {
      const updatedIngredients = [...ingredients, chosenIngredient];
      const recipes = await searchRecipes(
        updatedIngredients.map((ingredient) => ingredient.name)
      );

      setIngredients(updatedIngredients);
      setRecipes(recipes);
    }
  };

  const onRemoveIngredient = (id: number) => async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const updatedIngredients = ingredients.filter(
      (ingredient) => ingredient.id !== id
    );
    const recipes = await searchRecipes(
      updatedIngredients.map((ingredient) => ingredient.name)
    );

    setIngredients(updatedIngredients);
    setRecipes(recipes);
  };

  return {
    onSearchIngredients,
    onAddIngredient,
    onRemoveIngredient,
    searchedIngredients,
    ingredients,
    recipes,
  };
};
