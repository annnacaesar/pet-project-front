import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PetsIcon from '@mui/icons-material/Pets';
import BurgerMenu from './MenuBurger/BurgerMenu';
import UpperBlock from './MenuBurger/UpperBlock';
import CenterBlock from './MenuBurger/CenterBlock';
import BottomBlock from './MenuBurger/BottomBlock';
import styleLogo from './Logo.module.scss';
import styleNavigation from './Navigations.module.scss';
import stylesMenuBurger from './MenuBurger/BurgerMenu.module.scss';
import { useSelector } from 'react-redux';
import { selectors } from '../../redux/selectors';
import { Trans, withTranslation } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import ChangeLanguage from 'components/ChangeLanguage';
import ChangeTheme from 'components/ChangeTheme';

const styleObjForHeaderMenuAndBurgerMenu = {
  styleNavigation,
  stylesMenuBurger,
  styleLogo
};

const link = [
  { to: '/news', text: 'news' },
  { to: '/notices', text: 'Find pet' },
  { to: '/friends', text: 'Friends' }
];

const linkAuth = [
  { to: '/login', text: 'Login' },
  { to: '/register', text: 'register' }
];

const Navigations = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const [isUser, setIsUser] = useState(false);

  const isUser = useSelector(selectors.isLogged);

  const { t } = useTranslation();

  let location = useLocation();

  return (
    <>
      {/* navigation on wab */}
      <div className={styleNavigation.navigationLinkWrapper}>
        {link.map((el) => (
          <NavLink
            key={Math.random()}
            to={el.to}
            className={location.pathname === el.to ? `${styleNavigation.navigationLink} ${styleNavigation.active}` : styleNavigation.navigationLink}
          >
            <Trans i18nKey={`${el.text}`}>
              <span>{el.text}</span>
            </Trans>
          </NavLink>
        ))}
      </div>
      <ChangeTheme />
      <ChangeLanguage />
      {/* navigation for registration */}
      {!isUser ? (
        <div className={styleNavigation.buttonLinkWrapp}>
          {linkAuth.map((el) => (
            <NavLink
              key={Math.random()}
              to={el.to}
              className={location.pathname === el.to ? `${styleNavigation.buttonlink} ${styleNavigation.active}` : styleNavigation.buttonlink}
            >
              <Trans i18nKey={`${el.text}`}>
                <span>{el.text}</span>
              </Trans>
            </NavLink>
          ))}
        </div>
      ) : (
        <NavLink to="/user" className={styleNavigation.buttonlinkUser}>
          <AccountCircleIcon sx={{ fontSize: 28, marginRight: '12px' }} />
          <span>{t('Account')}</span>
        </NavLink>
      )}

      <div className={styleNavigation.burgerPetsIcon} onClick={() => setIsOpen((prev) => !prev)}>
        <PetsIcon sx={{ fontSize: 40 }} />
      </div>
      {/* burger menu */}
      <BurgerMenu styleProp={isOpen}>
        <UpperBlock styleProp={styleObjForHeaderMenuAndBurgerMenu} isOpen={setIsOpen} />
        {!isUser ? (
          <CenterBlock styleProp={styleObjForHeaderMenuAndBurgerMenu} isOpen={setIsOpen} />
        ) : (
          <NavLink to="/user" className={styleNavigation.buttonlinkMenuBurgerUser} onClick={() => setIsOpen((prev) => !prev)}>
            <AccountCircleIcon sx={{ fontSize: 28, marginRight: '12px' }} />
            <span>{t('Account')}</span>
          </NavLink>
        )}

        <BottomBlock styleProp={styleObjForHeaderMenuAndBurgerMenu} isOpen={setIsOpen} />
      </BurgerMenu>
    </>
  );
};

export default withTranslation()(Navigations);
