import React from "react";
import { cleanup, render, fireEvent } from "@testing-library/react";
import { AppContext, AppContextType } from "../context/AppContext";
import IngredientList from "../components/ingredients/IngredientList";
import mockIngredients from "./mocks/ingredients.json";

const renderForm = (context?: AppContextType) =>
  render(
    <AppContext.Provider value={context}>
      <IngredientList />
    </AppContext.Provider>
  );

describe("should test ingredient list", () => {
  afterEach(cleanup);

  it("should match list snapshot", () => {
    expect.assertions(3);

    const { getByTestId } = renderForm({
      ingredients: [mockIngredients.results[0], mockIngredients.results[1]],
      recipes: [],
      searchedIngredients: [],
    });

    const listComponent = getByTestId("ingredients") as HTMLInputElement;
    expect(listComponent).toMatchSnapshot();
    expect(listComponent.textContent).toContain(
      mockIngredients.results[0].name
    );
    expect(listComponent.textContent).toContain(
      mockIngredients.results[1].name
    );
  });

  it("should remove recipe when button is clicked", () => {
    expect.assertions(1);
    const mockedRemoveIngredient = jest.fn();

    const { getByRole } = renderForm({
      onRemoveIngredient: mockedRemoveIngredient,
      ingredients: [mockIngredients.results[1]],
      recipes: [],
      searchedIngredients: [],
    });

    const buttonComponent = getByRole("button") as HTMLInputElement;
    fireEvent.click(buttonComponent);

    expect(mockedRemoveIngredient).toHaveBeenCalledWith(
      mockIngredients.results[1].id
    );
  });
});
