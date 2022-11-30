import { useState } from 'react';
import { useLogInMutation } from 'redux/fetchUser';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';
import { ErrorMessage, Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import useSound from 'use-sound';
import { InputForm } from 'components/Input';
import Button from 'components/Button';
import scss from './AuthForm.module.scss';
import { user } from 'services';

import dogsound from 'sounds/00990.mp3';

const initialValues = {
  email: '',
  password: ''
};

export const LoginForm = (props) => {
  const [login] = useLogInMutation();
  const [isError, setIsError] = useState(null);
  const [passwordShow, setPasswordShow] = useState(false);
  const navigate = useNavigate();
  const [play] = useSound(dogsound);
  const { t } = useTranslation();

  const togglePassword = () => setPasswordShow((prevState) => !prevState);

  const handleSubmit = async (formData, { resetForm }) => {
    const { error } = await login(formData);
    if (error) {
      setIsError({
        message: error.data.message,
        additionalInfo: error.data.additionalInfo
      });
      resetForm();
    } else {
      navigate('/user');
    }
  };

  return (
    <div className={scss.container}>
      <Formik validationSchema={user.loginValidationSchema} initialValues={initialValues} onSubmit={handleSubmit}>
        {() => (
          <Form className={scss.form}>
            <h2 className={scss.title}>{props.title}</h2>
            <div className={scss.input__wrapper}>
              <InputForm autofocus="autofocus" name="email" type="email" placeholder="Email" autoComplete="off" />
              <ErrorMessage name="email" component="p" className={scss.error} />
            </div>
            <div className={scss.input__wrapper_last}>
              <InputForm name="password" type={passwordShow ? 'text' : 'password'} placeholder="Password" autoComplete="off" />
              <span id="visibilityBtn" className={scss.IconPassword} onClick={togglePassword}>
                {passwordShow ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </span>
              <ErrorMessage name="password" component="p" className={scss.error__password} />
            </div>

            <div className={scss.button__container}>
              <Button type="submit" className={scss.button__auth} buttonName={t('Login')} onClick={play}></Button>
            </div>

            {isError && <p className={scss.error__login}>{isError.message}</p>}
            {isError && <p className={scss.error__login}>{isError.additionalInfo}</p>}
            <p className={scss.redirect__auth}>
              {t('no accaunt?')}
              <Link to="/register" className={scss.redirect_link__auth}>
                {t('Register')}
              </Link>
            </p>
            <p className={scss.redirect__auth}>
              <Link to="/forgot-password" className={scss.redirect_link__auth}>
                {t('Forgot password?')}
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};
