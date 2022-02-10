import { Form, useLoaderData, useCatch, redirect, useParams } from 'remix';
import { Flex, Box, FormLabel, Input, Button } from '@chakra-ui/react';
import { supabase } from '../../libs/supabase.js';

export const loader = async ({ params }) => {
  const { data, error } = await supabase
    .from('ingredients')
    .select('id, name, price, volume')
    .eq('id', params.id)
    .single();
  if (!data) {
    throw new Response('What a joke! Not found.', {
      status: 404,
    });
  }
  return data;
};

export const action = async ({ request, params }) => {
  const form = await request.formData();
  if (form.get('_method') === 'delete') {
    const { data, error } = await supabase
      .from('ingredients')
      .select('id, name, price, volume')
      .eq('id', params.id);
    if (!data) {
      throw new Response("Can't delete what does not exist", { status: 404 });
    }
    await supabase.from('ingredients').delete().eq('id', params.id);
  } else {
    const { data, error } = await supabase
      .from('ingredients')
      .update({
        price: form.get('ingredientPrice'),
        volume: form.get('ingredientVolume'),
        name: form.get('ingredientName'),
      })
      .match({ id: params.id });
  }
  return redirect('/ingredients');
};

export default function IngredientRoute() {
  const data = useLoaderData();

  return (
    <Form method="post">
      <Flex flexDir="column">
        <Box>{data.id}</Box>
        <FormLabel htmlFor="ingredientName">
          재료 이름
          <Input
            type="text"
            id="ingredientName"
            name="ingredientName"
            defaultValue={data.name}
          />
        </FormLabel>
        <FormLabel htmlFor="ingredientPrice">
          재료 가격
          <Input
            type="number"
            id="ingredientPrice"
            name="ingredientPrice"
            defaultValue={data.price}
          />
        </FormLabel>
        <FormLabel htmlFor="ingredientVolume">
          재료 용량
          <Input
            type="number"
            id="ingredientVolume"
            name="ingredientVolume"
            defaultValue={data.volume}
          />
        </FormLabel>
        <Button type="submit" name="_action" value="update">
          재료 변경
        </Button>
      </Flex>
    </Form>
  );
}
