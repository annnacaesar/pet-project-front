import { useState } from 'react';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Input, InputFormik } from 'components/UI/Input';
import scss from './ModalAddsPet.module.scss';
import scssButton from '../UI/Button/Button.module.scss';
import scssInput from '../UI/Input/Input.module.scss';
import scssContainer from '../UI/ModalContainer/ModalContainer.module.scss'
import { pet } from 'services';
import { string } from 'yup';
import ModalContainer from 'components/UI/ModalContainer';
import { Button, ButtonAddPhoto, ButtonClose } from 'components/UI/Button';
import TitleModal from 'components/UI/TitleModal';
import FormComponent from 'components/UI/FormComponent';
import { ButtonContainerWrap } from 'components/UI/ButtonContainer';

export const ModalAddsPetSecondPage = props => {
	const { t } = useTranslation();
	const [img, setImg] = useState(null);
	const [valid, setValid] = useState(false);

	const handleChange = (e, setFieldValue) => {
		const fileUploaded = e.target.files[0];
		setFieldValue('petImage', e.target.files[0]);
		setImg(URL.createObjectURL(fileUploaded));
		setValid(string().required().isValidSync(e.target.files[0]));
	};

	const handleSubmit = values => {
		props.next(values, true);
		props.closeModal();
	};
	return (
		<ModalContainer customStyle={scssContainer.container_modal__add}>
			<ButtonClose onClick={props.closeModal} />

			<Formik
				validationSchema={pet.stepTwoValidationSchema}
				initialValues={props.data}
				onSubmit={handleSubmit}
			>
				{({ setFieldValue }) => (
					<FormComponent>
						<TitleModal title={t('Add pet')} />
						<ButtonAddPhoto image={img} valid={valid} labelBtn={t('Add photo and some comments')}>
							<Input
								customStyle={scss.input_photo}
								type="file"
								accept="image/*"
								onChange={e => handleChange(e, setFieldValue)}
							/>
						</ButtonAddPhoto>

						<InputFormik
							customStyle={scss.textarea}
							name="comments"
							as="textarea"
							placeholder={t('Type comments')}
							customStyleWrapper={scssInput.input__wrapper_last}
							customStyleError={scssInput.input__error_with_label}
							// customStyleWrapper={scss.wrapTextarea}
							// customStyleError={scss.error_textarea}
							label={t("Comments")}
						/>

						<ButtonContainerWrap>
							<Button type="submit" buttonName={t('Done')} />
							<Button
								type="button"
								onClick={props.prev}
								customStyle={scssButton.button__auth_last}
								buttonName={t('Back')}
							/>
						</ButtonContainerWrap>
					</FormComponent>
				)}
			</Formik>
		</ModalContainer>
	);
};
