import { useState } from 'react';
import { Formik, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import { Input, InputFormik } from 'components/UI/Input';
import sprite from '../../images/symbol-defs.svg';
import scss from './ModalAddUserNotice.module.scss';
import scssButton from '../UI/Button/Button.module.scss';
import { notice } from 'services';
import { string } from 'yup';
import ModalContainer from 'components/UI/ModalContainer';
import { Button, ButtonAddPhoto, ButtonClose } from 'components/UI/Button';
import FormComponent from 'components/UI/FormComponent';
import { ButtonContainerWrap } from 'components/UI/ButtonContainer';

export const ModalAddUserNoticeSecondPage = props => {
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
		<ModalContainer>
			<ButtonClose onClick={props.closeModal} />
			<Formik
				validationSchema={notice.stepTwoValidationSchema}
				initialValues={props.data}
				onSubmit={handleSubmit}
			>
				{({ setFieldValue }) => (
					<FormComponent>
						<div className={scss.wrapRadio}>
							<p className={scss.textIcon}>
								{t('The sex')}
								<span className={scss.mark}>*</span>:
							</p>
							<div className={scss.wrapIcon}>
								<Field
									className={scss.radioInput}
									name="sex"
									type="radio"
									id="male"
									value="male"
								/>
								<label
									htmlFor="male"
									className={
										scss.labelGender +
										' ' +
										scss.activGender
									}
								>
									<svg className={scss.icon}>
										<use href={sprite + '#icon-male'} />
									</svg>
									{t('Male')}
								</label>

								<Field
									className={scss.radioInput}
									name="sex"
									type="radio"
									id="female"
									value="female"
								/>
								<label
									htmlFor="female"
									className={
										scss.labelGender +
										' ' +
										scss.activGender
									}
								>
									<svg className={scss.icon}>
										<use href={sprite + '#icon-female'} />
									</svg>
									{t('Female')}
								</label>
							</div>
						</div>

						<InputFormik
							customStyle={scss.input_with_label}
							name="location"
							placeholder="Type location"
							type="text"
							label={t('Location')}
							labelMark="*"
						/>

						{props.data.category === 'sell' && (
							<InputFormik
								customStyle={scss.input_with_label}
								name="price"
								type="text"
								placeholder="Type price"
								label={t('Price')}
								labelMark="*"
							/>
						)}

						<ButtonAddPhoto image={img} valid={valid} labelBtn={t('Load the pet’s image:')}>
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
							placeholder="Type comments"
							customStyleWrapper={scss.wrapTextarea}
							customStyleError={scss.error_textarea}
							label="Comments"
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
