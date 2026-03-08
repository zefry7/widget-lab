import dayjs from 'dayjs';
import React from 'react';
import styles from '../../styles.module.scss';

const HeaderV2 = ({ city, dataWeather }) => {
  return (
    <div className={styles.header_left}>
      <h3 className={styles.header_city}>{city}</h3>
      <span className={styles.header_date}>
        {dayjs(dataWeather?.days?.[0]?.date).format('DD MMMM')} -{' '}
        {dayjs(dataWeather?.days?.[6]?.date).format('DD MMMM')}
      </span>
    </div>
  );
};

export default HeaderV2;
