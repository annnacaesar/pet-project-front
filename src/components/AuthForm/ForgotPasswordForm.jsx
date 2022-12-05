import { useState } from 'react';
import { useForgotPasswordMutation } from 'redux/fetchUser';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import { InputFormik } from 'components/UI/Input';
import scss from './AuthForm.module.scss';
import {Button} from 'components/UI/Button';
import { user } from 'services';
import FormComponent from 'components/UI/FormComponent';
import TitleModal from 'components/UI/TitleModal';
import {ButtonContainer} from 'components/UI/ButtonContainer';
import ErrorMessageInForm from 'components/UI/ErrorMessageInForm';
import RedirectAuth from 'components/UI/RedirectAuth';
import ModalContainer from 'components/UI/ModalContainer';

const initialValues = {
	email: '',
};

export const ForgotPasswordForm = props => {
	const { t } = useTranslation();
	const [forgotPassword] = useForgotPasswordMutation();
	const [isError, setIsError] = useState(null);
	const [isSuccess, setIsSuccess] = useState(false);

	const handleSubmit = async (formData, { resetForm }) => {
		const { error } = await forgotPassword(formData);
		if (error) {
			console.log('error send email', error);
			setIsError({
				message: error.data.message,
				additionalInfo: error.data.additionalInfo,
			});
			resetForm();
		} else {
			console.log('success send email');
			setIsSuccess(true);
		}
	};

	return (
		<div className={scss.container}>
			<ModalContainer>
				<Formik
					validationSchema={user.emailValidationSchema}
					initialValues={initialValues}
					onSubmit={handleSubmit}
				>
					{() => (
						<FormComponent>
							{!isSuccess ? (
								<>
									<TitleModal title={props.title} />

									<InputFormik
										autofocus="autofocus"
										name="email"
										type="email"
										placeholder="Email"
										autoComplete="off"
										customStyleWrapper={
											scss.input__wrapper_last
										}
									/>

									<ButtonContainer>
										<Button
											type="submit"
											buttonName={t('Confirm')}
										/>
									</ButtonContainer>

									{isError && (
										<ErrorMessageInForm
											message={isError.message}
										/>
									)}
								</>
							) : (
								<TitleModal
									title={t(
										'Your password change notification has been sent.'
									)}
								/>
							)}

							<RedirectAuth
								path="/register"
								pathName={t('Register')}
								answer={t('no accaunt?')}
							/>
						</FormComponent>
					)}
				</Formik>
			</ModalContainer>
		</div>
	);
};
