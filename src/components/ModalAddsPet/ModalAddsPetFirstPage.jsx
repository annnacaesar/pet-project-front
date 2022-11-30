import { ErrorMessage, Form, Formik } from 'formik';
import PetsIcon from '@mui/icons-material/Pets';
import { useTranslation } from 'react-i18next';
import { InputForm } from 'components/Input';
import scss from './ModalAddsPet.module.scss';
import { pet } from 'services';

export const ModalAddsPetFirstPage = (props) => {
  const { t } = useTranslation();
  const handleSubmit = (values) => {
    props.next(values, true);
  };
  return (
    <div className={scss.container}>
      <button type="button" onClick={props.closeModal} className={scss.btnClose}>
        <PetsIcon />
      </button>
      <h3 className={scss.title}>{t('Add pet')}</h3>
      <div className={scss.wrapForm}>
        <Formik validationSchema={pet.stepOneValidationSchema} initialValues={props.data} onSubmit={handleSubmit}>
          {() => (
            <Form className={scss.formFirst + ' ' + props.customStyle}>
              <label htmlFor="namePet" className={scss.label}>
                {t('Name pet')}
              </label>
              <div className={scss.inputWrapper}>
                <InputForm customStyle={scss.input} name="name" placeholder="Type name pet" />
                <ErrorMessage name="name" className={scss.error} component="p" />
              </div>

              <label htmlFor="dateOfBirth" className={scss.label}>
                {t('Date of birth')}
              </label>
              <div className={scss.inputWrapper}>
                <InputForm customStyle={scss.input} name="dateOfBirth" placeholder="Type date of birth" />
                <ErrorMessage name="dateOfBirth" className={scss.error} component="p" />
              </div>
              <label htmlFor="breed" className={scss.label}>
                {t('Breed')}
              </label>
              <div className={scss.inputWrapperLast}>
                <InputForm customStyle={scss.input_last} name="breed" placeholder="Type breed" />
                <ErrorMessage name="breed" className={scss.error} component="p" />
              </div>
              <div className={scss.btnWrap}>
                <button type="submit" className={scss.buttonFill}>
                  {t('Next')}
                </button>
                <button type="button" className={scss.buttonEmpty} onClick={props.closeModal}>
                  {t('Сancel')}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

// {/* <Button type="submit" className={scss.buttonFill + ' ' + props.customStyle} buttonName="Next"></Button>
//  <Button type="button" className={scss.buttonEmpty} buttonName="Cancel"></Button> */}
