import React, { useEffect, useState } from 'react';
import { CITIES } from '../shared/constant';
import dayjs from 'dayjs';

const useFetchWeather = () => {
  const [selectedCity, setSelectedCity] = useState(CITIES[0]);
  const [dataWeather, setDataWeather] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFn = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/nominatim/search?q=${selectedCity}&format=json&limit=1`
        );
        const dataFetch = await response.json();

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${dataFetch[0].lat}&longitude=${dataFetch[0].lon}&hourly=weathercode,temperature_2m&forecast_hours=24&timezone=Europe/Moscow`;

        const response2 = await fetch(url);
        const dataFetch2 = await response2.json();

        const days = dataFetch2.hourly.time.map((v, i) => ({
          date: dayjs(v).format('HH:mm'),
          weathercode: dataFetch2.hourly.weathercode[i],
          temperature: Math.round(dataFetch2.hourly.temperature_2m[i]),
        }));

        setDataWeather({
          city: dataFetch[0].name,
          days: days,
        });
      } catch {}
      setLoading(false);
    };

    fetchFn();
  }, [selectedCity]);

  return {
    dataWeather,
    handleSelectedCity: setSelectedCity,
    isLoading,
    city: selectedCity,
  };
};

export default useFetchWeather;
