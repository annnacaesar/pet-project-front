import scss from './ButtonContainer.module.scss';

const ButtonContainer = ({ customStyle, children }) => {
  return (
    <div className={scss.button__container + ' ' + customStyle}>
      {children}
    </div>
  );
};

const ButtonContainerWrap = ({ customStyle, children }) => {
  return (
    <div className={scss.button__wrap + ' ' + customStyle}>
      {children}
    </div>
  );
};

export  {ButtonContainer,ButtonContainerWrap};
