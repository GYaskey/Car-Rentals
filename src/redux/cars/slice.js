import { createSlice } from '@reduxjs/toolkit';
import { getCarsThunk } from './operations';

const initialState = {
  cars: [],
  page: 1,
  isLoading: false,
  error: null,
  showLoadMore: true,
};

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    addPage: state => {
      state.page += 1;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCarsThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCarsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cars = [...state.cars, ...action.payload];
        if (action.payload.length < 12) state.showLoadMore = false;
      })
      .addCase(getCarsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCars, addPage } = carsSlice.actions;
export const carsReducer = carsSlice.reducer;
