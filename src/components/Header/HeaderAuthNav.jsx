import Header from './Header';
import Logo from './Logo';
import Navigations from './Navigations';
import styleLogo from './Logo.module.scss';

const HeaderAuthNav = () => {
  return (
    <>
      <Header>
        <Logo styleProp={styleLogo.logo} />
        <Navigations />
      </Header>
    </>
  );
};

export default HeaderAuthNav;
