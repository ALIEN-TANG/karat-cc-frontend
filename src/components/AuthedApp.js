import React from "react";
import styled from "@emotion/styled";

import Layout from "components/lib/Layout";
import CardOverview from "components/CardOverview";
import CardActivity from "components/CardActivity";

function AuthedApp() {
  return (
    <Layout>
      <DashboardGrid>
        <CardOverview />
        <CardActivity />
      </DashboardGrid>
    </Layout>
  );
}

const DashboardGrid = styled.div`
  display: grid;
  grid-template-areas: "overview" "activity";
  grid-template-rows: 1fr 2fr;
  height: 100%;
  width: 100%;
`;
export default AuthedApp;
