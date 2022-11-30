import { ErrorMessage, Field } from 'formik';
import scss from './Input.module.scss';

const InputForm = ({
	type = 'text',
	name,
	customStyle,
	placeholder,
	autofocus,
	autoComplete,
	as,
}) => {
	return (
		<Field
			className={`${scss.input} ${customStyle}`}
			name={name}
			type={type}
			placeholder={placeholder}
			autoFocus={autofocus}
			autoComplete={autoComplete}
			as={as}
		/>
	);
};

const InputFormik = ({
	type = 'text',
	name,
	customStyle,
	customStyleError,
	customStyleWrapper,
	customStyleLabel,
	placeholder,
	autofocus,
	autoComplete,
	as,
	label,
	children,
}) => {
	return (
		<div className={`${scss.input__wrapper} ${customStyleWrapper}`}>
			<label htmlFor={name} className={`${scss.label} ${customStyleLabel}`}>
				{label}
			</label>
			<Field
				className={`${scss.input} ${customStyle}`}
				name={name}
				type={type}
				placeholder={placeholder}
				autoFocus={autofocus}
				autoComplete={autoComplete}
				as={as}
			/>
			{children}
			<ErrorMessage
				name={name}
				component="p"
				className={`${scss.error} ${customStyleError}`}
			/>
		</div>
	);
};

const Input = ({
	type = 'text',
	name,
	id,
	label,
	customStyle,
	placeholder,
	value,
	onChange,
	onBlur,
}) => {
	return (
		<label>
			{label}
			<input
				className={`${scss.input} ${customStyle}`}
				type={type}
				id={id}
				name={name}
				placeholder={placeholder}
				onChange={onChange}
				onBlur={onBlur}
				value={value}
			/>
		</label>
	);
};

export { Input, InputForm, InputFormik };
