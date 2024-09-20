export const priceFilterOptions = allCars => {
  const minPrice = Math.min(
    ...allCars.map(car => parseInt(car.rentalPrice.replace('$', ''), 10) || 0)
  );
  const maxPrice = Math.max(
    ...allCars.map(car => parseInt(car.rentalPrice.replace('$', ''), 10) || 0)
  );

  const priceOptions = [];
  for (let i = minPrice; i <= maxPrice + 10; i += 10) {
    priceOptions.push({ value: i, label: `$${i}` });
  }

  return priceOptions;
};
