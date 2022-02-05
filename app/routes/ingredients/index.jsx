import React from 'react';
import { useLoaderData, Link } from 'remix';
import { Box, Button, Flex, useColorModeValue } from '@chakra-ui/react';
import { supabase } from '../../libs/supabase.js';
import { HiPencilAlt } from 'react-icons/hi';
import {
  Card,
  CardHeader,
  CardContent,
  Property,
} from '../../components/Card/';

export const loader = async () => {
  const { data: ingredients } = await supabase
    .from('ingredients')
    .select('id, name, price, volume');

  // We can pick and choose what we want to display
  // This can solve the issue of over-fetching or under-fetching
  return ingredients;
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
              <Property label="구매 가격" value={`${entry.price}원`} />
              <Property label="총 용량" value={entry.volume} />
              <Property
                label="단위가격(1g, 1ml)"
                value={`${(entry.price / entry.volume).toFixed(2)}원`}
              />
            </CardContent>
          </Card>
        </Box>
      ))}
    </Flex>
  );
}
