import React from 'react';
import { useLoaderData, Link } from 'remix';
import { Box, Button, Flex, useColorModeValue } from '@chakra-ui/react';
import { supabase } from '../../libs/supabase.js';
import DeleteAlert from '../../components/Alert/index.js';
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
              action={[
                <Button
                  as={Link}
                  to={`/ingredients/${entry.id}`}
                  variant="outline"
                >
                  수정
                </Button>,
                <DeleteAlert
                  title="ingredient"
                  url={`/ingredients/${entry.id}`}
                />,
              ]}
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
