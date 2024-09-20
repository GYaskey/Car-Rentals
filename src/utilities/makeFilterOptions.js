export const makeFilterOptions = allCars => {
  const uniqueMakes = [...new Set(allCars.map(car => car.make))];

  const options = uniqueMakes.map(make => ({
    value: make,
    label: make,
  }));

  return [{ value: null, label: 'All' }, ...options];
};
