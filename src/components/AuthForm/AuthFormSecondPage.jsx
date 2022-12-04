import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import useSound from 'use-sound';
import scss from './AuthForm.module.scss';
import scssInput from '../UI/Input/Input.module.scss';
import scssButton from '../UI/Button/Button.module.scss';
import {Button} from 'components/UI/Button';
import { user } from 'services';
import dogsound from 'sounds/00990.mp3';
import { InputFormik } from 'components/UI/Input/Input';
import {ButtonContainer} from 'components/UI/ButtonContainer';
import RedirectAuth from 'components/UI/RedirectAuth';
import FormComponent from 'components/UI/FormComponent';
import TitleModal from 'components/UI/TitleModal';
import ModalContainer from 'components/UI/ModalContainer';

export const AuthFormSecondPage = props => {
	const { t } = useTranslation();
	const handleSubmit = values => {
		props.next(values, true);
	};
	const [play] = useSound(dogsound);
	return (
		<div className={scss.container}>
			<ModalContainer>
				<Formik
					validationSchema={user.stepTwoValidationSchema}
					initialValues={props.data}
					onSubmit={handleSubmit}
				>
					{({ values }) => (
						<FormComponent>
							<TitleModal title={props.title} />

							<InputFormik
								autofocus="autofocus"
								name="name"
								type="name"
								placeholder="Name"
							/>

							<InputFormik
								placeholder="City, region"
								name="city"
								type="city"
							/>

							<InputFormik
								name="phone"
								type="phone"
								placeholder="Mobile phone"
								customStyleWrapper={
									scssInput.input__wrapper_last
								}
							/>

							<ButtonContainer>
								<Button
									type="submit"
									customStyle={scssButton.button__auth_first}
									onClick={play}
									buttonName={t('Register')}
									disabled={props.isLoading}
								/>
								<Button
									onClick={() => props.prev(values)}
									customStyle={scssButton.button__auth_last}
									buttonName={t('Back')}
								/>
							</ButtonContainer>

							<RedirectAuth
								path="/login"
								answer={t('Already have an account?')}
								pathName={t('Login')}
							/>
						</FormComponent>
					)}
				</Formik>
			</ModalContainer>
		</div>
	);
};
