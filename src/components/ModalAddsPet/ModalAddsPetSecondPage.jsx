import { useState } from 'react';
import { ErrorMessage, Form, Formik } from 'formik';
import { Input, InputForm } from 'components/Input';
import sprite from 'images/symbol-defs.svg';
import scss from './ModalAddsPet.module.scss';
import { pet } from 'services';
import { string } from 'yup';

export const ModalAddsPetSecondPage = (props) => {
  const [img, setImg] = useState(null);
  const [valid, setValid] = useState(false);

  const handleSubmit = (values) => {
    props.next(values, true);
    props.closeModal();
  };
  return (
    <div className={scss.container}>
      <button type="button" onClick={props.closeModal} className={scss.btnClose}>
        <svg className={scss.crossSmall}>
          <use href={sprite + '#icon-blackCross'} />
        </svg>
      </button>
      <h3 className={scss.title}>Add pet</h3>
      <div className={scss.wrapForm}>
        <Formik validationSchema={pet.stepTwoValidationSchema} initialValues={props.data} onSubmit={handleSubmit}>
          {({ setFieldValue }) => (
            <Form encType="multipart/form-data" className={scss.formSecond}>
              <p className={scss.text}>Add photo and some comments</p>
              <button type="button" className={scss.btnAddPhoto}>
                {!img ? (
                  <svg className={scss.crossBig}>
                    <use href={sprite + '#icon-blackCross'} />
                  </svg>
                ) : (
                  <img className={scss.avatar__img} src={img} alt="avatar" />
                )}
                <Input
                  customStyle={scss.input_photo}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const fileUploaded = e.target.files[0];
                    setFieldValue('petImage', e.target.files[0]);
                    setImg(URL.createObjectURL(fileUploaded));
                    setValid(string().required().isValidSync(e.target.files[0]));
                  }}
                />
                <p className={scss.error_image}>{!valid && 'Image is required'}</p>
              </button>

              <div className={scss.wrapTextarea}>
                <label className={scss.label}> Comments</label>
                <InputForm customStyle={scss.textarea} name="comments" as="textarea" placeholder="Type comments" />
                <ErrorMessage name="comments" className={scss.error_textarea} component="p" />
              </div>

              <div className={scss.btnWrap}>
                <button type="submit" className={scss.buttonFill}>
                  Done
                </button>
                <button type="button" onClick={props.prev} className={scss.buttonEmpty}>
                  Back
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
