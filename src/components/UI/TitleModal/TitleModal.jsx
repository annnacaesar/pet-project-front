import scss from './TitleModal.module.scss';

const TitleModal = ({ customStyle, title }) => {
	return <h2 className={`${scss.title} ${customStyle}`}>{title}</h2>;
};

export default TitleModal;
