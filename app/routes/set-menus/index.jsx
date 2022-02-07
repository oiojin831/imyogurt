import React from 'react';
import { useLoaderData, Link } from 'remix';
import { Box, Button, Flex, useColorModeValue } from '@chakra-ui/react';
import {
  groupedByName,
  groupedByRecipeName,
} from '../../components/utils/index.js';
import { supabase } from '../../libs/supabase.js';
import { HiPencilAlt } from 'react-icons/hi';
import {
  Card,
  CardHeader,
  CardContent,
  Property,
} from '../../components/Card/';

export const loader = async () => {
  const { data } = await supabase.rpc('set_menu_infos');

  const result = groupedByName(data);
  const secondGroup = Object.values(result).map((re) =>
    groupedByRecipeName(re)
  );
  const loaderData = secondGroup.map((menu, idx) => {
    const newArr = [];
    for (const [key, value] of Object.entries(secondGroup[idx])) {
      const items = value.reduce((prev, v, idx) => {
        prev[`item${idx + 1}Name`] = v.ingredient_name;
        prev[`item${idx + 1}Quantity`] = v.quantity.toFixed(2);
        prev[`item${idx + 1}RawPrice`] = v.raw_price.toFixed(2);
        return prev;
      }, {});
      newArr.push({
        name: key,
        ...items,
      });
    }
    return { [Object.keys(result)[idx]]: newArr };
  });
  return loaderData;
};

export default function Index() {
  const data = useLoaderData();
  console.log(JSON.stringify(data, null, 2));
  return (
    <Flex flexFlow="wrap" justify="space-around">
      {data.map((entry, idx) => (
        <Box
          minW="400px"
          as="section"
          bg={useColorModeValue('gray.100', 'inherit')}
          py="4"
          px={{ md: '8' }}
          key={entry.idx}
        >
          <Card maxW="3xl" mx="auto">
            <CardHeader title={Object.keys(entry)[0]} />
            <CardContent>
              {Object.values(entry)[0].map((recipe, idx) => (
                <Property
                  key={`${idx}-${recipe.name}`}
                  label={recipe.name}
                  value={Object.values(recipe)
                    .splice(1)
                    .map((a, i) => (i % 3 === 0 ? `${a}\n` : `${a}, `))}
                />
              ))}
            </CardContent>
          </Card>
        </Box>
      ))}
    </Flex>
  );
}
