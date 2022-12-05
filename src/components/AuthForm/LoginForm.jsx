import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogInMutation } from 'redux/fetchUser';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import useSound from 'use-sound';
import { InputFormik } from 'components/UI/Input';
import {Button} from 'components/UI/Button';
import InputEye from 'components/UI/InputEye';
import RedirectAuth from 'components/UI/RedirectAuth';
import FormComponent from 'components/UI/FormComponent';
import TitleModal from 'components/UI/TitleModal';
import ErrorMessageInForm from 'components/UI/ErrorMessageInForm';
import {ButtonContainer} from 'components/UI/ButtonContainer';
import scss from './AuthForm.module.scss';
import scssInput from '../UI/Input/Input.module.scss';
import scssRedirect from '../UI/RedirectAuth/RedirectAuth.module.scss';
import { user } from 'services';
import dogsound from 'sounds/00990.mp3';
import ModalContainer from 'components/UI/ModalContainer';

const initialValues = {
	email: '',
	password: '',
};

export const LoginForm = props => {
	const [login] = useLogInMutation();
	const [isError, setIsError] = useState(null);
	const [passwordShow, setPasswordShow] = useState(false);
	const navigate = useNavigate();
	const [play] = useSound(dogsound);
	const { t } = useTranslation();

	const togglePassword = () => setPasswordShow(prevState => !prevState);

	const handleSubmit = async (formData, { resetForm }) => {
		const { error } = await login(formData);
		if (error) {
			setIsError({
				message: error.data.message,
				additionalInfo: error.data.additionalInfo,
			});
			resetForm();
		} else {
			navigate('/user');
		}
	};

	return (
		<div className={scss.container}>
			<ModalContainer>
				<Formik
					validationSchema={user.loginValidationSchema}
					initialValues={initialValues}
					onSubmit={handleSubmit}
				>
					{() => (
						<FormComponent>
							<TitleModal title={props.title} />

							<InputFormik
								autofocus="autofocus"
								name="email"
								type="email"
								placeholder="Email"
								autoComplete="off"
							/>

							<InputFormik
								name="password"
								type={passwordShow ? 'text' : 'password'}
								placeholder="Password"
								customStyleError={scss.error__password}
								customStyleWrapper={
									scssInput.input__wrapper_last
								}
							>
								<InputEye
									onClick={togglePassword}
									passwordShow={passwordShow}
								/>
							</InputFormik>

							<ButtonContainer>
								<Button
									type="submit"
									buttonName={t('Login')}
									onClick={play}
								/>
							</ButtonContainer>

							{isError && (
								<ErrorMessageInForm message={isError.message} />
							)}
							{isError && (
								<ErrorMessageInForm
									message={isError.additionalInfo}
								/>
							)}

							<RedirectAuth
								path="/register"
								pathName={t('Register')}
								answer={t('no accaunt?')}
							/>
							<RedirectAuth
								customStyle={scssRedirect.redirect__auth_second}
								path="/forgot-password"
								pathName={t('Forgot password?')}
							/>
						</FormComponent>
					)}
				</Formik>
			</ModalContainer>
		</div>
	);
};
