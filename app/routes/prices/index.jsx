import React from 'react';
import { useLoaderData, Link } from 'remix';
import {
  Flex,
  Box,
  Table,
  Thead,
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
const round = Math.round;

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
      sumPrice = sumPrice + v.raw_price;
      prev[`item${idx + 1}Name`] = v.ingredient_name;
      prev[`item${idx + 1}Price`] = v.raw_price.toFixed(2);
      prev['sumPrice'] = sumPrice.toFixed(2);
      // prev['unitPrice'] = v.unit_price;
      // prev['priceRatio'] = ((sumPrice / v.unit_price) * 100).toFixed(2);
      // unit price는 state로 넣어놓기.
      // prev['priceRange'] = `${(v.unit_price * 0.2).toFixed(2)} ~ ${(
      //   v.unit_price * 0.3
      // ).toFixed(2)}`;
      prev['fairPriceRange'] = `${round(sumPrice * 3.3333333)},\n${round(
        sumPrice * 5
      )},\n${round(sumPrice * 10)}`;

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
      // {
      //   Header: '판매가',
      //   minWidth: 100,
      //   accessor: 'unitPrice',
      // },
      {
        Header: '총원가',
        minWidth: 120,
        accessor: 'sumPrice',
      },
      // {
      //   Header: '비율',
      //   minWidth: 100,
      //   accessor: 'priceRatio',
      //   Cell: (props) => <div>{props.value + '%'} </div>,
      // },
      // {
      //   Header: '마지노선(20~30%)',
      //   minWidth: 100,
      //   accessor: 'priceRange',
      // },
      {
        Header: '적정판매가',
        minWidth: 100,
        accessor: 'fairPriceRange',
      },
      {
        Header: '재료1',
        show: false,
        columns: [
          {
            Header: '이름',
            id: 'item1-name',
            accessor: 'item1Name',
            show: false,
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
        show: false,
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

  const {
    getTableProps,
    getTableBodyProps,
    getToggleHideAllColumnsProps,
    allColumns,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  return (
    <>
      <div>
        <Accordion allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Section 1 title
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
              <br />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup, idx) => (
            <Tr key={idx} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, idx2) => (
                <Th
                  key={idx2}
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
