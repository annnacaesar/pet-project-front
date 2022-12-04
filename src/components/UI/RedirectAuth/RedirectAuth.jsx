import { Link } from 'react-router-dom';
import scss from './RedirectAuth.module.scss';

const RedirectAuth = ({ path, answer, pathName, customStyle }) => {
	return (
		<p className={`${scss.redirect__auth} ${customStyle}`}>
			{answer}
			<Link to={path} className={scss.redirect_link__auth}>
				{pathName}
			</Link>
		</p>
	);
};

export default RedirectAuth;
