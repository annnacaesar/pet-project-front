import { Link } from 'react-router-dom';
import { ErrorMessage, Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import useSound from 'use-sound';
import { InputForm } from 'components/Input';
import scss from './AuthForm.module.scss';
import Button from 'components/Button';
import scssButton from '../Button/Button.module.scss';
import { user } from 'services';
import dogsound from 'sounds/00990.mp3';

export const AuthFormSecondPage = (props) => {
  const { t } = useTranslation();
  const handleSubmit = (values) => {
    props.next(values, true);
  };
  const [play] = useSound(dogsound);
  return (
    <div className={scss.container}>
      <Formik validationSchema={user.stepTwoValidationSchema} initialValues={props.data} onSubmit={handleSubmit}>
        {({ values }) => (
          <Form className={scss.form}>
            <h2 className={scss.title}>{props.title}</h2>
            <div className={scss.input__wrapper}>
              <InputForm autofocus="autofocus" name="name" type="name" placeholder="Name" />
              <ErrorMessage name="name" component="p" className={scss.error} />
            </div>
            <div className={scss.input__wrapper}>
              <InputForm placeholder="City, region" name="city" type="city" />
              <ErrorMessage name="city" component="p" className={scss.error} />
            </div>
            <div className={scss.input__wrapper_last}>
              <InputForm name="phone" type="phone" placeholder="Mobile phone" />
              <ErrorMessage name="phone" component="p" className={scss.error} />
            </div>
            <div className={scss.button__container}>
              <Button
                type="submit"
                customStyle={scssButton.button__auth_first}
                onClick={play}
                buttonName={t('Register')}
                disabled={props.isLoading}
              />
              <Button onClick={() => props.prev(values)} customStyle={scssButton.button__auth_last} buttonName={t('Back')} />
            </div>
            <p className={scss.redirect__auth}>
              {t('Already have an account?')}
              <Link to="/login" className={scss.redirect_link__auth}>
                {t('Login')}
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};
