/* eslint-disable jest/no-focused-tests */
import { AppContext, AppContextType, AppProvider } from "../context/AppContext";
import React from "react";
import { cleanup, render } from "@testing-library/react";
import Homepage from "../pages/Homepage";
import mockIngredients from "./mocks/ingredients.json";
import mockRecipes from "./mocks/recipes.json";

const renderForm = (context?: AppContextType) =>
  render(
    context ? (
      <AppContext.Provider value={context}>
        <Homepage />
      </AppContext.Provider>
    ) : (
      <AppProvider>
        <Homepage />
      </AppProvider>
    )
  );

describe("complete homepage", () => {
  afterEach(cleanup);

  it("should render full page without data", async () => {
    const { baseElement } = renderForm();
    expect(baseElement).toMatchSnapshot();
  });

  it("should render full page with data", () => {
    const { baseElement } = renderForm({
      searchedIngredients: mockIngredients.results,
      ingredients: mockIngredients.results,
      recipes: mockRecipes,
    });

    expect(baseElement).toMatchSnapshot();
  });
});
