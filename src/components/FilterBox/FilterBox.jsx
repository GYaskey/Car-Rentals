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
import s from './FilterBox.module.css';
import clsx from 'clsx';

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
        <Form className={s.form}>
          <div className={s.filterContainer}>
            <div className={s.makeFilter}>
              <label htmlFor="makeFilter" className={s.selectLabel}>
                Car brand
              </label>
              <Field name="makeFilter">
                {({ field }) => (
                  <Select
                    className={clsx(s.customSelect, s.makeSelect)}
                    classNamePrefix="react-select"
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

            <div className={s.priceFilter}>
              <label htmlFor="maxPrice" className={s.selectLabel}>
                Price / 1 hour
              </label>
              <Field name="maxPrice">
                {({ field }) => (
                  <Select
                    className={clsx(s.customSelect, s.priceSelect)}
                    classNamePrefix="react-select"
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

            <div className={s.mileageContainer}>
              <p className={s.mileageLabel}>Сar mileage / km</p>
              <div className={s.mileageInputs}>
                <div className={s.mileageInput}>
                  <Field name="minMileage">
                    {({ field }) => (
                      <div className={s.inputWrapper}>
                        <span className={s.inputLabel}>From</span>
                        <input
                          className={clsx(s.input, s.minInput)}
                          type="number"
                          {...field}
                          value={field.value || ''}
                        />
                      </div>
                    )}
                  </Field>
                </div>
                <div className={s.mileageInput}>
                  <Field name="maxMileage">
                    {({ field }) => (
                      <div className={s.inputWrapper}>
                        <span className={s.inputLabel}>To</span>
                        <input
                          className={clsx(s.input, s.maxInput)}
                          type="number"
                          {...field}
                          value={field.value || ''}
                        />
                      </div>
                    )}
                  </Field>
                </div>
              </div>
            </div>
          </div>

          <button className={s.submitButton} type="submit">
            Search
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FilterBox;
