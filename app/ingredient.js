import { supabase } from './libs/supabase';

export async function createIngredient(ingredient) {
  const { name, price, volume } = ingredient;
  const { data, error } = await supabase
    .from('ingredients')
    .insert([{ price, name, volume }])
    .single();
  return null;
}

export async function createRecipe(recipe) {
  const {
    name,
    // price,
    unitVolume,
    totalVolume,
    ingredientIds,
    ingredientVolumes,
  } = recipe;
  const { data, error } = await supabase
    .from('recipes')
    .insert([
      {
        name,
        /*price,*/ unit_volume: parseInt(unitVolume),
        total_volume: parseInt(totalVolume),
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
  await supabase.from('recipes_ingredients_volume').insert(ingredients);
  return null;
}

export async function createSetMenu(setMenu) {
  const { name, recipeIds, recipeQuantities } = setMenu;
  const { data, error } = await supabase
    .from('set_menus')
    .insert([
      {
        name,
      },
    ])
    .single();

  const recipes = recipeIds.map((reci, idx) => {
    return {
      set_menu_id: data.id,
      recipe_id: reci,
      quantity: recipeQuantities[idx],
    };
  });
  await supabase.from('set_menus_recipes').insert(recipes);
  return null;
}
