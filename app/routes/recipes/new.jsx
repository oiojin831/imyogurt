import { redirect, Form, useLoaderData } from 'remix';
import { createRecipe } from '../../ingredient';
import { Select } from '@chakra-ui/react';
import { supabase } from '../../libs/supabase.js';
import { FormLabel, Flex, Button, Input } from '@chakra-ui/react';

export const action = async ({ request }) => {
  const formData = await request.formData();

  const name = formData.get('name');
  const totalVolume = formData.get('totalVolume');
  const unitVolume = formData.get('unitVolume');
  //const price = formData.get('price');
  // 판매가는 정해지는게 아니기 때문에 레시피 보다는 다른 테이블에 넣는게 좋을거같다
  const ingredientIds = [];
  const ingredientVolumes = [];
  [0, 1, 2, 3, 4].forEach((idx) => {
    if (formData.get(`ingredient${idx}`) !== null) {
      ingredientIds.push(formData.get(`ingredient${idx}`));
      ingredientVolumes.push(formData.get(`ingredient${idx}Volume`));
    }
  });
  await createRecipe({
    name,
    unitVolume,
    totalVolume,
    // price,
    ingredientIds,
    ingredientVolumes,
  });

  return redirect('/');
};
export const loader = async ({ request }) => {
  // ingredients 종류를 다 가져오기
  let { data, error } = await supabase.from('ingredients').select('id, name');
  return data;
};

export default function NewRecipe() {
  const data = useLoaderData();
  console.log(data);
  return (
    <Form method="post">
      <Flex>
        <FormLabel htmlFor="name">
          Name: <Input type="text" id="name" name="name" />
        </FormLabel>
        <FormLabel htmlFor="unitVolume">
          개당 용량: <Input type="number" id="unitVolume" name="unitVolume" />
        </FormLabel>
        <FormLabel htmlFor="totalVolume">
          총 생산 용양:{' '}
          <Input type="number" id="totalVolume" name="totalVolume" />
        </FormLabel>
        {/* <FormLabel htmlFor="price">
          개당 판매가: <Input type="number" id="price" name="price" />
        </FormLabel> */}
      </Flex>
      <Flex>
        <FormLabel htmlFor="ingredient1Volume">
          한번 생산시 들어가는 재료1의 용량:{' '}
          <Input
            type="number"
            id="ingredient1Volume"
            name="ingredient1Volume"
          />
        </FormLabel>
        <FormLabel>
          재료1
          <Select placeholder="Select option" name="ingredient1">
            {data.map((d, idx) => (
              <option key={`${d.id}-${idx}`} value={d.id}>
                {d.name}
              </option>
            ))}
          </Select>
        </FormLabel>
      </Flex>
      <Flex>
        <label>
          재료2 용량: <input type="number" name="ingredient2Volume" />
        </label>
        <Select placeholder="Select option" name="ingredient2">
          {data.map((d, idx) => (
            <option key={`${d.id}-${idx}`} value={d.id}>
              {d.name}
            </option>
          ))}
        </Select>
      </Flex>
      <Flex>
        <label>
          재료3 용량: <input type="number" name="ingredient3Volume" />
        </label>
        <Select placeholder="Select option" name="ingredient3">
          {data.map((d, idx) => (
            <option key={`${d.id}-${idx}`} value={d.id}>
              {d.name}
            </option>
          ))}
        </Select>
      </Flex>
      <Flex>
        <label>
          재료4 용량: <input type="number" name="ingredient4Volume" />
        </label>
        <Select placeholder="Select option" name="ingredient4">
          {data.map((d, idx) => (
            <option key={`${d.id}-${idx}`} value={d.id}>
              {d.name}
            </option>
          ))}
        </Select>
      </Flex>
      <Flex>
        <label>
          재료5 용량: <input type="number" name="ingredient5Volume" />
        </label>
        <Select placeholder="Select option" name="ingredient5">
          {data.map((d, idx) => (
            <option key={`${d.id}-${idx}`} value={d.id}>
              {d.name}
            </option>
          ))}
        </Select>
      </Flex>
      <Button type="submit">레시피 생성</Button>
    </Form>
  );
}
