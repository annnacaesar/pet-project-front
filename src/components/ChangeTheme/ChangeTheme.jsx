import { useTheme } from '../../hooks/useTheme';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import scss from './ChangeTheme.module.scss';

const ChangeTheme = () => {
  const { theme, setTheme } = useTheme();

  const handleClickTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <div>
      <button type="button" onClick={handleClickTheme} className={scss.buttonTheme}>
        {theme === 'light' ? <LightModeIcon /> : <DarkModeIcon />}
      </button>
    </div>
  );
};

export default ChangeTheme;
