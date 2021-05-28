import React from "react";
import styled from "@emotion/styled";

function CardActivity() {
  return <Container></Container>;
}

const Container = styled.div`
  display: grid;
  grid-area: activity;
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.colors.rust};
`;
export default CardActivity;
