import dayjs from 'dayjs';
import { createContext, useCallback, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { CITIES, DAYS_OF_WEEK } from './shared/constant';
import ClearDaySvg from '../../assets/icons/ClearDaySvg';
import CloudySvg from '../../assets/icons/CloudySvg';
import { LIST_ICONS_WEATHER } from '../../assets/icons/helpers/constants';
import HourlyList from './components/HourlyList/HourlyList';
import Hint from '../../components/Hint/Hint';
import Loader from '../../components/Loader/Loader';
import SettingsIcon from '../../assets/icons/SettingsIcon';
import Settings from './components/Settings/Settings';
import useFetchWeather from './hooks/useFetchWeather';

const WeatherApp = () => {
  const [openSettings, setOpenSettings] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const { dataWeather, handleSelectedCity, isLoading, city } = useFetchWeather();

  const handleChangeTheme = useCallback(() => {
    setIsDarkTheme((v) => !v);
  }, []);

  return (
    <div className={`${styles.wrapper} ${isDarkTheme ? 'dark-component' : ''}`}>
      <div className={styles.header}>
        <div className={styles.header_left}>
          <h3 className={styles.header_city}>{city}</h3>
          <span className={styles.header_date}>
            {DAYS_OF_WEEK[dayjs().day()]}, {dayjs().format('DD MMMM')}
          </span>
        </div>
        <Hint
          anchorItem={
            <SettingsIcon onClick={() => setOpenSettings((v) => !v)} className={styles.header_setting} />
          }
          open={openSettings}
          content={<Settings handleSelectedCity={handleSelectedCity} handleChangeTheme={handleChangeTheme} />}
        />
      </div>
      {!dataWeather || isLoading ? (
        <Loader />
      ) : (
        <>
          <div
            style={{
              padding: '16px 0',
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            <span className={styles.temperature}>{dataWeather.days[0].temperature}°</span>
            <CloudySvg scale={3} />
          </div>
          <HourlyList dataWeather={dataWeather} />
        </>
      )}
    </div>
  );
};

export default WeatherApp;
