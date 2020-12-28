import { searchIngredients, searchRecipes } from "../api/recipe";
import mockIngredients from "./mocks/ingredients.json";
import mockRecipes from "./mocks/recipes.json";

describe("It should test api functionality", () => {
  it("should search ingredients", async () => {
    expect.assertions(1);
    fetchMock.mockResponse(JSON.stringify(mockIngredients));
    const ingredients = await searchIngredients("banana");
    expect(ingredients).toEqual(mockIngredients.results);
  });

  it("should search recipes", async () => {
    expect.assertions(1);
    fetchMock.mockResponseOnce(JSON.stringify(mockRecipes));
    const recipes = await searchRecipes(["banana"]);
    expect(recipes).toEqual(mockRecipes);
  });
});
