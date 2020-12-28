const basePath = "https://api.spoonacular.com";
const apiKey = "46f604cf680f42f3a3d2843026ea88f9";

export const searchRecipes = async (
  queryArray: string[]
): Promise<Recipe[]> => {
  const queryString = queryArray.join(",+");
  const res = await fetch(
    `${basePath}/recipes/findByIngredients?ingredients=${queryString}&number=3&apiKey=${apiKey}`
  );

  const data = await res.json();
  return data;
};

export const searchIngredients = async (
  query: string
): Promise<BasicIngredient[]> => {
  const res = await fetch(
    `${basePath}/food/ingredients/search?query=${query}&apiKey=${apiKey}`
  );

  const data = await res.json();
  return data.results;
};

export type BasicIngredient = {
  id?: number;
  name?: string;
  image?: string;
};

export type MissedIngredient = {
  id?: number;
  amount?: number;
  unit?: string;
  unitLong?: string;
  unitShort?: string;
  aisle?: string;
  name?: string;
  original?: string;
  originalString?: string;
  originalName?: string;
  metaInformation?: string[];
  meta?: string[];
  extendedName?: string;
  image?: string;
};

export type UsedIngredient = {
  id?: number;
  amount?: number;
  unit?: string;
  unitLong?: string;
  unitShort?: string;
  aisle?: string;
  name?: string;
  original?: string;
  originalString?: string;
  originalName?: string;
  metaInformation?: string[];
  meta?: string[];
  extendedName?: string;
  image?: string;
};

export type Recipe = {
  id?: number;
  title?: string;
  image?: string;
  imageType?: string;
  usedIngredientCount?: number;
  missedIngredientCount?: number;
  missedIngredients?: MissedIngredient[];
  usedIngredients?: UsedIngredient[];
  // unusedIngredients?: any[];
  likes?: number;
};
