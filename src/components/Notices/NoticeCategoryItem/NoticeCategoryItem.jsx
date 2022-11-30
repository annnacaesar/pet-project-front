import { useModal } from 'hooks';
import LearnMoreModal from '../LearnMoreModal';
import { useNavigate } from 'react-router-dom';
import styles from './NoticeCategoryItem.module.scss';
import sprite from '../../../images/symbol-defs.svg';
import moment from 'moment';
import Modal from 'components/Modal';
import { useAddToFavoritesMutation, useDeleteFromFavoritesMutation, useDeleteUserNoticeByIdMutation } from 'redux/fetchNotice';
import { useSelector } from 'react-redux';
import { selectors } from 'redux/selectors.js';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
// import 'react-lazy-load-image-component/src/effects/blur.css';
// import def from '../../../images/mobile/woman.png';

moment().format();

const NoticeCategoryItem = ({
  _id,
  name,
  owner,
  comments = 'There is no comments',
  sex,
  category,
  imageUrl,
  title,
  breed,
  place,
  age,
  price,
  refetchUser,
  isLogged
}) => {
  const { t } = useTranslation();
  const { isModalOpen, closeModal, toggleModal } = useModal();
  const navigate = useNavigate();

  const userFavorites = useSelector(selectors.getFavorites);
  const userAds = useSelector(selectors.getUserNotices);

  const favorite = userFavorites.includes(_id);
  const myads = userAds.includes(_id);

  const [addToFavorites] = useAddToFavoritesMutation();
  const [deleteFromFavorites] = useDeleteFromFavoritesMutation();
  const [deleteUserNoticeById] = useDeleteUserNoticeByIdMutation();
  const [isFavorite, setIsFavorite] = useState(favorite);
  const [isOwn, setIsOwn] = useState(myads);

  const normilizeCategory = (category) => {
    switch (category) {
      case 'sell':
        return 'Sell';
      case 'lost-found':
        return 'Lost/Found';
      case 'inGoodHands':
        return 'In good hands';
      default:
        return;
    }
  };

  useEffect(() => {
    if (!isLogged) return;

    refetchUser();
  }, [refetchUser, isFavorite, isOwn, isLogged]);

  const calculatedogAge = (age) => {
    const dogAge = moment(age, 'DD.MM.YYYY').fromNow(true);
    return dogAge;
  };

  const handleAddToFavorites = async (e) => {
    if (!isLogged) {
      navigate('/login');
      return;
    }

    await addToFavorites(_id);
    setIsFavorite(true);
  };

  const handleDeleteFromFavorites = () => {
    deleteFromFavorites(_id);
    setIsFavorite(false);
  };

  const handleDeleteUserNotice = () => {
    deleteUserNoticeById(_id);
    setIsOwn(false);
  };

  return (
    <>
      <li key={_id} className={styles.NoticeCategoryItem} id={_id}>
        <LazyLoadImage
          className={`${styles.NoticeCategoryItem__img} ${styles.blurup} `}
          loading="lazy"
          // effect="blur"
          alt="pet"
          src={imageUrl} // use normal <img> attributes as props
        />
        {/* <img src={imageUrl} alt="pet" className={`${styles.NoticeCategoryItem__img} ${styles.blurup} `} loading="lazy" /> */}

        <p className={styles.NoticeCategoryItem__category}>{normilizeCategory(category)}</p>
        {isFavorite ? (
          <button className={styles.NoticeCategoryItem__heartbutton} type="button" onClick={handleDeleteFromFavorites}>
            <svg className={styles.NoticeCategoryItem__svg}>
              <use href={sprite + '#icon-heartFull'} />
            </svg>
          </button>
        ) : (
          <button className={styles.NoticeCategoryItem__heartbutton} type="button" onClick={handleAddToFavorites}>
            <svg className={styles.NoticeCategoryItem__svg}>
              <use href={sprite + '#icon-heartEmpty'} />
            </svg>
          </button>
        )}
        {myads && (
          <button className={styles.NoticeCategoryItem__deletebutton} type="button" onClick={handleDeleteUserNotice}>
            <svg className={styles.NoticeCategoryItem__svgdelete}>
              <use href={sprite + '#icon-remov-pets'} />
            </svg>
          </button>
        )}
        <div className={styles.NoticeCategoryItem__infoContainer}>
          <h3 className={styles.NoticeCategoryItem__title}>{title}</h3>
          <div className={`${styles.NoticeCategoryItem__textContainer} ${styles.sell}`}>
            <ul className={styles.NoticeCategoryItem__textList}>
              <li className={styles.NoticeCategoryItem__textItem}>
                <div className={styles.NoticeCategoryItem__textKeysContainer}>
                  <p>{t('Breed')}</p>
                </div>
                <div className={styles.NoticeCategoryItem__textValuesContainer}>
                  <span className={styles.NoticeCategoryItem__textItemspan}>{breed}</span>
                </div>
              </li>
              <li className={styles.NoticeCategoryItem__textItem}>
                <div className={styles.NoticeCategoryItem__textKeysContainer}>
                  <p>{t('Place')}</p>
                </div>
                <div className={styles.NoticeCategoryItem__textValuesContainer}>
                  <span className={styles.NoticeCategoryItem__textItemspan}>{place}</span>
                </div>
              </li>
              <li className={styles.NoticeCategoryItem__textItem}>
                <div className={styles.NoticeCategoryItem__textKeysContainer}>
                  <p>{t('Age')}</p>
                </div>
                <div className={styles.NoticeCategoryItem__textValuesContainer}>
                  <span className={styles.NoticeCategoryItem__textItemspan}>{calculatedogAge(age)}</span>
                </div>
              </li>
              {category === 'sell' && (
                <li className={styles.NoticeCategoryItem__textItem}>
                  <div className={styles.NoticeCategoryItem__textKeysContainer}>
                    <p>{t('Price')}</p>
                  </div>
                  <div className={styles.NoticeCategoryItem__textValuesContainer}>
                    <span className={styles.NoticeCategoryItem__textItemspan}>{price}$</span>
                  </div>
                </li>
              )}
            </ul>
          </div>

          <button type="button" className={styles.NoticeCategoryItem__LearnMoreButton} onClick={toggleModal}>
            <span className={styles.NoticeCategoryItem__LearnMoreButtonText}>{t('Learn more')}</span>
          </button>
        </div>
      </li>
      {isModalOpen && (
        <Modal onCloseModal={closeModal} mode="dark">
          <LearnMoreModal
            onCloseModal={closeModal}
            _id={_id}
            name={name}
            owner={owner}
            sex={sex}
            comments={comments}
            category={normilizeCategory(category)}
            imageUrl={imageUrl}
            title={title}
            breed={breed}
            place={place}
            price={price}
            age={age}
            favorite={isFavorite}
            setIsFavorite={setIsFavorite}
            myads={myads}
          />
        </Modal>
      )}
    </>
  );
};

export default NoticeCategoryItem;
