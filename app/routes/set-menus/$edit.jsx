import { redirect, Form, useLoaderData } from 'remix';
import { createSetMenu } from '../../remoteApi';
import { Select } from '@chakra-ui/react';
import { supabase } from '../../libs/supabase.js';
import { FormLabel, Flex, Button, Input } from '@chakra-ui/react';

export const action = async ({ request }) => {
  const formData = await request.formData();
  let { _action, ...values } = Object.fromEntries(formData);

  const name = formData.get('name');
  const id = formData.get('menuId');
  const recipeIds = [];
  const setMenuRecipeIds = [];
  const recipeQuantities = [];
  [0, 1, 2, 3, 4, 5, 6, 7, 8].forEach((idx) => {
    if (formData.get(`recipe${idx}`) !== null) {
      recipeIds.push(formData.get(`recipe${idx}`));
      setMenuRecipeIds.push(formData.get(`setMenuRecipe${idx}`));
      recipeQuantities.push(formData.get(`recipe${idx}Quantity`));
    }
  });
  console.log(setMenuRecipeIds);
  if (_action === 'update') {
    await createSetMenu({
      id,
      name,
      setMenuRecipeIds,
      recipeIds,
      recipeQuantities,
    });
  } else {
    await createSetMenu({
      name: `${name}-copy`,
      recipeIds,
      recipeQuantities,
    });
  }

  return redirect('/set-menus');
};

export const loader = async ({ params }) => {
  const { data: set_menu, error } = await supabase
    .rpc(`get_set_menu_info`, { input_set_menu_id: params.edit })
    .select('*');
  let { data: recipes } = await supabase.from('recipes').select('id, name');
  return { set_menu, recipes };
};

