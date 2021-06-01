import { rest } from "msw";
import { getUserCardId } from "components/CardOverview";

const cardId = getUserCardId();
const EXAMPLE_CARD_RESPONSE = {
  data: {
    id: "9dfb831e-9003-490b-8076-1e5c261da921",
    number: "1234234534564567",
    last_four: "4567",
    spending_limit: 1000000,
    user: "b70ba059-faf4-4423-b9e5-190066486464",
    UserId: "b70ba059-faf4-4423-b9e5-190066486464",
  },
};
const EXAMPLE_METRICS_RESPONSE = {
  data: { total_spend: 778417.23, average_transaction: 5189.4482 },
};

export const handlers = [
  rest.get(`api/card/${cardId}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(EXAMPLE_CARD_RESPONSE));
  }),
  rest.get(`api/card/${cardId}/metrics`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(EXAMPLE_METRICS_RESPONSE));
  }),
];
