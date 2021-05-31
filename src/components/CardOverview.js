import React from "react";
import styled from "@emotion/styled";
import { useQuery } from "react-query";

import { getCardDetails, getCardMetrics } from "api/card";
import { H2 } from "components/lib/typography";

const CARD_ID = "9dfb831e-9003-490b-8076-1e5c261da921";
function CardOverview() {
  const cardId = CARD_ID;
  const { data: card, isLoading: loadingDetails } = useQuery(
    "CardDetails",
    () => getCardDetails(cardId)
  );
  const { data: metrics, isLoading: loadingMetrics } = useQuery(
    "CardMetrics",
    () => getCardMetrics(cardId)
  );
  return (
    <Container>
      <Details>
        <H2>Details</H2>
        <Row>
          <Label>Card No.</Label>
          ...
          <Detail>{loadingDetails ? "loading..." : card.last_four}</Detail>
        </Row>
        <Row>
          <Label>Spending Limit</Label>
          ...
          <Detail>{loadingDetails ? "loading..." : card.spending_limit}</Detail>
        </Row>
      </Details>
      <Metrics>
        <H2>Metrics</H2>
        <Row>
          <Label>Total Spend</Label>
          ...
          <Detail>{loadingMetrics ? "loading..." : metrics.total_spend}</Detail>
        </Row>
        <Row>
          <Label>Average Transaction</Label>
          ...
          <Detail>
            {loadingMetrics
              ? "loading..."
              : metrics.average_transaction.toFixed(2)}
          </Detail>
        </Row>
      </Metrics>
    </Container>
  );
}

const Label = styled.span``;
const Detail = styled.span``;
const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const Container = styled.div`
  display: grid;
  grid-area: overview;
  width: 100%;
  height: 100%;
  grid-template-areas: "details metrics";
  grid-template-columns: 1fr 1fr;
`;
const Details = styled.div`
  grid-area: details;
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.colors.sand};
  box-sizing: border-box;
  padding: 24px;
`;
const Metrics = styled.div`
  grid-area: metrics;
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.colors.brightGreen};
  box-sizing: border-box;
  padding: 24px;
`;
export default CardOverview;
