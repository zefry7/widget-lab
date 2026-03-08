import { createListenerMiddleware, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WEATHER_VERSIONS } from '../../apps/WeatherApp/shared/constant';

const initialState = {
  version: WEATHER_VERSIONS.WeatherV1,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setVersion: (state, action: PayloadAction<WEATHER_VERSIONS>) => {
      state.version = action.payload;
    },
  },
  selectors: {
    selectVersion: (state) => state.version,
  },
});

export const { setVersion } = weatherSlice.actions;

export const { selectVersion } = weatherSlice.selectors;

export default weatherSlice;
