import { useState } from 'react';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import { useTranslation } from 'react-i18next';
import PetsIcon from '@mui/icons-material/Pets';
import { Input, InputForm } from 'components/Input';
import sprite from '../../images/symbol-defs.svg';
import scss from './ModalAddUserNotice.module.scss';
import { notice } from 'services';
import { string } from 'yup';

export const ModalAddUserNoticeSecondPage = (props) => {
  const { t } = useTranslation();
  const [img, setImg] = useState();
  const [valid, setValid] = useState(false);

  const handleSubmit = (values) => {

    props.next(values, true);
    props.closeModal();
  };

  return (
    <div className={scss.container}>
      <button type="button" onClick={props.closeModal} className={scss.btnClose}>
        <PetsIcon />
      </button>
      <h3 className={scss.titleSecond}>{t('Add pet')}</h3>
      <div className={scss.wrapForm}>
        <Formik validationSchema={notice.stepTwoValidationSchema} initialValues={props.data} onSubmit={handleSubmit}>
          {({setFieldValue}) => (
            <Form className={scss.formSecond + ' ' + props.customStyle}>
              <div className={scss.wrapRadio}>
                <p className={scss.textIcon}>
                  {t('The sex')}
                  <span className={scss.mark}>*</span>:
                </p>
                <div className={scss.wrapIcon}>
                  <Field className={scss.radioInput} name="sex" type="radio" id="male" value="male" />
                  <label htmlFor="male" className={scss.labelGender + ' ' + scss.activGender}>
                    <svg className={scss.icon}>
                      <use href={sprite + '#icon-male'} />
                    </svg>
                    {t('Male')}
                  </label>

                  <Field className={scss.radioInput} name="sex" type="radio" id="female" value="female" />
                  <label htmlFor="female" className={scss.labelGender + ' ' + scss.activGender}>
                    <svg className={scss.icon}>
                      <use href={sprite + '#icon-female'} />
                    </svg>
                    {t('Female')}
                  </label>
                </div>
              </div>

<div className={scss.inputWrapper}>

              <label htmlFor="location" className={scss.label}>
                {t('Location')}
                <span className={scss.mark}>*</span>:
              </label>
              <InputForm customStyle={scss.input} name="location" placeholder="Type location" />
              <ErrorMessage name="location" className={scss.error_with_label} component="p"/>
</div>

              {props.data.category === 'sell' && (
                <div className={scss.inputWrapper}>
                  <label htmlFor="price" className={scss.label}>
                    {t('Price')}
                    <span className={scss.mark}>*</span>:
                  </label>
                  <InputForm customStyle={scss.input} name="price" placeholder="Type price" />
                  <ErrorMessage name="price" className={scss.error_with_label} component="p"/>
                </div>
              )}

              <p className={scss.label}>{t('Load the pet’s image:')}</p>
              <button type="button" className={scss.btnAddPhoto}>
              {!img ? (
                  <svg className={scss.crossBig}>
                    <use href={sprite + '#icon-blackCross'} />
                  </svg>
                ) : (
                  <img className={scss.avatar__img} src={img} alt="avatar" />
                )}
                <Input customStyle={scss.input_photo} name="petImage" type="file" accept="image/*" onChange={(e) => {
                  const fileUploaded = e.target.files[0];
                  setFieldValue("petImage", e.target.files[0])
                  setImg(URL.createObjectURL(fileUploaded));
                  setValid(
                    string()
                      .required()
                      .isValidSync(e.target.files[0])
                  );
          }} />
          <p className={scss.error_image}>{!valid && "Image is required"}</p>
              </button>
              <div className={scss.wrapTextarea}>
                <label className={scss.label}>{t('Comments')}</label>
                <InputForm customStyle={scss.textarea} name="comments" as="textarea" placeholder="Type comments" />
                <ErrorMessage name="comments" className={scss.error_with_label} component="p" />
              </div>
              <div className={scss.btnWrap}>
                <button type="submit" className={scss.buttonFill}>
                  {t('Done')}
                </button>
                <button type="button" onClick={props.prev} className={scss.buttonEmpty}>
                  {t('Back')}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
