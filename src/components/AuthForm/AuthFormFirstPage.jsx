import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import FormComponent from '../UI/FormComponent';
import { InputFormik } from 'components/UI/Input/Input';
import {Button} from 'components/UI/Button';
import scss from './AuthForm.module.scss';
import scssInput from '../UI/Input/Input.module.scss';
import { user } from 'services';
import InputEye from 'components/UI/InputEye';
import {ButtonContainer} from 'components/UI/ButtonContainer';
import RedirectAuth from 'components/UI/RedirectAuth';
import TitleModal from 'components/UI/TitleModal';
import ModalContainer from 'components/UI/ModalContainer';

export const AuthFormFirstPage = props => {
	const { t } = useTranslation();
	const [passwordShow, setPasswordShow] = useState(false);
	const [passwordConfirm, setPasswordConfirm] = useState(false);

	const togglePassword = () => setPasswordShow(prevState => !prevState);
	const togglePasswordConfirm = () =>
		setPasswordConfirm(prevState => !prevState);
	const handleSubmit = values => {
		props.next(values, true);
	};

	return (
		<div className={scss.container}>
			<ModalContainer>

			<Formik
				validationSchema={user.stepOneValidationSchema}
				initialValues={props.data}
				onSubmit={handleSubmit}
			>
				{() => (
					<FormComponent>
						<TitleModal title={props.title} />

						<InputFormik
							autofocus="autofocus"
							name="email"
							type="email"
							placeholder={("Email")}
						/>

						<InputFormik
							name="password"
							type={passwordShow ? 'text' : 'password'}
							placeholder={t("Password")}
							customStyleError={scss.error__password}
						>
							<InputEye
								onClick={togglePassword}
								passwordShow={passwordShow}
							/>
						</InputFormik>

						<InputFormik
							name="confirmPassword"
							type={passwordConfirm ? 'text' : 'password'}
							placeholder={t("Confirm Password")}
							customStyleWrapper={scssInput.input__wrapper_last}
							customStyleError={scss.error__password}
						>
							<InputEye
								onClick={togglePasswordConfirm}
								passwordShow={passwordConfirm}
							/>
						</InputFormik>

						<ButtonContainer>
							<Button
								type="submit"
								buttonName={t('Next')}
							/>
						</ButtonContainer>

						<RedirectAuth
							path="/login"
							pathName={t('Login')}
							answer={t('Already have an account?')}
						/>
					</FormComponent>
				)}
			</Formik>
			</ModalContainer>
		</div>
	);
};
