import client from "./client";

export function getCardDetails(cardId) {
  return client(`api/card/${cardId}`, {
    method: "GET",
  });
}

export function getCardMetrics(cardId) {
  return client(`api/card/${cardId}/metrics`, {
    method: "GET",
  });
}
