import { UseComboboxReturnValue } from "downshift";
import React, { useContext } from "react";
import { BasicIngredient } from "../../api/recipe";
import { AppContext } from "../../context/AppContext";

export const IngredientOptions = ({
  combobox,
}: {
  combobox: UseComboboxReturnValue<BasicIngredient>;
}): React.ReactElement => {
  const { searchedIngredients } = useContext(AppContext);

  return (
    <ul {...combobox.getMenuProps()} className="ingredientSearch__list">
      {combobox.isOpen &&
        searchedIngredients.map((item, index) => (
          <li
            data-testid={`ingredient_${index}`}
            className="ingredientSearch__list--item"
            style={
              combobox.highlightedIndex === index
                ? { backgroundColor: "#bde4ff" }
                : {}
            }
            key={`${item.id}`}
            {...combobox.getItemProps({ item, index })}
          >
            {item.name}
          </li>
        ))}
    </ul>
  );
};

export default IngredientOptions;
