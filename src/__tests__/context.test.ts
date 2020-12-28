import { act, renderHook } from "@testing-library/react-hooks";
import { useRecipeSearch } from "../hooks/context";
import mockIngredients from "./mocks/ingredients.json";
import mockRecipes from "./mocks/recipes.json";

describe("should test the context hook", () => {
  it("should search ingredients", async () => {
    expect.assertions(4);

    const { result } = renderHook(() => useRecipeSearch());

    expect(result.current.searchedIngredients.length).toBe(0);

    fetchMock.mockResponseOnce(JSON.stringify(mockIngredients));
    await act(() => result.current.onSearchIngredients("banana"));

    expect(result.current.searchedIngredients.length).toBe(2);

    expect(result.current.searchedIngredients).toContainEqual(
      mockIngredients.results[0]
    );

    expect(result.current.searchedIngredients).toContainEqual(
      mockIngredients.results[1]
    );
  });

  it("should search recipes", async () => {
    expect.assertions(1);
    const { result } = renderHook(() => useRecipeSearch());

    fetchMock.mockResponseOnce(JSON.stringify(mockRecipes));
    await act(() => result.current.onAddIngredient(mockIngredients.results[0]));

    expect(result.current.recipes).toContainEqual(mockRecipes[0]);
  });

  it("should remove a recipe", async () => {
    expect.assertions(1);

    const { result } = renderHook(() => useRecipeSearch());

    fetchMock.mockResponseOnce(JSON.stringify(mockRecipes.slice(1)));
    await act(() =>
      result.current.onRemoveIngredient(19400)({
        preventDefault: jest.fn(),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any)
    );

    expect(result.current.recipes).not.toContainEqual(mockRecipes[0]);
  });
});
