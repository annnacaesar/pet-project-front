import React from 'react';
import scss from './Container.module.scss';

function Container({ children, customStyle }) {
  return <div className={`${scss.container} ${customStyle}`}>{children}</div>;
}

export default Container;
