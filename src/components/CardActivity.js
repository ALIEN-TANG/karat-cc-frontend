import React, { useMemo } from "react";
import styled from "@emotion/styled";
import { useQuery } from "react-query";
import { useTable, useSortBy } from "react-table";

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
  const data = useMemo(() => transactions, []);
  const columns = useMemo(() => [
    { Header: "Merchant", accessor: "merchant" },
    { Header: "Category", accessor: "category" },
    { Header: "Amount", accessor: "amount" },
    { Header: "Date", accessor: "created_at" },
  ]);
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

function Table({ columns, data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                </span>
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
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
