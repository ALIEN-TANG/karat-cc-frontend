import { screen, waitFor } from "@testing-library/react";
import { rest } from "msw";

import { renderWithContextProviders } from "utils/testing";
import CardActivity from "components/CardActivity";
import { getUserCardId } from "components/CardOverview";
import { server } from "mocks/server";

test(`shows the "Activity" section`, () => {
  renderWithContextProviders(<CardActivity />, {});
  const activity = screen.getByRole("heading", {
    name: /activity/i,
  });

  expect(activity).toBeInTheDocument();
});

test(`renders transactions in table`, async () => {
  renderWithContextProviders(<CardActivity />, {});
  const firstRow = await waitFor(() =>
    screen.getByRole("row", {
      name: /johnston inc music 3648\.89 declined 2018\-12\-14/i,
    })
  );
  const secondRow = await waitFor(() =>
    screen.getByRole("row", {
      name: /schmidt, swaniawski and marks beauty 5082\.60 declined 2020\-08\-01/i,
    })
  );
  const thirdRow = await waitFor(() =>
    screen.getByRole("row", {
      name: /kerluke\-treutel garden 7113\.25 declined 2019\-09\-24/i,
    })
  );

  expect(firstRow).toBeInTheDocument();
  expect(secondRow).toBeInTheDocument();
  expect(thirdRow).toBeInTheDocument();
});

test(`renders error message on card activity fetch error`, async () => {
  const cardId = getUserCardId();

  server.use(
    rest.get(
      `${process.env.REACT_APP_API_URL}api/card/${cardId}/activity`,
      (req, res, ctx) => {
        return res.once(
          ctx.status(500),
          ctx.json({ error: { message: "Server Error." } })
        );
      }
    )
  );
  renderWithContextProviders(<CardActivity />, {});
  const errorMessage = await waitFor(() =>
    screen.getByText(
      /a server error occurred\. try refreshing or contact management for assistance\./i
    )
  );
  expect(errorMessage).toBeInTheDocument();
});
