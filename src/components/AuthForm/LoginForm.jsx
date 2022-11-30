import { useState } from 'react';
import { useLogInMutation } from 'redux/fetchUser';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import useSound from 'use-sound';
import { InputFormik } from 'components/UI/Input';
import Button from 'components/UI/Button';
import scss from './AuthForm.module.scss';
import { user } from 'services';

import dogsound from 'sounds/00990.mp3';
import InputEye from 'components/UI/InputEye';

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
			<Formik
				validationSchema={user.loginValidationSchema}
				initialValues={initialValues}
				onSubmit={handleSubmit}
			>
				{() => (
					<Form className={scss.form}>
						<h2 className={scss.title}>{props.title}</h2>

						<InputFormik
							autofocus="autofocus"
							name="email"
							type="email"
							placeholder="Email"
              autoComplete='off'
						/>

						<InputFormik
							name="password"
							type={passwordShow ? 'text' : 'password'}
							placeholder="Password"
							customStyleError={scss.error__password}
						>
							<InputEye
								onClick={togglePassword}
								passwordShow={passwordShow}
							/>
						</InputFormik>

						<div className={scss.button__container}>
							<Button
								type="submit"
								className={scss.button__auth}
								buttonName={t('Login')}
								onClick={play}
							></Button>
						</div>

						{isError && (
							<p className={scss.error__login}>
								{isError.message}
							</p>
						)}
						{isError && (
							<p className={scss.error__login}>
								{isError.additionalInfo}
							</p>
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
						<p className={scss.redirect__auth}>
							<Link
								to="/forgot-password"
								className={scss.redirect_link__auth}
							>
								{t('Forgot password?')}
							</Link>
						</p>
					</Form>
				)}
			</Formik>
		</div>
	);
};
