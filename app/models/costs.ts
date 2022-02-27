import { supabase } from "../libs/supabase";
import { getDenormalizedIngredients } from "./utils";

async function getCosts(count = 1000) {
  const { data, error } = await supabase
    .from("recipes")
    .select(
      `
        name,
        unit_volume,
        total_volume,
        ingredients:recipes_ingredients_volume (
          detail:ingredients (
            id,
            name,
            price,
            volume
          ),
          volume
        )
      `
    )
    .limit(count)
    .order("id", { ascending: true });

  const arrangedData = data?.map((ele) => getDenormalizedIngredients(ele));
  return arrangedData;
}

export { getCosts };
