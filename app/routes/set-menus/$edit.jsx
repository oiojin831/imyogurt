import { redirect, Form, useLoaderData } from "remix";
import { createSetMenu } from "../../remoteApi";
import { Select } from "@chakra-ui/react";
import { supabase } from "../../libs/supabase.js";
import { FormLabel, Flex, Button, Input } from "@chakra-ui/react";
import React from "react";

export const action = async ({ request }) => {
  const formData = await request.formData();
  let { _action, ...values } = Object.fromEntries(formData);

  const name = formData.get("name");
  const id = formData.get("menuId");
  const recipeIds = [];
  const setMenuRecipeIds = [];
  const recipeQuantities = [];
  [0, 1, 2, 3, 4, 5, 6, 7, 8].forEach((idx) => {
    if (formData.get(`recipe${idx + 1}`) !== null) {
      recipeIds.push(formData.get(`recipe${idx + 1}`));
      setMenuRecipeIds.push(formData.get(`setMenuRecipe${idx + 1}`));
      recipeQuantities.push(formData.get(`recipe${idx + 1}Quantity`));
    }
  });
  if (_action === "update") {
    await createSetMenu({
      id,
      name,
      setMenuRecipeIds,
      recipeIds,
      recipeQuantities,
    });
  } else {
    await createSetMenu({
      id,
      name: `${name}-copy`,
      recipeIds,
      recipeQuantities,
    });
  }

  return redirect("/set-menus");
};

export const loader = async ({ params }) => {
  const { data: set_menu, error } = await supabase
    .rpc(`get_set_menu_info`, { input_set_menu_id: params.edit })
    .select("*");
  let { data: recipes } = await supabase.from("recipes").select("id, name");
  return { set_menu, recipes };
};

export default function NewSetMenu() {
  const { set_menu, recipes } = useLoaderData();
  return (
    <Form method="post">
      <Input
        hidden={true}
        type="number"
        name="menuId"
        id="menuId"
        defaultValue={set_menu[0].id}
      />
      <Flex>
        <FormLabel htmlFor="name">
          Name:{" "}
          <Input
            type="text"
            id="name"
            name="name"
            defaultValue={set_menu[0]?.set_menu_name}
          />
        </FormLabel>
      </Flex>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
        return (
          <React.Fragment key={`${num}-select-${set_menu[num]?.recipe_id}`}>
            <Flex key={`${num}-select-${set_menu[num]?.recipe_id}`}>
              <Input
                hidden={true}
                type="number"
                name={`setMenuRecipe${num + 1}`}
                id={`setMenuRecipe${num + 1}`}
                defaultValue={set_menu[num]?.set_menu_recipe_id}
              />
              <FormLabel htmlFor={`recipe${num + 1}Quantity`}>
                한번 생산시 들어가는 재료{num + 1}의 용량:{" "}
                <Input
                  type="number"
                  id={`recipe${num + 1}Quantity`}
                  name={`recipe${num + 1}Quantity`}
                  defaultValue={set_menu[num]?.quantity}
                />
              </FormLabel>
              <FormLabel>
                레시피{num + 1}
                <Select
                  defaultValue={set_menu[num]?.recipe_id}
                  placeholder="Select option"
                  name={`recipe${num + 1}`}
                >
                  {recipes.map((d, idx) => (
                    <option key={`${d.id}-${idx}`} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </Select>
              </FormLabel>
            </Flex>
          </React.Fragment>
        );
      })}
      <Button type="submit" name="_action" value="update">
        세트메뉴 업데이트
      </Button>
      <Button type="submit" name="_action" value="duplicate">
        세트메뉴 복제
      </Button>
    </Form>
  );
}
