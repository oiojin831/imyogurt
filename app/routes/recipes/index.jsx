import React from 'react';
import { useLoaderData, Link } from 'remix';
import {
  Flex,
  Table,
  Thead,
  Box,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Button,
} from '@chakra-ui/react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { useTable, useSortBy } from 'react-table';
import { supabase } from '../../libs/supabase.js';

export const loader = async () => {
  let { data, error } = await supabase.rpc('one_batch_recipe');
  console.log(data.map((a) => a.batch_volume));

  result = data.reduce(function (newData, ele) {
    const { recipe_name, ...rest } = ele;
    newData[recipe_name] = newData[recipe_name] || [];
    newData[recipe_name].push(rest);
    return newData;
  }, {});

  const newArr = [];
  for (const [key, value] of Object.entries(result)) {
    const items = value.reduce((prev, v, idx) => {
      prev['unitVolume'] = v.unit_volume.toFixed(2);
      prev['totalVolume'] = v.total_volume?.toFixed(2);
      prev[`item${idx + 1}Name`] = v.ingredient_name;
      prev[`item${idx + 1}BatchVolume`] = v.batch_volume?.toFixed(2);
      return prev;
    }, {});
    newArr.push({
      name: key,
      ...items,
    });
  }

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
      ...[1, 2, 3, 4, 5].map((num) => {
        return {
          Header: `재료${num}`,
          columns: [
            {
              Header: '이름',
              id: `item${num}-name`,
              accessor: `item${num}Name`,
            },
            {
              Header: '재료 용량',
              id: `item${num}-batch-volume`,
              accessor: `item${num}BatchVolume`,
            },
          ],
        };
      }),
      {
        Header: '상품 1개 용량',
        accessor: `unitVolume`,
      },
      {
        Header: '레시피 총생산 용량',
        accessor: `totalVolume`,
      },
    ],
    []
  );

  const {
    getTableProps,
    getToggleHideAllColumnsProps,
    allColumns,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy);

  return (
    <>
      <div>
        <Accordion allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  필터
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <div>
                <IndeterminateCheckbox {...getToggleHideAllColumnsProps()} />{' '}
                Toggle All
              </div>
              {allColumns.map((column) => (
                <div key={column.id}>
                  <label>
                    <input type="checkbox" {...column.getToggleHiddenProps()} />{' '}
                    {column.id}
                  </label>
                </div>
              ))}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <br />
      </div>
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, idx) => (
                <Th
                  key={idx}
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
const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return <input type="checkbox" ref={resolvedRef} {...rest} />;
  }
);
