export const calularAvarage = (newPoint, oldPoint, numRating) => {
  return (newPoint + oldPoint * numRating) / (numRating + 1);
};

export const calularTotalProductInCart = (products) => {
  return products.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
};
