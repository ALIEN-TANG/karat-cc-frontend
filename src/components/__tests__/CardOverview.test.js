import { screen, waitFor } from "@testing-library/react";
import { rest } from "msw";

import { renderWithContextProviders } from "utils/testing";
import CardOverview, { getUserCardId } from "components/CardOverview";
import { server } from "mocks/server";

test(`shows the "Details" and "Metrics" sections`, () => {
  renderWithContextProviders(<CardOverview />, {});
  const details = screen.getByRole("heading", {
    name: /details/i,
  });
  const metrics = screen.getByRole("heading", {
    name: /metrics/i,
  });

  expect(details).toBeInTheDocument();
  expect(metrics).toBeInTheDocument();
});

test(`renders card details`, async () => {
  renderWithContextProviders(<CardOverview />, {});
  const lastFour = await waitFor(() => screen.getByText(/4567/i));
  const spendingLimit = await waitFor(() => screen.getByText(/1,000,000/i));
  expect(lastFour).toBeInTheDocument();
  expect(spendingLimit).toBeInTheDocument();
});

test(`renders card metrics`, async () => {
  renderWithContextProviders(<CardOverview />, {});
  const totalSpend = await waitFor(() => screen.getByText(/778,417\.23/i));
  const averageTransaction = await waitFor(() =>
    screen.getByText(/5,189\.45/i)
  );
  expect(totalSpend).toBeInTheDocument();
  expect(averageTransaction).toBeInTheDocument();
});

/**
    TODO: Debug request handler override
    Expected: mock server returns 500 server error; error text rendered
    Received: mock server returns default 200 response
    Usage examples: 
     - https://mswjs.io/docs/api/setup-server/use
     - https://testing-library.com/docs/react-testing-library/example-intro
 */
xtest(`renders error text`, async () => {
  const cardId = getUserCardId();
  server.use(
    rest.get(`api/card/${cardId}`, (req, res, ctx) => {
      return res.once(
        ctx.status(500),
        ctx.json({ error: { message: "Server Error." } })
      );
    })
  );
  renderWithContextProviders(<CardOverview />, {});
  const errorMessages = await waitFor(() =>
    screen.getAllByText("card details errored")
  );
  expect(errorMessages).toHaveLength(2);
});
