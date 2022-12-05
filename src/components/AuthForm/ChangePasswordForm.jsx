import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUpdatePasswordMutation } from 'redux/fetchUser';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { InputFormik } from 'components/UI/Input';
import scss from './AuthForm.module.scss';
import scssInput from '../UI/Input/Input.module.scss';
import {Button} from 'components/UI/Button';
import { user } from 'services';
import InputEye from 'components/UI/InputEye';
import FormComponent from 'components/UI/FormComponent';
import TitleModal from 'components/UI/TitleModal';
import {ButtonContainer} from 'components/UI/ButtonContainer';
import RedirectAuth from 'components/UI/RedirectAuth';
import ErrorMessageInForm from 'components/UI/ErrorMessageInForm';
import ModalContainer from 'components/UI/ModalContainer';

const initialValues = {
	password: '',
	confirmPassword: '',
};

export const ChangePasswordForm = props => {
	const { t } = useTranslation();
	const [changePassword] = useUpdatePasswordMutation();
	const [isError, setIsError] = useState(null);
	const { id } = useParams();
	const [isSuccess, setIsSuccess] = useState(false);

	const [passwordShow, setPasswordShow] = useState(false);
	const [passwordConfirm, setPasswordConfirm] = useState(false);

	const togglePassword = () => setPasswordShow(prevState => !prevState);
	const togglePasswordConfirm = () =>
		setPasswordConfirm(prevState => !prevState);

	const handleSubmit = async ({ password }, { resetForm }) => {
		setIsSuccess(true);
		const { error } = await changePassword({ password, id });
		if (error) {
			console.log('is error', error);
			setIsError({
				message: error.data.error,
			});
			resetForm();
		} else {
			setIsSuccess(true);
		}
	};

	return (
		<div className={scss.container}>
			<ModalContainer>
				<Formik
					validationSchema={user.passwordValidationSchema}
					initialValues={initialValues}
					onSubmit={handleSubmit}
				>
					{() => (
						<FormComponent>
							{!isSuccess ? (
								<>
									<TitleModal title={props.title} />

									<InputFormik
										name="password"
										type={
											passwordShow ? 'text' : 'password'
										}
										placeholder="Password"
										customStyleError={scss.error__password}
									>
										<InputEye
											onClick={togglePassword}
											passwordShow={passwordShow}
										/>
									</InputFormik>

									<InputFormik
										name="confirmPassword"
										type={
											passwordConfirm
												? 'text'
												: 'password'
										}
										placeholder="Confirm Password"
										customStyleWrapper={
											scssInput.input__wrapper_last
										}
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
											buttonName={t('Confirm')}
										/>
									</ButtonContainer>

									{isError && (
										<ErrorMessageInForm
											message={t('Please, try again')}
										/>
									)}
								</>
							) : (
								<>
									<TitleModal
										title={t(
											'Your password has been changed.'
										)}
									/>
									<RedirectAuth
										path="/login"
										pathName={t('Login')}
										answer={t('Please,')}
									/>
								</>
							)}
						</FormComponent>
					)}
				</Formik>
			</ModalContainer>
		</div>
	);
};
