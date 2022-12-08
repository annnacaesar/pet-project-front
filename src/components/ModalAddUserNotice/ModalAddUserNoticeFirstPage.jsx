import { Formik, Field } from 'formik';
import { InputFormik } from 'components/UI/Input';
import scss from './ModalAddUserNotice.module.scss';
import scssButton from '../UI/Button/Button.module.scss';
import scssInput from '../UI/Input/Input.module.scss';
import scssProgressLine from '../UI/ProgressLine/ProgressLine.module.scss'
import scssContainer from '../UI/ModalContainer/ModalContainer.module.scss'
import { useTranslation } from 'react-i18next';
import { notice } from 'services';
import ModalContainer from 'components/UI/ModalContainer';
import { Button, ButtonClose } from 'components/UI/Button';
import FormComponent from 'components/UI/FormComponent';
import TitleModal from 'components/UI/TitleModal';
import { ButtonContainerWrap } from 'components/UI/ButtonContainer';
import ProgressLine from 'components/UI/ProgressLine';

export const ModalAddUserNoticeFirstPage = props => {
	const { t } = useTranslation();
	const handleSubmit = values => {
		props.next(values, false);
	};
	return (
		<ModalContainer customStyle={scssContainer.container_modal__add}>
			<ButtonClose onClick={props.closeModal} />

			<Formik
				validationSchema={notice.stepOneValidationSchema}
				initialValues={props.data}
				onSubmit={handleSubmit}
			>
				{() => (
					<FormComponent>
						<TitleModal title={t('Add pet')} />

						<ProgressLine stepName={t('First step')} customStyleName={scssProgressLine.stepName__first} customStyleFirst={scssProgressLine.progressLineColor__firstOpas}/>

						<div className={scss.btnContainer}>
							<Field
								className={scss.radioInput}
								name="category"
								type="radio"
								id="lost-found"
								value="lost-found"
							/>
							<label
								htmlFor="lost-found"
								className={
									scss.label_radio_medium + ' ' + scss.activ
								}
							>
								{t('Lost/Found')}
							</label>

							<Field
								className={scss.radioInput}
								name="category"
								type="radio"
								id="inGoodHands"
								value="inGoodHands"
							/>
							<label
								htmlFor="inGoodHands"
								className={
									scss.label_radio_big + ' ' + scss.activ
								}
							>
								{t("In good hands")}
							</label>

							<Field
								className={scss.radioInput}
								name="category"
								type="radio"
								id="sell"
								value="sell"
							/>
							<label
								htmlFor="sell"
								className={
									scss.label_radio_small + ' ' + scss.activ
								}
							>
								{t("Sell")}
							</label>
						</div>

						<InputFormik
							customStyle={scss.input_with_label}
							customStyleError={scssInput.input__error_with_label}
							name="title"
							type="text"
							placeholder={t("Type name")}
							label={t('Tittle of ad')}
							labelMark="*"
						/>

						<InputFormik
							customStyle={scss.input_with_label}
							customStyleError={scssInput.input__error_with_label}
							customStyleWrapper={scssInput.input__wrapper_last}
							name="name"
							type="text"
							placeholder={t("Type name pet")}
							label={t('Name pet')}
						/>

						<ButtonContainerWrap>
							<Button type="submit" buttonName={t('Next')} />
							<Button
								type="button"
								onClick={props.closeModal}
								customStyle={scssButton.button__auth_last}
								buttonName={t('Сancel')}
							/>
						</ButtonContainerWrap>
					</FormComponent>
				)}
			</Formik>
		</ModalContainer>
	);
};
