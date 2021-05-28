import React from "react";
import styled from "@emotion/styled";

import { H2 } from "components/lib/typography";

function CardActivity() {
  return (
    <Container>
      <H2>Activity</H2>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-area: activity;
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.colors.rust};
`;
export default CardActivity;
