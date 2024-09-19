import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

axios.defaults.baseURL = 'https://66e962ad87e417609449387c.mockapi.io/';

axios.defaults.params = {
  limit: 12,
};

export const getCarsThunk = createAsyncThunk(
  'cars/getCars',
  async (page, thunkAPI) => {
    try {
      const { data } = await axios.get('advert', { params: { page } });
      return data;
    } catch (error) {
      toast.error('Something went wrong', { duration: 3000 });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
