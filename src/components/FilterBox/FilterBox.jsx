import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import Select from 'react-select';
import toast from 'react-hot-toast';

import { selectAllCars } from '../../redux/filters/selectors';
import { getAllCarsThunk } from '../../redux/filters/operations';
import { filterCars, resetFilter } from '../../redux/filters/slice';
import { makeFilterOptions } from '../../utilities/makeFilterOptions';
import { priceFilterOptions } from '../../utilities/priceFilterOptions';

const FilterBox = () => {
  const dispatch = useDispatch();
  const allCars = useSelector(selectAllCars);

  useEffect(() => {
    if (allCars.length === 0) {
      dispatch(getAllCarsThunk());
    }
  }, [allCars.length, dispatch]);

  const makeOptions = makeFilterOptions(allCars);
  const priceOptions = priceFilterOptions(allCars);

  const handleSubmit = values => {
    const { makeFilter, maxPrice, minMileage, maxMileage } = values;

    const filteredValues = {
      makeFilter: makeFilter ? makeFilter.value : null,
      maxPrice: maxPrice ? maxPrice.value : null,
      minMileage: minMileage ? parseInt(minMileage, 10) : '',
      maxMileage: maxMileage ? parseInt(maxMileage, 10) : '',
    };

    dispatch(filterCars(filteredValues));

    const filteredCars = allCars.filter(car => {
      const matchesMake = filteredValues.makeFilter
        ? car.make === filteredValues.makeFilter
        : true;
      const rentalPrice = parseInt(car.rentalPrice.replace('$', ''), 10);
      const matchesMaxPrice =
        filteredValues.maxPrice !== null
          ? rentalPrice <= filteredValues.maxPrice
          : true;
      const matchesMileage =
        (filteredValues.minMileage === '' ||
          car.mileage >= filteredValues.minMileage) &&
        (filteredValues.maxMileage === '' ||
          car.mileage <= filteredValues.maxMileage);

      return matchesMake && matchesMaxPrice && matchesMileage;
    });

    if (filteredCars.length === 0) {
      toast.error('No cars were found', {
        duration: 3000,
      });
      dispatch(resetFilter());
    } else {
      toast.success(`${filteredCars.length} car(s) found!`, {
        duration: 3000,
      });
    }
  };

  return (
    <Formik
      initialValues={{
        makeFilter: null,
        maxPrice: null,
        minMileage: '',
        maxMileage: '',
      }}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form>
          <div>
            <label htmlFor="makeFilter">Car brand</label>
            <Field name="makeFilter">
              {({ field }) => (
                <Select
                  options={makeOptions}
                  name="makeFilter"
                  placeholder="Enter the text"
                  onChange={option => setFieldValue(field.name, option)}
                  value={field.value}
                  isClearable
                />
              )}
            </Field>
          </div>

          <div>
            <label htmlFor="maxPrice">Price/ 1 hour</label>
            <Field name="maxPrice">
              {({ field }) => (
                <Select
                  options={priceOptions}
                  name="maxPrice"
                  placeholder="To $"
                  onChange={option => setFieldValue(field.name, option)}
                  value={field.value}
                  isClearable
                />
              )}
            </Field>
          </div>

          <div>
            <p>Сar mileage / km</p>
            <div>
              <label htmlFor="minMileage"></label>
              <Field name="minMileage">
                {({ field }) => (
                  <input
                    type="number"
                    placeholder="From"
                    {...field}
                    value={field.value || ''}
                  />
                )}
              </Field>
            </div>
            <div>
              <label htmlFor="maxMileage"></label>
              <Field name="maxMileage">
                {({ field }) => (
                  <input
                    type="number"
                    placeholder="To"
                    {...field}
                    value={field.value || ''}
                  />
                )}
              </Field>
            </div>
          </div>

          <button type="submit">Search</button>
        </Form>
      )}
    </Formik>
  );
};

export default FilterBox;
