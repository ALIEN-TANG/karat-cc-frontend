import React, { useMemo } from "react";
import styled from "@emotion/styled";
import { useQuery } from "react-query";
import {
  useTable,
  useSortBy,
  useAsyncDebounce,
  useFilters,
  useGlobalFilter,
} from "react-table";
import { matchSorter } from "match-sorter";

import { getCardActivity } from "api/card";
import { H2 } from "components/lib/typography";
import { getUserCardId } from "components/CardOverview";

function CardActivity() {
  const cardId = getUserCardId();
  const {
    data: transactions,
    isLoading,
    isError,
  } = useQuery("CardActivity", () => getCardActivity(cardId));
  const data = useMemo(() => transactions, [transactions]);
  const columns = useMemo(
    () => [
      { Header: "Merchant", accessor: "merchant" },
      { Header: "Category", accessor: "category" },
      { Header: "Amount", accessor: "amount" },
      { Header: "Date", accessor: "created_at" },
    ],
    []
  );
  return (
    <Container>
      <H2>Activity</H2>
      {!isLoading && !isError && <Table columns={columns} data={data} />}
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-area: activity;
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.colors.rust};
  padding: 24px;
  box-sizing: border-box;
`;
export default CardActivity;

// Table stuff starts here
// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;
function Table({ columns, data }) {
  const filterTypes = React.useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,
    }),
    []
  );

  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    state,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
    },
    useFilters,
    useGlobalFilter,
    useSortBy
  );
  return (
    <TableContainer>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <table {...getTableProps()} style={{ width: "100%", textAlign: "left" }}>
        <thead style={{ height: "80px", boxSizing: "content-box" }}>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{
                    minWidth: "120px",
                    lineHeight: "20px",
                  }}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </TableContainer>
  );
}
const TableContainer = styled.div`
  height: 300px;
  width: 1000px;
  margin: 0 auto;
  overflow: scroll;
`;

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      Global Search:
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: "1.1rem",
          border: "0",
          marginTop: "8px",
          marginLeft: "8px",
        }}
      />
    </div>
  );
}

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}
