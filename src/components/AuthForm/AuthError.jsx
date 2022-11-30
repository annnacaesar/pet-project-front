import scss from './AuthForm.module.scss';

export const AuthError = ({error, additionalInfo }) => {
	return (
		<div className={scss.container}>
			<div className={scss.form}>
				
			<h2 className={scss.title}>{error}</h2>

			<p className={scss.redirect__auth}>
				{additionalInfo}
				{/* <a className={scss.redirect_link__auth} href="/login">
					Login
				</a> */}
			</p>
			</div>
		</div>
	);
};
