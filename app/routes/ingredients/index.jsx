import React from 'react';
import { useLoaderData, Link } from 'remix';
import {
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Button,
} from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { useTable, useSortBy } from 'react-table';
import { supabase } from '../../libs/supabase.js';

export const loader = async () => {
  const { data: ingredients } = await supabase
    .from('ingredients')
    .select('id, name, price, volume');

  // We can pick and choose what we want to display
  // This can solve the issue of over-fetching or under-fetching
  return ingredients;
};

export default function Index() {
  return <DataTable />;
}

function DataTable() {
  const ingredients = useLoaderData();
  const derived = ingredients.map((i) => {
    return { ...i, unitPrice: i.price / i.volume };
  });

  const data = React.useMemo(() => derived, []);

  const columns = React.useMemo(
    () => [
      {
        Header: '이름',
        accessor: 'name',
      },
      {
        Header: '구입가격',
        accessor: 'price',
        isNumeric: true,
      },
      {
        Header: '용량',
        accessor: 'volume',
        isNumeric: true,
      },
      {
        Header: '단위 가격',
        accessor: 'unitPrice',
        isNumeric: true,
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <>
      <Flex justify="end">
        <Link to="/ingredients/new">
          <Button colorScheme="teal" variant="outline">
            추가
          </Button>
        </Link>
      </Flex>

      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  isNumeric={column.isNumeric}
                >
                  {column.render('Header')}
                  <chakra.span pl="4">
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <TriangleDownIcon aria-label="sorted descending" />
                      ) : (
                        <TriangleUpIcon aria-label="sorted ascending" />
                      )
                    ) : null}
                  </chakra.span>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <Td
                    {...cell.getCellProps()}
                    isNumeric={cell.column.isNumeric}
                  >
                    {cell.render('Cell')}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
}
