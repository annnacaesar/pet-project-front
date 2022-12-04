import { Formik, Field } from 'formik';
import { InputFormik } from 'components/UI/Input';
import scss from './ModalAddUserNotice.module.scss';
import scssButton from '../UI/Button/Button.module.scss';
import { useTranslation } from 'react-i18next';
import { notice } from 'services';
import scssInput from '../UI/Input/Input.module.scss';
import ModalContainer from 'components/UI/ModalContainer';
import { Button, ButtonClose } from 'components/UI/Button';
import FormComponent from 'components/UI/FormComponent';
import TitleModal from 'components/UI/TitleModal';
import { ButtonContainerWrap } from 'components/UI/ButtonContainer';

export const ModalAddUserNoticeFirstPage = props => {
	const { t } = useTranslation();
	const handleSubmit = values => {
		props.next(values, true);
	};
	return (
		<ModalContainer>
			<ButtonClose onClick={props.closeModal} />

			<Formik
				validationSchema={notice.stepOneValidationSchema}
				initialValues={props.data}
				onSubmit={handleSubmit}
			>
				{() => (
					<FormComponent>
						<TitleModal title={t('Add pet')} />

						<p className={scss.text}>
							Lorem ipsum dolor sit amet, consectetur Lorem ipsum
							dolor sit amet, consectetur
						</p>

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
								lost/found
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
								In good hands
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
								sell
							</label>
						</div>

						<InputFormik
							customStyle={scss.input_with_label}
							name="title"
							type="text"
							placeholder="Type name"
							label={t('Tittle of ad')}
							labelMark="*"
						/>

						<InputFormik
							customStyle={scss.input_with_label}
							name="name"
							type="text"
							placeholder="Type name pet"
							label={t('Name pet')}
						/>

						<InputFormik
							customStyle={scss.input_with_label}
							name="dateOfBirth"
							type="text"
							placeholder="Type date of birth"
							label={t('Date of birth')}
						/>

						<InputFormik
							customStyle={scss.input_with_label}
							customStyleWrapper={scssInput.input__wrapper_last}
							name="breed"
							type="text"
							placeholder="Type breed"
							label={t('Breed')}
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
