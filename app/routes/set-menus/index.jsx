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
      const price = value.reduce((prev, v, idx) => {
        prev = prev + v.quantity.toFixed(2) * v.raw_price.toFixed(2);
        return prev;
      }, 0);
      newArr.push({
        name: key,
        price,
      });
    }
    return { [Object.keys(result)[idx]]: newArr };
  });
  return loaderData;
};

export default function Index() {
  const data = useLoaderData();
  // console.log(JSON.stringify(data, null, 2));
  return (
    <Flex flexFlow="wrap" justify="space-around">
      {data.map((entry, idx) => {
        let totalRaw = 0;
        return (
          <Box
            minW="400px"
            as="section"
            bg={useColorModeValue('gray.100', 'inherit')}
            py="4"
            px={{ md: '8' }}
            key={idx}
          >
            <Card maxW="3xl" mx="auto">
              <CardHeader title={Object.keys(entry)[0]} />
              <CardContent>
                <>
                  {Object.values(entry)[0].map((recipe, idx) => {
                    const recipeRaw = Object.values(recipe)[1];
                    totalRaw = totalRaw + recipeRaw;
                    return (
                      <Property
                        key={`${idx}-${recipe.name}`}
                        label={recipe.name}
                        value={recipeRaw}
                      />
                    );
                  })}
                  <Property label="총 원가" value={totalRaw.toFixed(2)} />
                </>
              </CardContent>
            </Card>
          </Box>
        );
      })}
    </Flex>
  );
}
