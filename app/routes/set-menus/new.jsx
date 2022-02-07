import { redirect, Form, useLoaderData } from 'remix';
import { createSetMenu } from '../../ingredient';
import { Select } from '@chakra-ui/react';
import { supabase } from '../../libs/supabase.js';
import { FormLabel, Flex, Button, Input } from '@chakra-ui/react';

export const action = async ({ request }) => {
  const formData = await request.formData();

  const name = formData.get('name');
  const recipeIds = [];
  const recipeQuantities = [];
  [0, 1, 2, 3, 4].forEach((idx) => {
    if (formData.get(`recipe${idx}`) !== null) {
      recipeIds.push(formData.get(`recipe${idx}`));
      recipeQuantities.push(formData.get(`recipe${idx}Quantity`));
    }
  });
  await createSetMenu({
    name,
    recipeIds,
    recipeQuantities,
  });

  return redirect('/set-menus');
};
export const loader = async ({ request }) => {
  // ingredients 종류를 다 가져오기
  let { data, error } = await supabase.from('recipes').select('id, name');
  return data;
};

export default function NewSetMenu() {
  const data = useLoaderData();
  return (
    <Form method="post">
      <Flex>
        <FormLabel htmlFor="name">
          Name: <Input type="text" id="name" name="name" />
        </FormLabel>
      </Flex>
      <Flex>
        <FormLabel htmlFor="recipe1Quantity">
          한번 생산시 들어가는 재료1의 용량:{' '}
          <Input type="number" id="recipe1Quantity" name="recipe1Quantity" />
        </FormLabel>
        <FormLabel>
          레시피1
          <Select placeholder="Select option" name="recipe1">
            {data.map((d, idx) => (
              <option key={`${d.id}-${idx}`} value={d.id}>
                {d.name}
              </option>
            ))}
          </Select>
        </FormLabel>
      </Flex>
      <Flex>
        <FormLabel htmlFor="recipe2Quantity">
          한번 생산시 들어가는 재료2의 용량:{' '}
          <Input type="number" id="recipe2Quantity" name="recipe2Quantity" />
        </FormLabel>
        <FormLabel>
          레시피2
          <Select placeholder="Select option" name="recipe2">
            {data.map((d, idx) => (
              <option key={`${d.id}-${idx}`} value={d.id}>
                {d.name}
              </option>
            ))}
          </Select>
        </FormLabel>
      </Flex>
      <Flex>
        <FormLabel htmlFor="recipe3Quantity">
          한번 생산시 들어가는 재료3의 용량:{' '}
          <Input type="number" id="recipe3Quantity" name="recipe3Quantity" />
        </FormLabel>
        <FormLabel>
          레시피3
          <Select placeholder="Select option" name="recipe3">
            {data.map((d, idx) => (
              <option key={`${d.id}-${idx}`} value={d.id}>
                {d.name}
              </option>
            ))}
          </Select>
        </FormLabel>
      </Flex>
      <Flex>
        <FormLabel htmlFor="recipe4Quantity">
          한번 생산시 들어가는 재료4 용량:{' '}
          <Input type="number" id="recipe4Quantity" name="recipe4Quantity" />
        </FormLabel>
        <FormLabel>
          레시피4
          <Select placeholder="Select option" name="recipe4">
            {data.map((d, idx) => (
              <option key={`${d.id}-${idx}`} value={d.id}>
                {d.name}
              </option>
            ))}
          </Select>
        </FormLabel>
      </Flex>
      <Flex>
        <FormLabel htmlFor="recipe5Quantity">
          한번 생산시 들어가는 재료5의 용량:{' '}
          <Input type="number" id="recipe5Quantity" name="recipe5Quantity" />
        </FormLabel>
        <FormLabel>
          레시피5
          <Select placeholder="Select option" name="recipe5">
            {data.map((d, idx) => (
              <option key={`${d.id}-${idx}`} value={d.id}>
                {d.name}
              </option>
            ))}
          </Select>
        </FormLabel>
      </Flex>
      <Flex>
        <FormLabel htmlFor="recipe6Quantity">
          한번 생산시 들어가는 재료6의 용량:{' '}
          <Input type="number" id="recipe6Quantity" name="recipe6Quantity" />
        </FormLabel>
        <FormLabel>
          레시피6
          <Select placeholder="Select option" name="recipe6">
            {data.map((d, idx) => (
              <option key={`${d.id}-${idx}`} value={d.id}>
                {d.name}
              </option>
            ))}
          </Select>
        </FormLabel>
      </Flex>
      <Flex>
        <FormLabel htmlFor="recipe7Quantity">
          한번 생산시 들어가는 재료7의 용량:{' '}
          <Input type="number" id="recipe17uantity" name="recipe7Quantity" />
        </FormLabel>
        <FormLabel>
          레시피7
          <Select placeholder="Select option" name="recipe7">
            {data.map((d, idx) => (
              <option key={`${d.id}-${idx}`} value={d.id}>
                {d.name}
              </option>
            ))}
          </Select>
        </FormLabel>
      </Flex>
      <Button type="submit">세트메뉴 생성</Button>
    </Form>
  );
}
