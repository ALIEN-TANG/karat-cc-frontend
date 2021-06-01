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
const EXAMPLE_ACTIVITY_RESPONSE = {
  data: [
    {
      CardId: "9dfb831e-9003-490b-8076-1e5c261da921",
      amount: "3648.89",
      card: "9dfb831e-9003-490b-8076-1e5c261da921",
      category: "Music",
      created_at: "2018-12-14T10:27:42.000Z",
      id: "8f2421e5-5704-4cf8-aac1-ebf159c7be2f",
      merchant: "Johnston Inc",
      status: "declined",
    },
    {
      CardId: "9dfb831e-9003-490b-8076-1e5c261da921",
      amount: "5082.60",
      card: "9dfb831e-9003-490b-8076-1e5c261da921",
      category: "Beauty",
      created_at: "2020-08-01T21:24:45.000Z",
      id: "eb2422ba-33eb-4b5e-a877-58edf2a75e65",
      merchant: "Schmidt, Swaniawski and Marks",
      status: "declined",
    },
    {
      CardId: "9dfb831e-9003-490b-8076-1e5c261da921",
      amount: "7113.25",
      card: "9dfb831e-9003-490b-8076-1e5c261da921",
      category: "Garden",
      created_at: "2019-09-25T05:35:49.000Z",
      id: "589e91b7-5504-403f-affa-b278310f359c",
      merchant: "Kerluke-Treutel",
      status: "declined",
    },
  ],
};

export const handlers = [
  rest.get(
    `${process.env.REACT_APP_API_URL}api/card/${cardId}`,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(EXAMPLE_CARD_RESPONSE));
    }
  ),
  rest.get(
    `${process.env.REACT_APP_API_URL}api/card/${cardId}/metrics`,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(EXAMPLE_METRICS_RESPONSE));
    }
  ),
  rest.get(
    `${process.env.REACT_APP_API_URL}api/card/${cardId}/activity`,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(EXAMPLE_ACTIVITY_RESPONSE));
    }
  ),
];
