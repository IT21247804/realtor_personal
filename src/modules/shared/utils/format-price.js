export function formatPrice(price) {
  const numericPrice = Number(price);

  const priceInMillions = numericPrice / 1000000;

  const formattedPrice = priceInMillions.toFixed(1);

  return formattedPrice;
}
