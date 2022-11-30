import scss from './InputEye.module.scss';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const InputEye = ({ onClick, passwordShow }) => {
	return (
		<span
			id="visibilityBtn"
			className={scss.icon_password}
			onClick={onClick}
		>
			{passwordShow ? <VisibilityIcon /> : <VisibilityOffIcon />}
		</span>
	);
};

export default InputEye;
