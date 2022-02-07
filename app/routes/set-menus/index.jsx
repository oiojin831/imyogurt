import React from 'react';
import { useLoaderData, Link } from 'remix';
import { Box, Button, Flex, useColorModeValue } from '@chakra-ui/react';
import { groupedByName } from '../../components/utils/index.js';
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
  const newArr = [];
  for (const [key, value] of Object.entries(result)) {
    const items = value.reduce((prev, v, idx) => {
      prev[`item${idx + 1}Name`] = v.recipe_name;
      prev[`item${idx + 1}Quantity`] = v.quantity.toFixed(2);
      return prev;
    }, {});
    newArr.push({
      name: key,
      ...items,
    });
  }
  return newArr;
};

export default function Index() {
  const data = useLoaderData();
  return (
    <Flex flexFlow="wrap" justify="space-around">
      {data.map((entry) => (
        <Box
          minW="400px"
          as="section"
          bg={useColorModeValue('gray.100', 'inherit')}
          py="4"
          px={{ md: '8' }}
          key={entry.id}
        >
          <Card maxW="3xl" mx="auto">
            <CardHeader
              title={entry.name}
              action={
                <form action={`/ingredients/${entry.id}`} method="post">
                  <input type="hidden" name="_method" value="delete" />
                  <Button
                    type="submit"
                    variant="outline"
                    minW="20"
                    leftIcon={<HiPencilAlt />}
                  >
                    DELETE
                  </Button>
                </form>
              }
            />
            <CardContent>
              <Property label="재료 1" value={`${entry.item1Name}`} />
              <Property label="재료 2" value={entry.item2Name} />
            </CardContent>
          </Card>
        </Box>
      ))}
    </Flex>
  );
}
