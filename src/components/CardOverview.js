import React from "react";
import styled from "@emotion/styled";

import { H2 } from "components/lib/typography";

function CardOverview() {
  return (
    <Container>
      <Details>
        <H2>Details</H2>
      </Details>
      <Metrics>
        <H2>Metrics</H2>
      </Metrics>
    </Container>
  );
}

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
`;
const Metrics = styled.div`
  grid-area: metrics;
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.colors.brightGreen};
`;
export default CardOverview;
