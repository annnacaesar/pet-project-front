import style from './Header.module.scss';
import Container from 'components/Container';
// import ChangeLanguage from 'components/ChangeLanguage';
const Header = ({ children }) => {
  return (
    <Container>
      <header className={style.topGap}>
        {/* <!-- Navbar --> */}
        <nav>
          <div className={style.navWrap}>{children}</div>
          {/* <ChangeLanguage /> */}
        </nav>
      </header>
    </Container>
  );
};

export default Header;
