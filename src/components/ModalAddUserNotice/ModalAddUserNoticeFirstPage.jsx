import { ErrorMessage, Form, Formik, Field } from 'formik';
import PetsIcon from '@mui/icons-material/Pets';
import { InputForm } from 'components/Input';
import scss from './ModalAddUserNotice.module.scss';
import { useTranslation } from 'react-i18next';
import { notice } from 'services';
export const ModalAddUserNoticeFirstPage = (props) => {
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
        <Formik validationSchema={notice.stepOneValidationSchema} initialValues={props.data} onSubmit={handleSubmit}>
          {() => (
            <Form className={scss.form + ' ' + props.customStyle}>
              <p className={scss.text}>Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur</p>

              <div className={scss.btnContainer}>
                <Field className={scss.radioInput} name="category" type="radio" id="lost-found" value="lost-found" />
                <label htmlFor="lost-found" className={scss.label_radio_medium + ' ' + scss.activ}>
                  lost/found
                </label>

                <Field className={scss.radioInput} name="category" type="radio" id="inGoodHands" value="inGoodHands" />
                <label htmlFor="inGoodHands" className={scss.label_radio_big + ' ' + scss.activ}>
                  In good hands
                </label>

                <Field className={scss.radioInput} name="category" type="radio" id="sell" value="sell" />
                <label htmlFor="sell" className={scss.label_radio_small + ' ' + scss.activ}>
                  sell
                </label>
              </div>

              <label htmlFor="title" className={scss.label}>
                {t('Tittle of ad')}
                <span className={scss.mark}>*</span>
              </label>
              <div className={scss.inputWrapper}>
                <InputForm customStyle={scss.input} name="title" type="text" placeholder="Type name" />
                <ErrorMessage name="title" className={scss.error} component="p" />
              </div>

              <label htmlFor="name" className={scss.label}>
                {t('Name pet')}
              </label>
              <div className={scss.inputWrapper}>
                <InputForm customStyle={scss.input} name="name" type="text" placeholder="Type name pet" />
                <ErrorMessage name="name" className={scss.error} component="p" />
              </div>

              <label htmlFor="dateOfBirth" className={scss.label}>
                {t('Date of birth')}
              </label>
              <div className={scss.inputWrapper}>
                <InputForm customStyle={scss.input} name="dateOfBirth" type="text" placeholder="Type date of birth" />
                <ErrorMessage name="dateOfBirth" className={scss.error} component="p" />
              </div>

              <label htmlFor="breed" className={scss.label}>
                {t('Breed')}
              </label>
              <div className={scss.inputWrapperLast}>
                <InputForm customStyle={scss.input_last} name="breed" type="text" placeholder="Type breed" />
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
