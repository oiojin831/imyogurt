import { supabase } from "../libs/supabase";
/*
select
  set_menus.id,
  set_menus.name,
  recipes.id,
  recipes.name,
  ingredients.name,
  set_menus_recipes.quantity,
  ((recipes.unit_volume / recipes.total_volume ) * recipes_ingredients_volume.volume * (ingredients.price / ingredients.volume ))
from set_menus
JOIN set_menus_recipes ON set_menus_recipes.set_menu_id = set_menus.id
JOIN recipes ON recipes.id = set_menus_recipes.recipe_id
JOIN recipes_ingredients_volume ON recipes_ingredients_volume.recipe_id = recipes.id
JOIN ingredients ON ingredients.id = recipes_ingredients_volume.ingredient_id
*/

async function getSetMenus(count = 1000) {
  const { data, error } = await supabase
    .from("set_menus")
    .select(
      `
        id,
        name,
        recipes: set_menus_recipes (
          quantity,
          item: recipes (
            id,
            name,
            ingredients: recipes_ingredients_volume (
              item: ingredients (
                id,
                name,
                price,
                volume
              )
            )
          )
        )
      `
    )
    .limit(1);

  const setMenus = data?.map((setMenu) => {
    const recipes = setMenu.recipes.map((recipe) => {
      const ingredients = recipe.item.ingredients.map((ingredient) => {
        return {
          ...ingredient.item,
        };
      });
      return {
        recipeQuantity: recipe.quantity,
        ...recipe.item,
        ingredients,
      };
    });
    return {
      ...setMenu,
      recipes,
    };
  });

  console.log("data", JSON.stringify(setMenus[0], null, "  "));
  return data;
}

export { getSetMenus };

/**
   ingredients (
    id,
    name,
    price,
    volume
  ),
  set_menus_recipes (
    id,
    set_menu_id,
    quantity
  )
  recipes_ingredients_volume (
    id,
    ingredient_id,
    volume
  )
 * 
 */
