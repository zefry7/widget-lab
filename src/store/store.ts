import { configureStore, createAction, createReducer } from '@reduxjs/toolkit';
import weatherSlice from './slices/weather.slice';
import { useDispatch, useSelector } from 'react-redux';
import { WEATHER_VERSIONS } from '../apps/WeatherApp/shared/constant';

const store = configureStore({
  reducer: {
    [weatherSlice.name]: weatherSlice.reducer,
  },
});

export const useAppSelector = useSelector.withTypes<ReturnType<typeof store.getState>>();

export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();

export default store;
