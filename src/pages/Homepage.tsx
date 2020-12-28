import React from "react";
import SearchIngredients from "../components/form/SearchIngredients";
import IngredientList from "../components/ingredients/IngredientList";
import RecipeList from "../components/recipe/Recipes";
import { AppProvider } from "../context/AppContext";

export const Homepage = (): React.ReactElement => {
  return (
    <AppProvider>
      <main>
        <SearchIngredients />
        <IngredientList />
        <RecipeList />
      </main>
    </AppProvider>
  );
};

export default Homepage;
