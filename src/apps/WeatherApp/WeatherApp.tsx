import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { DAYS_OF_WEEK } from './shared/constant';
import ClearDaySvg from '../../assets/icons/ClearDaySvg';
import CloudySvg from '../../assets/icons/CloudySvg';
import { LIST_ICONS_WEATHER } from '../../assets/icons/helpers/constants';
import HourlyList from './components/HourlyList/HourlyList';
import Hint from '../../components/Hint/Hint';
import Loader from '../../components/Loader/Loader';
import Settings from '../../assets/icons/Settings';

const WeatherApp = () => {
  const [openSettings, setOpenSettings] = useState(false);
  const [dataWeather, setDataWeather] = useState(null);

  useEffect(() => {
    const fetchFn = async () => {
      const response = await fetch(
        '/nominatim/search?q=Санкт-Петербург&format=json&limit=1'
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

  return (
    <div className={styles.wrapper}>
      {!dataWeather ? (
        <Loader />
      ) : (
        <>
          {' '}
          <div className={styles.header}>
            <div className={styles.header_left}>
              <h3 className={styles.header_city}>{dataWeather.city}</h3>
              <span className={styles.header_date}>
                {DAYS_OF_WEEK[dataWeather.date.day_code]},{' '}
                {dataWeather.date.day_and_month}
              </span>
            </div>
            <Hint
              anchorItem={
                <Settings
                  onClick={() => setOpenSettings((v) => !v)}
                  className={styles.header_setting}
                />
              }
              open={openSettings}
              content={
                <div>
                  <p>Город:</p>
                  <p>Вариант:</p>
                  <p>Тема:</p>
                </div>
              }
            />
          </div>
          <div
            style={{
              padding: '16px 0',
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            <span className={styles.temperature}>
              {dataWeather.days[0].temperature}°
            </span>
            <CloudySvg scale={3} />
          </div>
          <HourlyList dataWeather={dataWeather} />
        </>
      )}
    </div>
  );
};

export default WeatherApp;
