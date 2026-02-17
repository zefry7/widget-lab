import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { DAYS_OF_WEEK } from './shared/constant';

const WeatherApp = () => {
  const [dataWeather, setDataWeather] = useState(null);

  useEffect(() => {
    const fetchFn = async () => {
      const response = await fetch(
        '/nominatim/search?q=Moscow&format=json&limit=1'
      );
      const dataFetch = await response.json();

      const url = `https://api.open-meteo.com/v1/forecast?latitude=${dataFetch[0].lat}&longitude=${dataFetch[0].lon}&hourly=weathercode,temperature_2m&forecast_hours=24&timezone=Europe/Moscow`;

      const response2 = await fetch(url);
      const dataFetch2 = await response2.json();

      const days = dataFetch2.hourly.time.map((v, i) => ({
        date: dayjs(v).format('HH:mm'),
        weathercode: dataFetch2.hourly.weathercode[i],
        temperature: dataFetch2.hourly.temperature_2m[i],
      }));

      setDataWeather({
        city: dataFetch[0].name,
        date: {
          day_code: dayjs(dataFetch2.hourly.time[0]).day(),
          day_and_month: dayjs(dataFetch2.hourly.time[0]).format('DD MMMM'),
        },
        days: days,
      });
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
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.header_left}>
          <h3 className={styles.header_city}>{dataWeather.city}</h3>
          <span className={styles.header_date}>
            {DAYS_OF_WEEK[dataWeather.date.day_code]},{' '}
            {dataWeather.date.day_and_month}
          </span>
        </div>
        <button className={styles.header_setting}>Н</button>
      </div>
      <div>
        <span className={styles.temperature}>
          {dataWeather.days[0].temperature}°
        </span>
      </div>
      <div className={styles.divider} />
      <div style={{ display: 'flex', gap: '8px', overflow: 'scroll' }}>
        {dataWeather.days.map((v, i) => (
          <div
            className={`${styles.item} ${i == 0 ? styles.item_active : ''}`}
            key={v.date}
          >
            <p className={styles.item_date}>{v.date}</p>
            <span>{v.weathercode}</span>
            <span className={styles.item_t}>{v.temperature}°</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherApp;
