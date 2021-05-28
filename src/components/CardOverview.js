import React from "react";
import styled from "@emotion/styled";

function CardOverview() {
  return <Container></Container>;
}

const Container = styled.div`
  display: grid;
  grid-area: overview;
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.colors.sand};
`;
export default CardOverview;
