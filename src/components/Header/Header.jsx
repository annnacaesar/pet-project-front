import style from './Header.module.scss';
import Container from 'components/UI/Container';
// import ChangeLanguage from 'components/ChangeLanguage';
const Header = ({ children}) => {
  return (
    <div className={style.headerWrap}>
    <Container>
      <header className={style.topGap}>
        {/* <!-- Navbar --> */}
        <nav>
          <div className={style.navWrap}>{children}</div>
          {/* <ChangeLanguage /> */}
        </nav>
      </header>
    </Container>
    </div>
  );
};

export default Header;
