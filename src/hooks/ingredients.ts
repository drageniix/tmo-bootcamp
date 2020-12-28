import {
  useCombobox,
  UseComboboxReturnValue,
  UseComboboxStateChange,
} from "downshift";
import { useContext } from "react";
import { BasicIngredient } from "../api/recipe";
import { AppContext } from "../context/AppContext";

export const useComboboxIngredients = (): UseComboboxReturnValue<BasicIngredient> => {
  const { searchedIngredients, onSearchIngredients } = useContext(AppContext);

  const combobox = useCombobox({
    items: searchedIngredients,
    itemToString: (ingredient: BasicIngredient) => ingredient.name,
    onInputValueChange: async ({
      inputValue,
    }: UseComboboxStateChange<BasicIngredient>) =>
      onSearchIngredients(inputValue),
  });

  return combobox;
};
