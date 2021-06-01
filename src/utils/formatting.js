export function formatCurrency(number) {
  if (typeof number !== "number") {
    return "error";
  }
  return Number(number.toFixed(2)).toLocaleString();
}
