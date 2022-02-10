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
  const { id, name, recipeIds, setMenuRecipeIds, recipeQuantities } = setMenu;
  console.log(id);
  const { data, error } = await supabase
    .from('set_menus')
    .upsert([
      {
        ...(id && { id }),
        name,
      },
    ])
    .single();

  console.log(data);
  const recipes = recipeIds.map((reci, idx) => {
    return {
      set_menu_id: data.id,
      recipe_id: reci,
      ...(setMenuRecipeIds && { id: setMenuRecipeIds[idx] }),
      quantity: recipeQuantities[idx],
    };
  });
  await supabase.from('set_menus_recipes').upsert(recipes);
  return null;
}

export async function duplicateSetMenu(setMenu) {
  console.log('hh');
}