export default function NewSetMenu() {
  const { set_menu, recipes } = useLoaderData();
  //TODO, set_menu_recipes_id가 없어서 선택된애들이 upsert가 안되고있따
  // supabase의 get_set_menu_info에서 set_menu_recipes_id를 가져오고
  // form으로 보낼때도 같이 보내주자.
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
          Name:{' '}
          <Input
            type="text"
            id="name"
            name="name"
            defaultValue={set_menu[0]?.set_menu_name}
          />
        </FormLabel>
      </Flex>
      <Flex>
        <Input
          hidden={true}
          type="number"
          name="setMenuRecipe1"
          id="setMenuRecipe1"
          defaultValue={set_menu[0]?.set_menu_recipe_id}
        />
        <FormLabel htmlFor="recipe1Quantity">
          한번 생산시 들어가는 재료1의 용량:{' '}
          <Input
            type="number"
            id="recipe1Quantity"
            name="recipe1Quantity"
            defaultValue={set_menu[0]?.quantity}
          />
        </FormLabel>
        <FormLabel>
          레시피1
          <Select placeholder="Select option" name="recipe1">
            {recipes.map((d, idx) => (
              <option
                key={`${d.id}-${idx}`}
                value={d.id}
                selected={d.id === set_menu[0]?.recipe_id}
              >
                {d.name}
              </option>
            ))}
          </Select>
        </FormLabel>
      </Flex>
      <Flex>
        <Input
          hidden={true}
          type="number"
          name="setMenuRecipe2"
          id="setMenuRecipe2"
          defaultValue={set_menu[1]?.set_menu_recipe_id}
        />
        <FormLabel htmlFor="recipe2Quantity">
          한번 생산시 들어가는 재료2의 용량:{' '}
          <Input
            type="number"
            id="recipe2Quantity"
            name="recipe2Quantity"
            defaultValue={set_menu[1]?.quantity}
          />
        </FormLabel>
        <FormLabel>
          레시피2
          <Select placeholder="Select option" name="recipe2">
            {recipes.map((d, idx) => (
              <option
                key={`${d.id}-${idx}`}
                value={d.id}
                selected={d.id === set_menu[1]?.recipe_id}
              >
                {d.name}
              </option>
            ))}
          </Select>
        </FormLabel>
      </Flex>
      <Flex>
        <Input
          hidden={true}
          type="number"
          name="setMenuRecipe3"
          id="setMenuRecipe3"
          defaultValue={set_menu[2]?.set_menu_recipe_id}
        />
        <FormLabel htmlFor="recipe3Quantity">
          한번 생산시 들어가는 재료3의 용량:{' '}
          <Input
            type="number"
            id="recipe3Quantity"
            name="recipe3Quantity"
            defaultValue={set_menu[2]?.quantity}
          />
        </FormLabel>
        <FormLabel>
          레시피3
          <Select placeholder="Select option" name="recipe3">
            {recipes.map((d, idx) => (
              <option
                key={`${d.id}-${idx}`}
                value={d.id}
                selected={d.id === set_menu[2]?.recipe_id}
              >
                {d.name}
              </option>
            ))}
          </Select>
        </FormLabel>
      </Flex>
      <Flex>
        <Input
          hidden={true}
          type="number"
          name="setMenuRecipe4"
          id="setMenuRecipe4"
          defaultValue={set_menu[3]?.set_menu_recipe_id}
        />
        <FormLabel htmlFor="recipe4Quantity">
          한번 생산시 들어가는 재료4 용량:{' '}
          <Input
            type="number"
            id="recipe4Quantity"
            name="recipe4Quantity"
            defaultValue={set_menu[3]?.quantity}
          />
        </FormLabel>
        <FormLabel>
          레시피4
          <Select placeholder="Select option" name="recipe4">
            {recipes.map((d, idx) => (
              <option
                key={`${d.id}-${idx}`}
                value={d.id}
                selected={d.id === set_menu[3]?.recipe_id}
              >
                {d.name}
              </option>
            ))}
          </Select>
        </FormLabel>
      </Flex>
      <Flex>
        <Input
          hidden={true}
          type="number"
          name="setMenuRecipe5"
          id="setMenuRecipe5"
          defaultValue={set_menu[4]?.set_menu_recipe_id}
        />
        <FormLabel htmlFor="recipe5Quantity">
          한번 생산시 들어가는 재료5의 용량:{' '}
          <Input
            type="number"
            id="recipe5Quantity"
            name="recipe5Quantity"
            defaultValue={set_menu[4]?.quantity}
          />
        </FormLabel>
        <FormLabel>
          레시피5
          <Select placeholder="Select option" name="recipe5">
            {recipes.map((d, idx) => (
              <option
                key={`${d.id}-${idx}`}
                value={d.id}
                selected={d.id === set_menu[4]?.recipe_id}
              >
                {d.name}
              </option>
            ))}
          </Select>
        </FormLabel>
      </Flex>
      <Flex>
        <Input
          hidden={true}
          type="number"
          name="setMenuRecipe6"
          id="setMenuRecipe6"
          defaultValue={set_menu[5]?.set_menu_recipe_id}
        />
        <FormLabel htmlFor="recipe6Quantity">
          한번 생산시 들어가는 재료6의 용량:{' '}
          <Input
            type="number"
            id="recipe6Quantity"
            name="recipe6Quantity"
            defaultValue={set_menu[5]?.quantity}
          />
        </FormLabel>
        <FormLabel>
          레시피6
          <Select placeholder="Select option" name="recipe6">
            {recipes.map((d, idx) => (
              <option
                key={`${d.id}-${idx}`}
                value={d.id}
                selected={d.id === set_menu[5]?.recipe_id}
              >
                {d.name}
              </option>
            ))}
          </Select>
        </FormLabel>
      </Flex>
      <Flex>
        <Input
          hidden={true}
          type="number"
          name="setMenuRecipe7"
          id="setMenuRecipe7"
          defaultValue={set_menu[6]?.set_menu_recipe_id}
        />
        <FormLabel htmlFor="recipe7Quantity">
          한번 생산시 들어가는 재료7의 용량:{' '}
          <Input
            type="number"
            id="recipe7uantity"
            name="recipe7Quantity"
            defaultValue={set_menu[6]?.quantity}
          />
        </FormLabel>
        <FormLabel>
          레시피7
          <Select placeholder="Select option" name="recipe7">
            {recipes.map((d, idx) => (
              <option
                key={`${d.id}-${idx}`}
                value={d.id}
                selected={d.id === set_menu[6]?.recipe_id}
              >
                {d.name}
              </option>
            ))}
          </Select>
        </FormLabel>
      </Flex>
      <Flex>
        <Input
          hidden={true}
          type="number"
          name="setMenuRecipe8"
          id="setMenuRecipe8"
          defaultValue={set_menu[7]?.set_menu_recipe_id}
        />
        <FormLabel htmlFor="recipe8Quantity">
          한번 생산시 들어가는 재료8의 용량:{' '}
          <Input
            type="number"
            id="recipe8uantity"
            name="recipe8Quantity"
            defaultValue={set_menu[7]?.quantity}
          />
        </FormLabel>
        <FormLabel>
          레시피8
          <Select placeholder="Select option" name="recipe8">
            {recipes.map((d, idx) => (
              <option
                key={`${d.id}-${idx}`}
                value={d.id}
                selected={d.id === set_menu[6]?.recipe_id}
              >
                {d.name}
              </option>
            ))}
          </Select>
        </FormLabel>
      </Flex>
      <Flex>
        <Input
          hidden={true}
          type="number"
          name="setMenuRecipe9"
          id="setMenuRecipe9"
          defaultValue={set_menu[8]?.set_menu_recipe_id}
        />
        <FormLabel htmlFor="recipe9Quantity">
          한번 생산시 들어가는 재료9의 용량:{' '}
          <Input
            type="number"
            id="recipe9uantity"
            name="recipe9Quantity"
            defaultValue={set_menu[8]?.quantity}
          />
        </FormLabel>
        <FormLabel>
          레시피9
          <Select placeholder="Select option" name="recipe9">
            {recipes.map((d, idx) => (
              <option
                key={`${d.id}-${idx}`}
                value={d.id}
                selected={d.id === set_menu[8]?.recipe_id}
              >
                {d.name}
              </option>
            ))}
          </Select>
        </FormLabel>
      </Flex>
      <Button type="submit" name="_action" value="update">
        세트메뉴 업데이트
      </Button>
      <Button type="submit" name="_action" value="duplicate">
        세트메뉴 복제
      </Button>
    </Form>
  );
}
