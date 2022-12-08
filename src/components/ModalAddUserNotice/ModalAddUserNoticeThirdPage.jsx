import { useState } from 'react';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Input, InputFormik } from 'components/UI/Input';

import scss from './ModalAddUserNotice.module.scss';
import scssButton from '../UI/Button/Button.module.scss';
import scssInput from '../UI/Input/Input.module.scss';
import scssProgressLine from '../UI/ProgressLine/ProgressLine.module.scss'
import scssContainer from '../UI/ModalContainer/ModalContainer.module.scss'
import { notice } from 'services';
import { string } from 'yup';
import ModalContainer from 'components/UI/ModalContainer';
import { Button, ButtonAddPhoto, ButtonClose } from 'components/UI/Button';
import FormComponent from 'components/UI/FormComponent';
import { ButtonContainerWrap } from 'components/UI/ButtonContainer';
import TitleModal from 'components/UI/TitleModal';
import ProgressLine from 'components/UI/ProgressLine';

export const ModalAddUserNoticeThirdPage = props => {
	const { t } = useTranslation();
	const [img, setImg] = useState();
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
				validationSchema={notice.stepThirdValidationSchema}
				initialValues={props.data}
				onSubmit={handleSubmit}
			>
				{({ setFieldValue }) => (
					<FormComponent>
						<TitleModal title={t('Add pet')} />

						<ProgressLine
							stepName={t("Last step")}
							customStyleName={scssProgressLine.stepName__third}
							customStyleFirst={
								scssProgressLine.progressLineColor__first
							}
							customStyleSecond={
								scssProgressLine.progressLineColor__second
							}
							customStyleThird={
								scssProgressLine.progressLineColor__third
							}
						/>

						{props.data.category === 'sell' && (
							<InputFormik
								customStyle={scss.input_with_label}
								customStyleError={
									scssInput.input__error_with_label
								}
								name="price"
								type="text"
								placeholder={t("Type price")}
								label={t('Price')}
								labelMark="*"
							/>
						)}

						<ButtonAddPhoto
							image={img}
							valid={valid}
							labelBtn={t('Load the pet’s image:')}
						>
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
							placeholder={t("Type comments")}
							customStyleWrapper={scssInput.input__wrapper_last}
							customStyleError={scssInput.input__error_with_label}
							// customStyleError={scss.error_textarea}
							label={("Comments")}
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
