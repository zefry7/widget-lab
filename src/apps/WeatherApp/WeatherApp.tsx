import dayjs from 'dayjs';
import { createContext, useCallback, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { CITIES, DAYS_OF_WEEK, WEATHER_VERSIONS } from './shared/constant';
import ClearDaySvg from '../../assets/icons/ClearDaySvg';
import CloudySvg from '../../assets/icons/CloudySvg';
import { LIST_ICONS_WEATHER } from '../../assets/icons/helpers/constants';
import HourlyList from './components/HourlyList/HourlyList';
import Hint from '../../components/Hint/Hint';
import Loader from '../../components/Loader/Loader';
import SettingsIcon from '../../assets/icons/SettingsIcon';
import Settings from './components/Settings/Settings';
import useFetchWeather from './hooks/useFetchWeather';
import WeatherContentV1 from './v1/WeatherContentV1';
import WeatherContentV2 from './v2/WeatherContentV2';

const WeatherApp = () => {
  const [version, setVersion] = useState(WEATHER_VERSIONS.WeatherV2);
  const [openSettings, setOpenSettings] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const { dataWeather, handleSelectedCity, isLoading, city } = useFetchWeather(version);

  const handleChangeTheme = useCallback(() => {
    setIsDarkTheme((v) => !v);
  }, []);

  const hadleSelectedVersion = useCallback((name: WEATHER_VERSIONS) => {
    setVersion(name);
  }, []);

  return (
    <div
      style={{ maxWidth: version === WEATHER_VERSIONS.WeatherV1 ? '300px' : '600px' }}
      className={`${styles.wrapper} ${isDarkTheme ? 'dark-component' : ''}`}
    >
      <div className={styles.header}>
        {version === WEATHER_VERSIONS.WeatherV1 ? (
          <div className={styles.header_left}>
            <h3 className={styles.header_city}>{city}</h3>
            <span className={styles.header_date}>
              {DAYS_OF_WEEK[dayjs().day()]}, {dayjs().format('DD MMMM')}
            </span>
          </div>
        ) : (
          <div className={styles.header_left}>
            <h3 className={styles.header_city}>{city}</h3>
            <span className={styles.header_date}>
              {dayjs(dataWeather?.days?.[0]?.date).format('DD MMMM')} -{' '}
              {dayjs(dataWeather?.days?.[6]?.date).format('DD MMMM')}
            </span>
          </div>
        )}

        <Hint
          anchorItem={
            <SettingsIcon onClick={() => setOpenSettings((v) => !v)} className={styles.header_setting} />
          }
          open={openSettings}
          content={
            <Settings
              handleSelectedCity={handleSelectedCity}
              hadleSelectedVersion={hadleSelectedVersion}
              handleChangeTheme={handleChangeTheme}
            />
          }
        />
      </div>
      {version === WEATHER_VERSIONS.WeatherV1 && (
        <WeatherContentV1 dataWeather={dataWeather} isLoading={isLoading} />
      )}
      {version === WEATHER_VERSIONS.WeatherV2 && (
        <WeatherContentV2 dataWeather={dataWeather} isLoading={isLoading} />
      )}
    </div>
  );
};

export default WeatherApp;
