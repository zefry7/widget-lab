import React, { useEffect, useRef } from 'react';
import styles from './styles.module.scss';
import { LIST_ICONS_WEATHER } from '../../../../assets/icons/helpers/constants';

const HourlyList = ({ dataWeather }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isDown = false;
    let scrollLeft = 0;
    let startX = 0;

    const handleMouseDown = (e) => {
      isDown = true;
      startX = e.pageX;
      scrollLeft = ref.current.scrollLeft;
      console.log(e);

      console.log(e.pageX, ref.current.offsetLeft, ref.current.scrollLeft);
    };
    const handleMouseUp = () => {
      isDown = false;
    };
    const handleMouseMove = (e) => {
      e.preventDefault();
      if (isDown) {
        const x = e.pageX;
        const walk = (x - startX) * 2;
        ref.current.scrollLeft = scrollLeft - walk;
      }
    };

    if (ref.current) {
      ref.current.addEventListener('mousedown', handleMouseDown);
      ref.current.addEventListener('mouseup', handleMouseUp);
      ref.current.addEventListener('mouseleave', handleMouseUp);
      ref.current.addEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <div ref={ref} className={styles.wrapper}>
      {dataWeather.days.map((v, i) => {
        const Icons =
          v.weathercode == 3
            ? LIST_ICONS_WEATHER[v.weathercode]
            : LIST_ICONS_WEATHER[0];

        return (
          <div
            className={`${styles.item} ${i == 0 ? styles.item_active : ''}`}
            key={v.date}
          >
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
