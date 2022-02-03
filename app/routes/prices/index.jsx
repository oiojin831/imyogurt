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
  let { data, error } = await supabase.rpc('one_portion_price');

  result = data.reduce(function (newData, ele) {
    const { name, ...rest } = ele;
    newData[name] = newData[name] || [];
    newData[name].push(rest);
    return newData;
  }, {});

  const newArr = [];
  for (const [key, value] of Object.entries(result)) {
    let sumPrice = 0;
    const items = value.reduce((prev, v, idx) => {
      sumPrice = sumPrice + v.one_portion_price;
      prev[`item${idx + 1}Name`] = v.ingredient_name;
      prev[`item${idx + 1}Price`] = v.one_portion_price.toFixed(2);
      prev['sumPrice'] = sumPrice.toFixed(2);
      return prev;
    }, {});
    newArr.push({
      name: key,
      ...items,
    });
  }
  console.log('newarr', newArr);

  if (error) console.log('error', error);
  // We can pick and choose what we want to display
  // This can solve the issue of over-fetching or under-fetching
  return newArr;
};

export default function Index() {
  return <DataTable />;
}

function DataTable() {
  const recipes = useLoaderData();

  const data = React.useMemo(() => recipes, []);

  const columns = React.useMemo(
    () => [
      {
        Header: '이름',
        minWidth: 100,
        accessor: 'name',
      },
      {
        Header: '총원가',
        minWidth: 100,
        accessor: 'sumPrice',
      },
      {
        Header: '재료1',
        columns: [
          {
            Header: '이름',
            id: 'item1-name',
            accessor: 'item1Name',
          },
          {
            Header: '원가',
            id: 'item1-price',
            accessor: 'item1Price',
          },
        ],
      },
      {
        Header: '재료2',
        columns: [
          {
            Header: '이름',
            id: 'item2-name',
            accessor: 'item2Name',
          },
          {
            Header: '원가',
            id: 'item2-price',
            accessor: 'item2Price',
          },
        ],
      },
      {
        Header: '재료3',
        columns: [
          {
            Header: '이름',
            id: 'item3-name',
            accessor: 'item3Name',
          },
          {
            Header: '원가',
            id: 'item3-price',
            accessor: 'item3Price',
          },
        ],
      },
      {
        Header: '재료4',
        columns: [
          {
            Header: '이름',
            id: 'item4-name',
            accessor: 'item4Name',
          },
          {
            Header: '원가',
            id: 'item4-price',
            accessor: 'item4Price',
          },
        ],
      },
      {
        Header: '재료5',
        columns: [
          {
            Header: '이름',
            id: 'item5-name',
            accessor: 'item5Name',
          },
          {
            Header: '원가',
            id: 'item5-price',
            accessor: 'item5Price',
          },
        ],
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <>
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
