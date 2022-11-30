import { Link } from 'react-router-dom';
import {Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import useSound from 'use-sound';
import scss from './AuthForm.module.scss';
import Button from 'components/UI/Button';
import scssButton from '../UI/Button/Button.module.scss';
import { user } from 'services';
import dogsound from 'sounds/00990.mp3';
import { InputFormik } from 'components/UI/Input/Input';

export const AuthFormSecondPage = props => {
	const { t } = useTranslation();
	const handleSubmit = values => {
		props.next(values, true);
	};
	const [play] = useSound(dogsound);
	return (
		<div className={scss.container}>
			<Formik
				validationSchema={user.stepTwoValidationSchema}
				initialValues={props.data}
				onSubmit={handleSubmit}
			>
				{({ values }) => (
					<Form className={scss.form}>
						<h2 className={scss.title}>{props.title}</h2>

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
							customStyleWrapper={scss.input__wrapper_last}
						/>

						<div className={scss.button__container}>
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
