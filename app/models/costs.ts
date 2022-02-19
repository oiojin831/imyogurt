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
  ingredients (
    id,
    name,
    price,
    volume
  ),
  recipes_ingredients_volume (
    ingredient_id,
    volume
  )
`
    )
    .limit(count)
    .order("id", { ascending: true })
    .order("ingredient_id", {
      ascending: true,
      foreignTable: "recipes_ingredients_volume",
    })
    .order("id", { ascending: true, foreignTable: "ingredients" });

  // recipes_ingreients_volume 와 ingredients의 순서가 똑같이 안나와서 생기는 문제가 있었다.
  // 이런부분은 테스팅을 어떻게 해야하지?
  const arrangedData = data?.map((ele) => getDenormalizedIngredients(ele));
  return arrangedData;
}

export { getCosts };
