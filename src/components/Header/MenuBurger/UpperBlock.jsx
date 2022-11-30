import PetsIcon from '@mui/icons-material/Pets';
import Logo from '../Logo';


const UpperBlock = ({ styleProp, isOpen }) => {
  return (
    <>
      <div className={styleProp.stylesMenuBurger.upperBlock}>
        <div>
          <Logo styleProp={styleProp.styleLogo.logoMenuBurger} />
        </div>

        <div onClick={() => isOpen((prev) => !prev)}>
          <PetsIcon sx={{ fontSize: 40 }} />
        </div>
      </div>
    </>
  );
};

export default UpperBlock;
