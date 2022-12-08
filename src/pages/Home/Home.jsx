import scss from './Home.module.scss';
import styleAnimation from '../../components/SharedLayout/SharedLayout.module.scss';
import PetsIcon from '@mui/icons-material/Pets';
import heart from '../../images/desctop/heart.png';
import Container from 'components/UI/Container';
import { useTranslation } from 'react-i18next';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Modal from 'components/Modal';
import TeamBord from 'components/TeamBord';
import { useState } from 'react';

function Home() {
	const { t } = useTranslation();
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div className={scss.home__container}>
			<Header />

			<Container>
				<h1 className={scss.home__title}>
					<span>{t('Take good care of')}</span>
					<br />
					<span>{t('your small pets')}</span>
				</h1>
				<img src={heart} alt="heart" className={scss.home__heart} />
			</Container>
			<Footer>
				<div className={styleAnimation.footerBicycle}></div>
				<div className={styleAnimation.wrapp}>
					<p>
						&copy;{' '}
						<span className={styleAnimation.copyright}>
							2022 From Zero To Hero
						</span>
					</p>
					<div
						className={styleAnimation.icon}
						onClick={() => setIsOpen(prev => !prev)}
					>
						<PetsIcon
							sx={{ fontSize: '15px', marginRight: '12px' }}
						/>
					</div>
				</div>

				{isOpen && (
					<Modal>
						<TeamBord isOpen={setIsOpen} />
					</Modal>
				)}
			</Footer>
		</div>
	);
}

export default Home;
