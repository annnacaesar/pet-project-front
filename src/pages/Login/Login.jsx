import { LoginForm } from 'components/AuthForm/LoginForm';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t } = useTranslation();
  return (
    <>
      <LoginForm title={t('Login')} />
    </>
  );
};

export default Login;
