import React, { useEffect, useRef } from 'react';
import styles from './styles.module.scss';
import { LIST_ICONS_WEATHER } from '../../../../assets/icons/helpers/constants';
import useScroll from '../../hooks/useScroll';

const HourlyList = ({ dataWeather }) => {
  const ref = useRef<HTMLDivElement>(null);
  useScroll(ref);

  return (
    <div ref={ref} className={styles.wrapper}>
      {dataWeather.hours.map((v, i) => {
        const Icons = v.weathercode == 3 ? LIST_ICONS_WEATHER[v.weathercode] : LIST_ICONS_WEATHER[0];

        return (
          <div className={`${styles.item} ${i == 0 ? styles.item_active : ''}`} key={v.date}>
            <p className={styles.item_date}>{v.date}</p>
            <Icons />
            <span className={styles.item_t}>{v.temperature}°</span>
          </div>
        );
      })}
    </div>
  );
};

export default HourlyList;
