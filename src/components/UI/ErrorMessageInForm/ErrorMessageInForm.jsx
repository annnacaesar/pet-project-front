import scss from './ErrorMessageInForm.module.scss';

const ErrorMessageInForm = ({ customStyle, message }) => {
	return <p className={`${scss.error} ${customStyle}`}>{message}</p>;
};

export default ErrorMessageInForm;
