import { useTranslation } from 'react-i18next';
import { AuthError } from "components/AuthForm";

export const ErrorPage = () => {
  const { t } = useTranslation();
	return (
		<AuthError error={t('Something wrong')} additionalInfo={t('Try, again later')}/>
	);
};

// import { useRouteError } from "react-router-dom";

// export default function ErrorPage() {
//   const error = useRouteError();
//   console.error(error);

//   return (
//     <div id="error-page">
//       <h1>Oops!</h1>
//       <p>Sorry, an unexpected error has occurred.</p>
//       <p>
//         <i>{error.statusText || error.message}</i>
//       </p>
//     </div>
//   );
// }