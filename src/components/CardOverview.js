import React from "react";
import styled from "@emotion/styled";
import { useQuery } from "react-query";

import { getCardDetails, getCardMetrics } from "api/card";
import { H2 } from "components/lib/typography";
import { formatCurrency } from "utils/formatting";

const CARD_ID = "9dfb831e-9003-490b-8076-1e5c261da921";
export function getUserCardId() {
  return CARD_ID;
}
function CardOverview() {
  const cardId = getUserCardId();
  const {
    data: card,
    isLoading: loadingDetails,
    isError: detailsErrored,
  } = useQuery("CardDetails", () => getCardDetails(cardId), { retry: false });
  const {
    data: metrics,
    isLoading: loadingMetrics,
    isError: metricsErrored,
  } = useQuery("CardMetrics", () => getCardMetrics(cardId), { retry: false });

  return (
    <Container>
      <Details>
        <H2>Details</H2>
        <Row>
          <Label>Card No.</Label>
          ...
          <Detail>
            {loadingDetails
              ? "loading..."
              : detailsErrored
              ? "card details errored"
              : card.last_four}
          </Detail>
        </Row>
        <Row>
          <Label>Spending Limit</Label>
          ...
          <Detail>
            {loadingDetails
              ? "loading..."
              : detailsErrored
              ? "card details errored"
              : formatCurrency(card.spending_limit)}
          </Detail>
        </Row>
      </Details>
      <Metrics>
        <H2>Metrics</H2>
        <Row>
          <Label>Total Spend</Label>
          ...
          <Detail>
            {loadingMetrics
              ? "loading..."
              : metricsErrored
              ? "card metrics errored"
              : formatCurrency(metrics.total_spend)}
          </Detail>
        </Row>
        <Row>
          <Label>Average Transaction</Label>
          ...
          <Detail>
            {loadingMetrics
              ? "loading..."
              : metricsErrored
              ? "card metrics errored"
              : formatCurrency(metrics.average_transaction)}
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
