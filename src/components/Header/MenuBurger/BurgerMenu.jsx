import style from './BurgerMenu.module.scss';

const BurgerMenu = ({ styleProp, children }) => {
  return <div className={styleProp ? style.wraperBurgerMenu : style.hidden}>{children}</div>;
};

export default BurgerMenu;
