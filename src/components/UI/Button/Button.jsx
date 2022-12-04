import scss from './Button.module.scss';
import PetsIcon from '@mui/icons-material/Pets';
import sprite from 'images/symbol-defs.svg';

const Button = ({
	customStyle,
	buttonName,
	buttonIcon,
	type = 'button',
	onClick,
}) => {
	return (
		<>
			<button
				className={scss.button + ' ' + customStyle}
				type={type}
				onClick={onClick}
			>
				{buttonName}
				{buttonIcon}
			</button>
		</>
	);
};

const ButtonClose = ({ customStyle, onClick }) => {
	return (
		<>
			<button
				className={scss.button__close + ' ' + customStyle}
				type="button"
				onClick={onClick}
			>
				<PetsIcon />
			</button>
		</>
	);
};

const ButtonAddPhoto = ({ customStyle,customStyleLabel, image, valid, children, labelBtn }) => {
	return (
		<>
			<p className={scss.label + ' ' + customStyleLabel}>{labelBtn}</p>
			<button type="button" className={scss.btnAddPhoto + ' ' + customStyle}>
				{!image ? (
					<svg className={scss.crossBig}>
						<use href={sprite + '#icon-blackCross'} />
					</svg>
				) : (
					<img
						className={scss.avatar__img}
						src={image}
						alt="avatar"
					/>
				)}
				{children}
				<p className={scss.error_image}>
					{!valid && 'Image is required'}
				</p>
			</button>
		</>
	);
};

export { Button, ButtonClose, ButtonAddPhoto };
