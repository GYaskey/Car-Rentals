import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

export const getAllCarsThunk = createAsyncThunk(
  'filters/getAllCars',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('advert');
      return data;
    } catch (error) {
      toast.error('Something went wrong', { duration: 3000 });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
