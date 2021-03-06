import React from "react";
import { useLoaderData, Link } from "remix";
import { Box, Button, Flex, useColorModeValue } from "@chakra-ui/react";
import {
  groupedByName,
  groupedByRecipeName,
} from "../../components/utils/index.js";
import { supabase } from "../../libs/supabase.js";
import {
  Card,
  CardHeader,
  CardContent,
  Property,
} from "../../components/Card/";

export const loader = async () => {
  const { data } = await supabase.rpc("set_menu_infos");

  const result = groupedByName(data);
  const secondGroup = Object.values(result).map((re) =>
    groupedByRecipeName(re)
  );
  const loaderData = secondGroup.map((menu, idx) => {
    const newArr = [];
    for (const [key, value] of Object.entries(secondGroup[idx])) {
      let quant = 0;
      const price = value.reduce((prev, v, idx) => {
        prev = prev + v.quantity.toFixed(2) * v.raw_price.toFixed(2);
        quant = v.quantity;
        return prev;
      }, 0);
      newArr.push({
        name: key,
        recipe_id: value[0].recipe_id,
        set_menu_id: value[0].set_menu_id,
        price,
        quantity: quant,
      });
    }
    return { [Object.keys(result)[idx]]: newArr };
  });
  return loaderData;
};

export default function Index() {
  const data = useLoaderData();
  return (
    <Flex flexFlow="wrap" justify="space-around">
      {data.map((entry, idx) => {
        let totalRaw = 0;
        return (
          <Box
            minW="400px"
            as="section"
            bg={useColorModeValue("gray.100", "inherit")}
            py="4"
            px={{ md: "8" }}
            key={idx}
          >
            <Card maxW="3xl" mx="auto">
              <CardHeader
                title={Object.keys(entry)[0]}
                action={[
                  <Button
                    as={Link}
                    to={`/set-menus/${
                      entry[Object.keys(entry)[0]][0].set_menu_id
                    }`}
                    colorScheme="teal"
                    variant="outline"
                  >
                    ??????
                  </Button>,
                ]}
              />
              <CardContent>
                <>
                  {Object.values(entry)[0].map((recipe, idx) => {
                    const recipeRaw = Object.values(recipe)[3];
                    totalRaw = totalRaw + recipeRaw;
                    return (
                      <Property
                        key={`${idx}-${recipe.name}`}
                        label={`${recipe.name}(${Object.values(recipe)[4]})`}
                        value={recipeRaw}
                      />
                    );
                  })}
                  <Property label="??? ??????" value={totalRaw.toFixed(2)} />
                  <Property
                    label="?????????(10%??? ????????????)"
                    value={(totalRaw * 10).toFixed(2)}
                  />
                  <Property
                    label="?????????(20%??? ????????????)"
                    value={(totalRaw * 5).toFixed(2)}
                  />
                  <Property
                    label="?????????(30%??? ????????????)"
                    value={(totalRaw * 3.3333333).toFixed(2)}
                  />
                </>
              </CardContent>
            </Card>
          </Box>
        );
      })}
    </Flex>
  );
}
