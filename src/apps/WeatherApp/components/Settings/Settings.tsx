import React, { FC } from 'react';
import Dropdown from '../../../../components/Dropdown/Dropdown';
import { CITIES, WEATHER_VERSION_NAMES } from '../../shared/constant';
import styles from './styles.module.scss';

interface SettingsProps {
  handleSelectedCity: (name: string) => void;
  hadleSelectedVersion: (name: string) => void;
  handleChangeTheme: () => void;
}

const Settings: FC<SettingsProps> = ({ handleSelectedCity, hadleSelectedVersion, handleChangeTheme }) => {
  return (
    <div className={styles.wrapper}>
      <Dropdown label="Город" list={CITIES} onSelect={handleSelectedCity} />
      <Dropdown label="Вариант" list={WEATHER_VERSION_NAMES} onSelect={hadleSelectedVersion} />
      <p>Тема</p>
      <button onClick={handleChangeTheme}>Поменять</button>
    </div>
  );
};

export default Settings;
