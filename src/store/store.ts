import { configureStore } from '@reduxjs/toolkit';
import weatherSlice from './slices/weather.slice';

const store = configureStore({
  reducer: {
    [weatherSlice.name]: weatherSlice.reducer,
  },
});

export default store;
