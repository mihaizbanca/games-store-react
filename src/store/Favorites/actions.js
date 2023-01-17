export function addToFav(product) {
  return {
    type: "ADD_TO_FAV",
    payload: product,
  };
}

export function removeFromFav(productId) {
  return {
    type: "REMOVE_FROM_FAV",
    payload: productId,
  };
}
