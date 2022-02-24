import { getDenormalizedIngredients } from "../utils";

const ingredientsData = [
  {
    name: "요거트 아이스크림(200)",
    unit_volume: 200,
    total_volume: 4000,
    ingredients: [
      {
        volume: 1000,
        detail: {
          id: 3,
          name: "요거트 가루",
          price: 11000,
          volume: 1000,
        },
      },
      {
        volume: 4000,
        detail: {
          id: 4,
          name: "우유",
          price: 5100,
          volume: 2300,
        },
      },
    ],
  },
  {
    name: "요거트 아이스크림(400)",
    unit_volume: 400,
    total_volume: 4000,
    ingredients: [
      {
        volume: 1000,
        detail: {
          id: 3,
          name: "요거트 가루",
          price: 11000,
          volume: 1000,
        },
      },
      {
        volume: 4000,
        detail: {
          id: 4,
          name: "우유",
          price: 5100,
          volume: 2300,
        },
      },
    ],
  },
];

const expected = [
  {
    name: "요거트 아이스크림(200)",
    item1Name: "요거트 가루",
    item1Price: "550.00",
    sumPrice: "993.48",
    fairPriceRange: "3312,\n4967,\n9935",
    item2Name: "우유",
    item2Price: "443.48",
  },
  {
    name: "요거트 아이스크림(400)",
    item1Name: "요거트 가루",
    item1Price: "1100.00",
    sumPrice: "1986.96",
    fairPriceRange: "6623,\n9935,\n19870",
    item2Name: "우유",
    item2Price: "886.96",
  },
];

test("get Ingredient data in denormalized format", () => {
  const obj = getDenormalizedIngredients(ingredientsData[0]);
  expect(obj).toStrictEqual(expected[0]);
});

// test("get cost from db", () => {
//   return getCosts().then((data) => {
//     const newData = data?.map((ele) => {
//       ele.ingredients;
//     });
//     expect(newData).toStrictEqual(expected);
//   });
// });
