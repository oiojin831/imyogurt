import React from "react";
import { Link, useLoaderData, useSearchParams, Form } from "remix";
import { supabase } from "../../libs/supabase.js";
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Box,
  Button,
  Flex,
  VStack,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";

import DeleteAlert from "../../components/Alert/index.js";
import {
  Card,
  CardHeader,
  CardContent,
  Property,
} from "../../components/Card/";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);
  let data;
  if (search.get("query")) {
    const ingredients = await supabase
      .from("ingredients")
      .select()
      .textSearch("name", `'${search.get("query")}'`);
    data = ingredients.data;
  } else {
    const ingredients = await supabase
      .from("ingredients")
      .select("id, name, price, volume, category, buying_volume");
    data = ingredients.data;
  }

  return data;
};

export default function Calculator() {
  const [buyVolume, setBuyVolume] = React.useState(1);
  const [params] = useSearchParams();
  const data = useLoaderData();
  const [sort, setSort] = React.useState(true);
  const sorted = data.sort((a, b) =>
    a.name > b.name ? 1 : b.name > a.name ? -1 : 0
  );
  const sortedData = sort ? sorted : sorted.reverse();

  return (
    <>
      <VStack
        justify="center"
        flex="1"
        w={{ base: "full", md: "auto" }}
        spacing={{ base: "2", md: "4" }}
        my={4}
      >
        <Form>
          <Button onClick={() => setSort((prev) => !prev)}>
            이름순으로 정렬
          </Button>
          <InputGroup maxW={{ md: "80" }} w="full">
            <InputRightElement color="gray.400">
              <FiSearch />
            </InputRightElement>
            <Input
              type="text"
              id="query"
              name="query"
              placeholder="Search ingredient..."
              defaultValue={params.get("query")}
            />
          </InputGroup>
        </Form>
      </VStack>
      <Flex flexFlow="wrap" justify="space-around">
        {data.map((entry) => (
          <Box minW="280px" as="section" py="4" px={{ md: "8" }} key={entry.id}>
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
                <FormControl px="6" py="4">
                  <FormLabel htmlFor="buyVolume">구매량</FormLabel>
                  <Input
                    id="buyVolume"
                    type="number"
                    defaultValue={entry.buying_volume}
                    onChange={(e) => setBuyVolume(e.target.value)}
                  />
                  <FormHelperText>구매하는 용량을 입력해주세요</FormHelperText>
                </FormControl>
                <Property
                  label="적정가격"
                  value={`${((entry.price / entry.volume) * buyVolume).toFixed(
                    0
                  )}원`}
                />
                <Property
                  label="마지 노선"
                  value={`${(
                    (entry.price / entry.volume) *
                    1.5 *
                    buyVolume
                  ).toFixed(0)}원`}
                />
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
    </>
  );
}
