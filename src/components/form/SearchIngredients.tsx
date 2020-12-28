import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useComboboxIngredients } from "../../hooks/ingredients";
import IngredientOptions from "./IngredientOptions";

export const SearchIngredients = (): React.ReactElement => {
  const { onAddIngredient } = useContext(AppContext);
  const combobox = useComboboxIngredients();

  return (
    <section className="ingredientSearch" data-testid="form">
      <label {...combobox.getLabelProps()} className="ingredientSearch__label">
        Choose an ingredient:
      </label>
      <div
        {...combobox.getComboboxProps()}
        className="ingredientSearch__actions"
      >
        <input
          {...combobox.getInputProps()}
          className="ingredientSearch__actions--input"
        />
        <button
          type="button"
          className="ingredientSearch__actions--button"
          onClick={() => onAddIngredient(combobox.selectedItem)}
          aria-label={"add ingredient"}
        >
          +
        </button>
      </div>
      <IngredientOptions combobox={combobox} />
    </section>
  );
};

export default SearchIngredients;
