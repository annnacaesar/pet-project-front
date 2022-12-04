import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { InputFormik } from 'components/UI/Input';
// import scss from './ModalAddsPet.module.scss';
import scssInput from '../UI/Input/Input.module.scss';
import scssButton from '../UI/Button/Button.module.scss';
import { pet } from 'services';
import ModalContainer from 'components/UI/ModalContainer';
import TitleModal from 'components/UI/TitleModal';
import { Button, ButtonClose } from 'components/UI/Button';
import FormComponent from 'components/UI/FormComponent';
import { ButtonContainerWrap } from 'components/UI/ButtonContainer';

export const ModalAddsPetFirstPage = props => {
	const { t } = useTranslation();
	const handleSubmit = values => {
		props.next(values, true);
	};
	return (
		<ModalContainer>
			<ButtonClose onClick={props.closeModal} />

			<Formik
				validationSchema={pet.stepOneValidationSchema}
				initialValues={props.data}
				onSubmit={handleSubmit}
			>
				{() => (
					<FormComponent>
						<TitleModal title={t('Add pet')} />

						<InputFormik
							customStyle={scssInput.input_with_label}
							customStyleError={scssInput.input__error_with_label}
							name="name"
							placeholder="Type name pet"
							label={t('Name pet')}
						/>

						<InputFormik
							customStyle={scssInput.input_with_label}
							customStyleError={scssInput.input__error_with_label}
							name="dateOfBirth"
							placeholder="Type date of birth"
							label={t('Date of birth')}
						/>

						<InputFormik
							customStyle={scssInput.input_with_label}
							customStyleError={scssInput.input__error_with_label}
							customStyleWrapper={scssInput.input__wrapper_last}
							name="breed"
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
