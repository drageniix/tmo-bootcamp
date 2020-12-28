import React from "react";
import { cleanup, render, fireEvent } from "@testing-library/react";
import { AppContext, AppContextType } from "../context/AppContext";
import SearchIngredients from "../components/form/SearchIngredients";
import mockIngredients from "./mocks/ingredients.json";

const renderForm = (context?: AppContextType) =>
  render(
    <AppContext.Provider value={context}>
      <SearchIngredients />
    </AppContext.Provider>
  );

describe("should test form functionality", () => {
  afterEach(cleanup);

  it("should match form snapshot", () => {
    expect.assertions(1);

    const { getByTestId } = renderForm({
      ingredients: [],
      recipes: [],
      searchedIngredients: mockIngredients.results,
    });

    const formComponent = getByTestId("form") as HTMLInputElement;
    expect(formComponent).toMatchSnapshot();
  });

  it("should search ingredients when input is changed", () => {
    expect.assertions(1);

    const mockEvent = {
      target: { value: "banana" },
    };

    const searchIngredientsMock = jest.fn();

    const { getByRole } = renderForm({
      onSearchIngredients: searchIngredientsMock,
      ingredients: [],
      recipes: [],
      searchedIngredients: [],
    });

    const inputComponent = getByRole("textbox") as HTMLInputElement;
    fireEvent.change(inputComponent, mockEvent);

    expect(searchIngredientsMock).toHaveBeenCalledTimes(1);
  });

  it("should search recipes when add button is clicked", () => {
    expect.assertions(1);
    const mockedAddIngredient = jest.fn();

    const { getByRole } = renderForm({
      onAddIngredient: mockedAddIngredient,
      ingredients: [],
      recipes: [],
      searchedIngredients: [],
    });

    const buttonComponent = getByRole("button") as HTMLInputElement;
    fireEvent.click(buttonComponent);

    expect(mockedAddIngredient).toHaveBeenCalledTimes(1);
  });
});
