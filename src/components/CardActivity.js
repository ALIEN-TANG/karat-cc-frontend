import React, { useMemo } from "react";
import styled from "@emotion/styled";
import { useQuery } from "react-query";
import moment from "moment";

import { getCardActivity } from "api/card";
import { H2 } from "components/lib/typography";
import Table from "components/lib/Table";
import { getUserCardId } from "components/CardOverview";

function CardActivity() {
  const cardId = getUserCardId();
  const {
    data: transactions,
    isLoading,
    isError,
  } = useQuery("CardActivity", () => getCardActivity(cardId), { retry: false });
  const data = useMemo(
    () =>
      transactions &&
      transactions.length &&
      transactions.map((transaction) => {
        return {
          ...transaction,
          created_at: moment(transaction.created_at).format("YYYY-MM-DD"),
        };
      }),
    [transactions]
  );
  const columns = useMemo(
    () => [
      { Header: "Merchant", accessor: "merchant" },
      { Header: "Category", accessor: "category" },
      { Header: "Amount", accessor: "amount" },
      { Header: "Status", accessor: "status" },
      { Header: "Date", accessor: "created_at" },
    ],
    []
  );
  return (
    <Container>
      <H2>Activity</H2>
      {isLoading && <span>Loading...</span>}
      {isError && (
        <span>
          A server error occurred. Try refreshing or contact management for
          assistance.
        </span>
      )}
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
