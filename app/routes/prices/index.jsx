import React from "react";
import { useLoaderData, Link } from "remix";
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
} from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useTable, useSortBy } from "react-table";
import { getCosts } from "../../models/costs";

export const loader = async () => {
  const data = getCosts();
  return data;
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
        Header: "이름",
        minWidth: 100,
        accessor: "name",
      },
      {
        Header: "총원가",
        minWidth: 120,
        accessor: "sumPrice",
      },
      {
        Header: "적정판매가",
        minWidth: 100,
        accessor: "fairPriceRange",
      },
      {
        Header: "재료1",
        show: false,
        columns: [
          {
            Header: "이름",
            id: "item1-name",
            accessor: "item1Name",
            show: false,
          },
          {
            Header: "원가",
            id: "item1-price",
            accessor: "item1Price",
          },
        ],
      },
      {
        Header: "재료2",
        show: false,
        columns: [
          {
            Header: "이름",
            id: "item2-name",
            accessor: "item2Name",
          },
          {
            Header: "원가",
            id: "item2-price",
            accessor: "item2Price",
          },
        ],
      },
      {
        Header: "재료3",
        columns: [
          {
            Header: "이름",
            id: "item3-name",
            accessor: "item3Name",
          },
          {
            Header: "원가",
            id: "item3-price",
            accessor: "item3Price",
          },
        ],
      },
      {
        Header: "재료4",
        columns: [
          {
            Header: "이름",
            id: "item4-name",
            accessor: "item4Name",
          },
          {
            Header: "원가",
            id: "item4-price",
            accessor: "item4Price",
          },
        ],
      },
      {
        Header: "재료5",
        columns: [
          {
            Header: "이름",
            id: "item5-name",
            accessor: "item5Name",
          },
          {
            Header: "원가",
            id: "item5-price",
            accessor: "item5Price",
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
                <IndeterminateCheckbox {...getToggleHideAllColumnsProps()} />{" "}
                Toggle All
              </div>
              {allColumns.map((column) => (
                <div key={column.id}>
                  <label>
                    <input type="checkbox" {...column.getToggleHiddenProps()} />{" "}
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
                  {column.render("Header")}
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
                    {cell.render("Cell")}
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
