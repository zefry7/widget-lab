import React, { useState } from 'react';
import style from './style.module.scss';

const Hint = ({ anchorItem, open, content }) => {
  return (
    <div className={style.wrapper}>
      {anchorItem}
      {open && <div className={style.hint}>{content}</div>}
    </div>
  );
};

export default Hint;
