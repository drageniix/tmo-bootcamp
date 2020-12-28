import React, { createContext } from "react";
import { BasicIngredient, Recipe } from "../api/recipe";
import { useRecipeSearch } from "../hooks/context";

export type AppContextType = {
  onSearchIngredients?: (input: string) => Promise<void>;
  onAddIngredient?: (chosenIngredient: BasicIngredient) => Promise<void>;
  onRemoveIngredient?: (
    id: number
  ) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>;
  ingredients: BasicIngredient[];
  searchedIngredients: BasicIngredient[];
  recipes: Recipe[];
};

export const defaultContext: AppContextType = {
  ingredients: [],
  recipes: [],
  searchedIngredients: [],
};

export const AppContext = createContext(defaultContext);

export const AppProvider = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const appProps = useRecipeSearch();

  return <AppContext.Provider value={appProps}>{children}</AppContext.Provider>;
};
