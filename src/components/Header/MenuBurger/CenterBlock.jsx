import { NavLink } from 'react-router-dom';
// import { Trans, withTranslation } from 'react-i18next';
import { useTranslation } from 'react-i18next';

// const linkAuth = [
//   { to: '/login', text: 'Login' },
//   { to: '/register', text: 'register' }
// ];

const CenterBlock = ({ styleProp, isOpen }) => {
  const { t } = useTranslation();
  return (
    <div className={styleProp.stylesMenuBurger.centerBlock}>
      <NavLink to="/login" className={styleProp.styleNavigation.buttonlinkMenuBurger} onClick={() => isOpen((prev) => !prev)}>
        {/* <span>Login</span> */}
        <span>{t('Login')}</span>
      </NavLink>
      <NavLink to="/register" className={styleProp.styleNavigation.buttonlinkMenuBurger} onClick={() => isOpen((prev) => !prev)}>
        {/* <span>Registration</span> */}
        <span>{t('register')}</span>
      </NavLink>
    </div>
  );
};

export default CenterBlock;
