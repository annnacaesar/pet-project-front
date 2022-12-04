import { Form } from 'formik';
import scss from './FormComponent.module.scss';

const FormComponent = ({ customStyle, children }) => {
  return (
    <Form className={`${scss.form} ${customStyle}`}>
      {children}
    </Form>
  );
};

export default FormComponent;
