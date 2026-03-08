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
import { useAppDispatch, useAppSelector } from '../../store/store';
import { selectVersion, setVersion } from '../../store/slices/weather.slice';
import HeaderV1 from './v1/components/HeaderV1';
import HeaderV2 from './v2/components/HeaderV2';

const CONFIGURATE_WEATHER_APP = {
  [WEATHER_VERSIONS.WeatherV1]: {
    content: WeatherContentV1,
    header: HeaderV1,
    maxWidth: '300px',
  },
  [WEATHER_VERSIONS.WeatherV2]: {
    content: WeatherContentV2,
    header: HeaderV2,
    maxWidth: '600px',
  },
};

const WeatherApp = () => {
  const dispatch = useAppDispatch();
  const version = useAppSelector(selectVersion);

  const [openSettings, setOpenSettings] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const { dataWeather, handleSelectedCity, isLoading, city } = useFetchWeather();

  const handleChangeTheme = useCallback(() => {
    setIsDarkTheme((v) => !v);
  }, []);

  const hadleSelectedVersion = useCallback((name: WEATHER_VERSIONS) => {
    dispatch(setVersion(name));
  }, []);

  const Header = CONFIGURATE_WEATHER_APP[version].header;
  const Content = CONFIGURATE_WEATHER_APP[version].content;

  return (
    <div
      style={{ maxWidth: CONFIGURATE_WEATHER_APP[version].maxWidth }}
      className={`${styles.wrapper} ${isDarkTheme ? 'dark-component' : ''}`}
    >
      <div className={styles.header}>
        <Header city={city} dataWeather={dataWeather} />
        <Hint
          open={openSettings}
          anchorItem={
            <SettingsIcon onClick={() => setOpenSettings((v) => !v)} className={styles.header_setting} />
          }
          content={
            <Settings
              handleSelectedCity={handleSelectedCity}
              hadleSelectedVersion={hadleSelectedVersion}
              handleChangeTheme={handleChangeTheme}
            />
          }
        />
      </div>
      <Content dataWeather={dataWeather} isLoading={isLoading} />
    </div>
  );
};

export default WeatherApp;
