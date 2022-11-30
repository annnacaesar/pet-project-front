import { ChangePasswordForm } from 'components/AuthForm/ChangePasswordForm';
import { useTranslation } from 'react-i18next';

const ChangePassword = () => {
  const { t } = useTranslation();
  return (
    <>
      <ChangePasswordForm title={t('Password change')} />
    </>
  );
};

export default ChangePassword;
