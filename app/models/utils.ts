export type Ingredient = {
  volume: number;
  detail: IngredientDetail;
};
export type IngredientDetail = {
  id: number;
  name: string;
  price: number;
  volume: number;
};

export type RecipeIngredients = {
  ingredients: Array<Ingredient>;
  name: string;
  total_volume: number;
  unit_volume: number;
};

export type DenormalizedRecipes = {
  [key: string]: any;
};
const round = Math.round;

export function getDenormalizedIngredients(
  recipeIngredient: RecipeIngredients
) {
  let sumPrice = 0;
  const items = recipeIngredient.ingredients.reduce(
    (prev: DenormalizedRecipes, obj: Ingredient, idx: number) => {
      const itemPrice =
        (obj.detail.price / obj.detail.volume) *
        (recipeIngredient.unit_volume / recipeIngredient.total_volume) *
        obj.volume;
      prev[`item${idx + 1}Name`] = obj.detail.name;
      prev[`item${idx + 1}Price`] = itemPrice.toFixed(2);
      sumPrice += itemPrice;
      return prev;
    },
    {}
  );
  return {
    ...items,
    name: recipeIngredient.name,
    sumPrice: sumPrice.toFixed(2),
    fairPriceRange: `${round(sumPrice * 3.3333333)},\n${round(
      sumPrice * 5
    )},\n${round(sumPrice * 10)}`,
  };
}

// 레시피에 일인분 기분 재료당 원가.
// 재료 단위가격은 ingredient ->  price / volume
// 재료 단위가격 * 재료 용량(한번 제작)
// 총제작 용량중 일인분 비율 -> unit/volume / total volume
//(unit_volume / total_volume) * recipes_ingredients_volume * (ingredient.price / ingredient.volume)
