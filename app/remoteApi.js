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
  try {
    const { id, name, recipeIds, setMenuRecipeIds, recipeQuantities } = setMenu;
    const { data, error } = await supabase
      .from('set_menus')
      .upsert([
        {
          ...(id && { id }),
          name,
        },
      ])
      .single();

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
    await supabase.from('set_menus_recipes').upsert(updateRecipes);
    await supabase.from('set_menus_recipes').insert(newRecipes);
  } catch (erro) {
    console.log(erro);
  }
  return null;
}

export async function duplicateSetMenu(setMenu) {
  console.log('hh');
}
