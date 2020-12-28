import React from "react";
import { cleanup, render } from "@testing-library/react";
import { AppContext, AppContextType } from "../context/AppContext";
import Recipes from "../components/recipe/Recipes";
import mockRecipes from "./mocks/recipes.json";

const renderForm = (context?: AppContextType) =>
  render(
    <AppContext.Provider value={context}>
      <Recipes />
    </AppContext.Provider>
  );

describe("should test ingredient list", () => {
  afterEach(cleanup);

  it("should match list snapshot", () => {
    expect.assertions(3);

    const { getByTestId } = renderForm({
      ingredients: [],
      recipes: [mockRecipes[0], mockRecipes[1]],
      searchedIngredients: [],
    });

    const listComponent = getByTestId("recipes") as HTMLInputElement;
    expect(listComponent).toMatchSnapshot();
    expect(listComponent.textContent).toContain(mockRecipes[0].title);
    expect(listComponent.textContent).toContain(mockRecipes[1].title);
  });
});
