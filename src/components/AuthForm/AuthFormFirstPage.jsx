import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Form, Formik } from 'formik';
import { InputFormik } from 'components/UI/Input/Input';
import Button from 'components/UI/Button';
import scss from './AuthForm.module.scss';
import { user } from 'services';
import InputEye from 'components/UI/InputEye';

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
			<Formik
				validationSchema={user.stepOneValidationSchema}
				initialValues={props.data}
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

						<InputFormik
							name="confirmPassword"
							type={passwordConfirm ? 'text' : 'password'}
							placeholder="Confirm Password"
							customStyleWrapper={scss.input__wrapper_last}
							customStyleError={scss.error__password}
						>
							<InputEye
								onClick={togglePasswordConfirm}
								passwordShow={passwordConfirm}
							/>
						</InputFormik>

						<div className={scss.button__container}>
							<Button
								type="submit"
								className={scss.button__auth}
								buttonName={t('Next')}
							></Button>
						</div>

						<p className={scss.redirect__auth}>
							{t('Already have an account?')}
							<Link
								to="/login"
								className={scss.redirect_link__auth}
							>
								{t('Login')}
							</Link>
						</p>
					</Form>
				)}
			</Formik>
		</div>
	);
};
