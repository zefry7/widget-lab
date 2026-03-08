import React, { useEffect, useState } from 'react';
import { CITIES, WEATHER_VERSIONS } from '../shared/constant';
import dayjs from 'dayjs';
import { useAppSelector } from '../../../store/store';
import { selectVersion } from '../../../store/slices/weather.slice';

const createQueryParamsWithWeather = (version) => {
  switch (version) {
    case WEATHER_VERSIONS.WeatherV1:
      return 'hourly=weathercode,temperature_2m&forecast_hours=24&timezone=Europe/Moscow';
    case WEATHER_VERSIONS.WeatherV2:
      return 'daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Europe/Moscow';
  }
};

const formatData = (version, data) => {
  switch (version) {
    case WEATHER_VERSIONS.WeatherV1:
      return data.hourly.time.map((v, i) => ({
        date: dayjs(v).format('HH:mm'),
        weathercode: data.hourly.weathercode[i],
        temperature: Math.round(data.hourly.temperature_2m[i]),
      }));
    case WEATHER_VERSIONS.WeatherV2:
      return data.daily.time.map((v, i) => ({
        date: v,
        weathercode: data.daily.weathercode[i],
        temperature_min: Math.round(data.daily.temperature_2m_min[i]),
        temperature_max: Math.round(data.daily.temperature_2m_max[i]),
      }));
  }
};

const useFetchWeather = () => {
  const version = useAppSelector(selectVersion);
  const [selectedCity, setSelectedCity] = useState(CITIES[0]);
  const [dataWeather, setDataWeather] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const fetchFn = async () => {
      try {
        const response = await fetch(`/nominatim/search?q=${selectedCity}&format=json&limit=1`);
        const dataFetch = await response.json();

        const queryParamsWithWeather = createQueryParamsWithWeather(version);

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${dataFetch[0].lat}&longitude=${dataFetch[0].lon}&${queryParamsWithWeather}`;

        const response2 = await fetch(url);
        const dataFetch2 = await response2.json();

        const days = formatData(version, dataFetch2);

        switch (version) {
          case WEATHER_VERSIONS.WeatherV1:
            setDataWeather({
              city: dataFetch[0].name,
              hours: days,
            });
            break;
          case WEATHER_VERSIONS.WeatherV2:
            setDataWeather({
              city: dataFetch[0].name,
              days: days,
            });
            break;
        }
      } catch {}
      setLoading(false);
    };

    fetchFn();
  }, [selectedCity, version]);

  return {
    dataWeather,
    handleSelectedCity: setSelectedCity,
    isLoading,
    city: selectedCity,
  };
};

export default useFetchWeather;
