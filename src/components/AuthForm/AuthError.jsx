import ModalContainer from 'components/UI/ModalContainer';
import RedirectAuth from 'components/UI/RedirectAuth';
import TitleModal from 'components/UI/TitleModal';
import scss from './AuthForm.module.scss';

export const AuthError = ({ error, additionalInfo }) => {
	return (
		<div className={scss.container}>
			<ModalContainer>
				<TitleModal title={error} />

				<RedirectAuth answer={additionalInfo} />
			</ModalContainer>
		 </div> 
	);
};
