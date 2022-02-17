import { Form, useLoaderData, useCatch, redirect, useParams } from "remix";
import { Flex, Box, FormLabel, Input, Button } from "@chakra-ui/react";
import { supabase } from "../../libs/supabase.js";

export const loader = async ({ params }) => {
  const { data, error } = await supabase
    .from("ingredients")
    .select("id, name, price, volume, buying_volume, category")
    .eq("id", params.id)
    .single();
  if (!data) {
    throw new Response("What a joke! Not found.", {
      status: 404,
    });
  }
  return data;
};

export const action = async ({ request, params }) => {
  const form = await request.formData();
  if (form.get("_method") === "delete") {
    const { data, error } = await supabase
      .from("ingredients")
      .select("id, name, price, volume, buying_volume, category")
      .eq("id", params.id);
    if (!data) {
      throw new Response("Can't delete what does not exist", { status: 404 });
    }
    await supabase.from("ingredients").delete().eq("id", params.id);
  } else {
    console.log(form.get("buyingVolume"));
    const { data, error } = await supabase
      .from("ingredients")
      .update({
        price: form.get("ingredientPrice"),
        volume: form.get("ingredientVolume"),
        name: form.get("ingredientName"),
        category: form.get("category"),
        buying_volume: form.get("buyingVolume"),
      })
      .match({ id: params.id });
  }
  return redirect("/ingredients");
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
        <FormLabel htmlFor="category">
          카테고리
          <Input
            type="text"
            id="category"
            name="category"
            defaultValue={data.category}
          />
        </FormLabel>
        <FormLabel htmlFor="buyingVolume">
          원가 계산용 용량 기본값
          <Input
            type="number"
            id="buyingVolume"
            name="buyingVolume"
            defaultValue={data.buying_volume}
          />
        </FormLabel>
        <Button type="submit" name="_action" value="update">
          재료 변경
        </Button>
      </Flex>
    </Form>
  );
}
