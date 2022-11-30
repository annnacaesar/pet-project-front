import { ForgotPasswordForm } from 'components/AuthForm/ForgotPasswordForm';
import { useTranslation } from 'react-i18next';

const ForgotPassword = () => {
  const { t } = useTranslation();
  return (
    <>
      <ForgotPasswordForm title={t('Write your email address, please')} />
    </>
  );
};

export default ForgotPassword;
