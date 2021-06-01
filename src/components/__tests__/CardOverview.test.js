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

test(`renders error text when card details error`, async () => {
  const cardId = getUserCardId();
  server.use(
    rest.get(
      `${process.env.REACT_APP_API_URL}api/card/${cardId}`,
      (req, res, ctx) => {
        return res.once(
          ctx.status(500),
          ctx.json({ error: { message: "Server Error." } })
        );
      }
    )
  );
  renderWithContextProviders(<CardOverview />, {});
  const errorMessages = await waitFor(() =>
    screen.getAllByText("card details errored")
  );
  expect(errorMessages).toHaveLength(2);
});

test(`renders error text when card metrics error`, async () => {
  const cardId = getUserCardId();
  server.use(
    rest.get(
      `${process.env.REACT_APP_API_URL}api/card/${cardId}/metrics`,
      (req, res, ctx) => {
        return res.once(
          ctx.status(500),
          ctx.json({ error: { message: "Server Error." } })
        );
      }
    )
  );
  renderWithContextProviders(<CardOverview />, {});
  const errorMessages = await waitFor(() =>
    screen.getAllByText("card metrics errored")
  );
  expect(errorMessages).toHaveLength(2);
});
