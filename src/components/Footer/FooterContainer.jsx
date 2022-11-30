import Container from 'components/Container';
import styleFooter from './FooterContainer.module.scss';

const FooterContainer = ({ children }) => {
  return (
    <footer className={styleFooter.footerSection}>
      <Container>
        <div className={styleFooter.content}>{children}</div>
      </Container>
    </footer>
  );
};

export default FooterContainer;
