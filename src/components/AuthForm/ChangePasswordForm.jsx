import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useUpdatePasswordMutation } from 'redux/fetchUser';
import { Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { InputFormik } from 'components/UI/Input';
import scss from './AuthForm.module.scss';
import Button from 'components/UI/Button';
import { user } from 'services';
import InputEye from 'components/UI/InputEye';

const initialValues = {
  password: '',
  confirmPassword: ''
};

export const ChangePasswordForm = (props) => {
  const { t } = useTranslation();
  const [changePassword] = useUpdatePasswordMutation();
  const [isError, setIsError] = useState(null);
  const { id } = useParams();
  const [isSuccess, setIsSuccess] = useState(false);

  const [passwordShow, setPasswordShow] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState(false);

  const togglePassword = () => setPasswordShow((prevState) => !prevState);
  const togglePasswordConfirm = () => setPasswordConfirm((prevState) => !prevState);

  const handleSubmit = async ({ password }, { resetForm }) => {
    setIsSuccess(true);
    const { error } = await changePassword({ password, id });
    if (error) {
      console.log('is error', error);
      setIsError({
        message: error.data.error
      });
      resetForm();
    } else {
      setIsSuccess(true);
    }
  };

  return (
    <div className={scss.container}>
      <Formik validationSchema={user.passwordValidationSchema} initialValues={initialValues} onSubmit={handleSubmit}>
        {() => (
          <Form className={scss.form}>
            {!isSuccess ? (
              <>
                <h2 className={scss.title}>{props.title}</h2>


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
                  <Button type="submit" className={scss.button__auth} buttonName={t('Confirm')}></Button>
                </div>

                {isError && <p className={scss.error__login}>{t('Please, try again')}</p>}
              </>
            ) : (
              <>
                <h2 className={scss.title}>{t('Your password has been changed.')}</h2>
                <p className={scss.redirect__auth}>
                  {t('Please,')}
                  <Link to="/login" className={scss.redirect_link__auth}>
                    {t('Login')}
                  </Link>
                </p>
              </>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};
