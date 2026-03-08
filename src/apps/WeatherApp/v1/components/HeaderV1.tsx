import React from 'react';
import { DAYS_OF_WEEK } from '../../shared/constant';
import dayjs from 'dayjs';
import styles from '../../styles.module.scss';

const HeaderV1 = ({ city }) => {
  return (
    <div className={styles.header_left}>
      <h3 className={styles.header_city}>{city}</h3>
      <span className={styles.header_date}>
        {DAYS_OF_WEEK[dayjs().day()]}, {dayjs().format('DD MMMM')}
      </span>
    </div>
  );
};

export default HeaderV1;
