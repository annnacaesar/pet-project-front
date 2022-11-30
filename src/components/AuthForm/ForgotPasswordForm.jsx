import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForgotPasswordMutation } from 'redux/fetchUser';
import { useTranslation } from 'react-i18next';
import { Form, Formik } from 'formik';
import { InputFormik } from 'components/UI/Input';
import scss from './AuthForm.module.scss';
import Button from 'components/UI/Button';
import { user } from 'services';

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
			<Formik
				validationSchema={user.emailValidationSchema}
				initialValues={initialValues}
				onSubmit={handleSubmit}
			>
				{() => (
					<Form className={scss.form}>
						{!isSuccess ? (
							<>
								<h2 className={scss.title}>{props.title}</h2>

								<InputFormik
									autofocus="autofocus"
									name="email"
									type="email"
									placeholder="Email"
									autoComplete="off"
                  customStyleWrapper={scss.input__wrapper_last}
								/>

								<div className={scss.button__container}>
									<Button
										type="submit"
										className={scss.button__auth}
										buttonName={t('Confirm')}
									></Button>
								</div>

								{isError && (
									<p className={scss.error__login}>
										{isError.message}
									</p>
								)}
							</>
						) : (
							<h2 className={scss.title}>
								{t(
									'Your password change notification has been sent.'
								)}
							</h2>
						)}

						<p className={scss.redirect__auth}>
							{t('no accaunt?')}
							<Link
								to="/register"
								className={scss.redirect_link__auth}
							>
								{t('Register')}
							</Link>
						</p>
					</Form>
				)}
			</Formik>
		</div>
	);
};
