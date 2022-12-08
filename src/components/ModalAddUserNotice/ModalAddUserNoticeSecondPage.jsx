import { Formik, Field } from 'formik';
import { InputFormik } from 'components/UI/Input';
import sprite from '../../images/symbol-defs.svg';
import scss from './ModalAddUserNotice.module.scss';
import scssButton from '../UI/Button/Button.module.scss';
import scssInput from '../UI/Input/Input.module.scss';
import scssProgressLine from '../UI/ProgressLine/ProgressLine.module.scss';
import scssContainer from '../UI/ModalContainer/ModalContainer.module.scss'
import { useTranslation } from 'react-i18next';
import { notice } from 'services';
import ModalContainer from 'components/UI/ModalContainer';
import { Button, ButtonClose } from 'components/UI/Button';
import FormComponent from 'components/UI/FormComponent';
import TitleModal from 'components/UI/TitleModal';
import { ButtonContainerWrap } from 'components/UI/ButtonContainer';
import ProgressLine from 'components/UI/ProgressLine';

export const ModalAddUserNoticeSecondPage = props => {
	const { t } = useTranslation();
	const handleSubmit = values => {
		props.next(values, true);
	};
	return (
		<ModalContainer customStyle={scssContainer.container_modal__add}>
			<ButtonClose onClick={props.closeModal} />

			<Formik
				validationSchema={notice.stepTwoValidationSchema}
				initialValues={props.data}
				onSubmit={handleSubmit}
			>
				{() => (
					<FormComponent>
						<TitleModal title={t('Add pet')} />

						<ProgressLine
							stepName={t("Second step")}
							customStyleName={scssProgressLine.stepName__second}
							customStyleFirst={
								scssProgressLine.progressLineColor__first
							}
							customStyleSecond={
								scssProgressLine.progressLineColor__secondOpas
							}
						/>

						<InputFormik
							customStyle={scss.input_with_label}
							customStyleError={scssInput.input__error_with_label}
							name="dateOfBirth"
							type="text"
							placeholder={t("Type date of birth")}
							label={t('Date of birth')}
						/>

						<InputFormik
							customStyle={scss.input_with_label}
							customStyleError={scssInput.input__error_with_label}
							name="breed"
							type="text"
							placeholder={("Type breed")}
							label={t('Breed')}
						/>

						<InputFormik
							customStyle={scss.input_with_label}
							customStyleError={scssInput.input__error_with_label}
							name="location"
							placeholder={t('Location')}
							type="text"
							label={t('Location')}
							labelMark="*"
						/>

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

						<ButtonContainerWrap>
							<Button type="submit" buttonName={t('Next')} />
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
