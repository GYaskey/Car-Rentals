import { createSlice } from '@reduxjs/toolkit';
import { getAllCarsThunk } from './operations';

const initialState = {
  allCars: [],
  filteredCars: [],
  isLoading: false,
  error: null,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    filterCars: (state, action) => {
      const { makeFilter, maxPrice, minMileage, maxMileage } = action.payload;

      const filtered = state.allCars.filter(car => {
        const matchesMake = makeFilter ? car.make === makeFilter : true;
        const rentalPrice = parseInt(car.rentalPrice.replace('$', ''), 10);
        const matchesMaxPrice =
          maxPrice !== null ? rentalPrice <= maxPrice : true;
        const matchesMileage =
          (minMileage === '' || car.mileage >= minMileage) &&
          (maxMileage === '' || car.mileage <= maxMileage);

        return matchesMake && matchesMaxPrice && matchesMileage;
      });

      if (filtered.length === 0) {
        state.error = 'No cars were found';
      } else {
        state.filteredCars = filtered;
        state.error = null;
      }
    },
    resetFilter: state => {
      state.filteredCars = [];
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAllCarsThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllCarsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allCars = action.payload;
      })
      .addCase(getAllCarsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { filterCars, resetFilter } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
