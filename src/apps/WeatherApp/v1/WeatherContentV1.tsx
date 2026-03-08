import React from 'react';
import Loader from '../../../components/Loader/Loader';
import styles from '../styles.module.scss';
import CloudySvg from '../../../assets/icons/CloudySvg';
import HourlyList from '../components/HourlyList/HourlyList';

const WeatherContentV1 = ({ dataWeather, isLoading }) => {
  if (!dataWeather?.hours || isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div
        style={{
          padding: '16px 0',
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <span className={styles.temperature}>{dataWeather?.hours[0]?.temperature}°</span>
        <CloudySvg scale={3} />
      </div>
      <HourlyList dataWeather={dataWeather} />
    </>
  );
};

export default WeatherContentV1;
