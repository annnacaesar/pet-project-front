import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link, useParams } from 'react-router-dom';
import { useUpdatePasswordMutation } from 'redux/fetchUser';
import { ErrorMessage, Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { InputForm } from 'components/Input';
import scss from './AuthForm.module.scss';
import Button from 'components/Button';
import { user } from 'services';

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
                <div className={scss.input__wrapper}>
                  <InputForm name="password" type={passwordShow ? 'text' : 'password'} placeholder="Password" />
                  <span id="visibilityBtn" className={scss.IconPassword} onClick={togglePassword}>
                    {passwordShow ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </span>
                  <ErrorMessage name="password" component="p" className={scss.error__password} />
                </div>
                <div className={scss.input__wrapper_last}>
                  <InputForm name="confirmPassword" type={passwordConfirm ? 'text' : 'password'} placeholder="Confirm Password" />
                  <span id="visibilityBtn" className={scss.IconPassword} onClick={togglePasswordConfirm}>
                    {passwordConfirm ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </span>
                  <ErrorMessage name="confirmPassword" component="p" className={scss.error__password} />
                </div>

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
