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
    price,
    unitVolume,
    totalVolume,
    ingredientIds,
    ingredientVolumes,
  } = recipe;
  console.log(name);
  const { data, error } = await supabase
    .from('recipes')
    .insert([
      { name, price, unit_volume: unitVolume, total_volume: totalVolume },
    ])
    .single();

  console.log('insert', data);
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
