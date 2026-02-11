import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

const WeatherApp = () => {
  const [dataWeather, setDataWeather] = useState(null);

  useEffect(() => {
    const fetchFn = async () => {
      const response = await fetch(
        '/nominatim/search?q=Moscow&format=json&limit=1'
      );
      const dataFetch = await response.json();

      const url = `https://api.open-meteo.com/v1/forecast?latitude=${dataFetch[0].lat}&longitude=${dataFetch[0].lon}&daily=weathercode,temperature_2m_max,temperature_2m_min `;

      const response2 = await fetch(url);
      const dataFetch2 = await response2.json();

      const days = dataFetch2.daily.time.map((v, i) => ({
        date: dayjs(v).format('DD MMMM YYYY'),
        weathercode: dataFetch2.daily.weathercode[i],
        max: dataFetch2.daily.temperature_2m_max[i],
        min: dataFetch2.daily.temperature_2m_min[i],
      }));

      setDataWeather({ city: dataFetch[0].name, days: days });
    };

    fetchFn();
  }, []);

  useEffect(() => {
    console.log(dataWeather);
  }, [dataWeather]);

  if (!dataWeather) {
    return 'loading';
  }

  return (
    <div className="">
      <h3
        style={{
          border: '1px solid blue',
          width: '150px',
          padding: '10px',
        }}
      >
        {dataWeather.city}
      </h3>
      <div style={{ display: 'flex', gap: '5px', flexDirection: 'column' }}>
        {dataWeather.days.map((v) => (
          <div
            style={{
              border: '1px solid blue',
              width: '150px',
              padding: '10px',
            }}
          >
            <p key={v.date}>{v.date}</p>
            <div>
              <span>{v.min}</span>...<span>{v.max}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherApp;
