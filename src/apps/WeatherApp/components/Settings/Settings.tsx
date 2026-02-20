import React, { FC } from 'react';
import Dropdown from '../../../../components/Dropdown/Dropdown';
import { CITIES } from '../../shared/constant';
import styles from './styles.module.scss';

interface SettingsProps {
  handleSelectedCity: (name: string) => void;
  handleChangeTheme: () => void;
}

const Settings: FC<SettingsProps> = ({ handleSelectedCity, handleChangeTheme }) => {
  return (
    <div className={styles.wrapper}>
      <Dropdown label="Город" list={CITIES} onSelect={handleSelectedCity} />
      <p>Вариант:</p>
      <p>Тема</p>
      <button onClick={handleChangeTheme}>Поменять</button>
    </div>
  );
};

export default Settings;
