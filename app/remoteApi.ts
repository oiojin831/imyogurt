import { supabase } from "./libs/supabase";

export type Ingredient = {
  name: string;
  price: number;
  volume: number;
};

type Recipe = {
  name: string;
  // price,
  unitVolume: number;
  totalVolume: number;
  ingredientIds: Array<number>;
  ingredientVolumes: Array<number>;
};

type SetMenu = {
  id: number;
  name: string;
  recipeIds: Array<number | string>;
  setMenuRecipeIds: Array<number>;
  recipeQuantities: Array<number>;
};

export async function createIngredient(ingredient: Ingredient) {
  const { name, price, volume } = ingredient;
  const { data, error } = await supabase
    .from("ingredients")
    .insert([{ price, name, volume }])
    .single();
  return null;
}

export async function createRecipe(recipe: Recipe) {
  const {
    name,
    // price,
    unitVolume,
    totalVolume,
    ingredientIds,
    ingredientVolumes,
  } = recipe;
  const { data, error } = await supabase
    .from("recipes")
    .insert([
      {
        name,
        /*price,*/ unit_volume: unitVolume,
        total_volume: totalVolume,
      },
    ])
    .single();

  const ingredients = ingredientIds.map((ing, idx) => {
    return {
      recipe_id: data.id,
      ingredient_id: ing,
      volume: ingredientVolumes[idx],
    };
  });
  await supabase.from("recipes_ingredients_volume").insert(ingredients);
  return null;
}

export async function createSetMenu(setMenu: SetMenu) {
  try {
    const { id, name, recipeIds, setMenuRecipeIds, recipeQuantities } = setMenu;
    const { data, error } = await supabase
      .from("set_menus")
      .upsert([
        {
          ...(id && { id }),
          name,
        },
      ])
      .single();
    if (setMenuRecipeIds) {
      const recipes = setMenuRecipeIds.map((setMenuReciId, idx) => {
        return {
          ...(setMenuReciId && { id: setMenuReciId }),
          set_menu_id: data.id,
          recipe_id: recipeIds[idx],
          quantity: recipeQuantities[idx],
        };
      });
      const updateRecipes = recipes.filter((re) => re.id);
      const newRecipes = recipes.filter((re) => !re.id);
      await supabase.from("set_menus_recipes").upsert(updateRecipes);
      await supabase.from("set_menus_recipes").insert(newRecipes);
    } else {
      const recipes = recipeIds
        .filter((e) => e !== 0)
        .map((reci, idx) => {
          return {
            set_menu_id: data.id,
            recipe_id: reci,
            quantity: recipeQuantities[idx],
          };
        });
      await supabase.from("set_menus_recipes").insert(recipes);
    }
  } catch (erro) {
    console.log(erro);
  }
  return null;
}

//export async function duplicateSetMenu(setMenu) {}
