import React from 'react';
import Loader from '../../../components/Loader/Loader';
import { DAYS_OF_WEEK } from '../shared/constant';
import dayjs from 'dayjs';
import styles from './styles.module.scss';
import CloudySvg from '../../../assets/icons/CloudySvg';

const WeatherContentV2 = ({ dataWeather, isLoading }) => {
  if (!dataWeather?.days || isLoading) {
    return <Loader />;
  }

  return (
    <div style={{ flex: 1 }}>
      <div className={styles.current}>
        <span>
          {DAYS_OF_WEEK[dayjs(dataWeather.days[0].date).day()]},{' '}
          {dayjs(dataWeather.days[0].date).format('DD MMMM')}
        </span>
        <div className={styles.current_block}>
          <div className={styles.current_row}>
            <p className={styles.current_temperature}>{dataWeather.days[0].temperature_max}°</p>
            <p className={styles.current_temperature}>{dataWeather.days[0].temperature_min}°</p>
          </div>
          <CloudySvg scale={3} />
        </div>
      </div>
    </div>
  );
};

export default WeatherContentV2;
