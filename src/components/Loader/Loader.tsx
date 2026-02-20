import React from 'react';
import styled from './styles.module.scss';

const Loader = () => {
  return (
    <div className={styled.wrapper}>
      <div className={styled.loader}></div>
    </div>
  );
};

export default Loader;
