import { useModal } from 'hooks';
import LearnMoreModal from '../LearnMoreModal';
import { useNavigate } from 'react-router-dom';
import scss from './NoticeCategoryItem.module.scss';
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
      <li key={_id} className={scss.item} id={_id}>
        <div className={scss.item__imageWrapper}>


        <LazyLoadImage
          className={`${scss.item__image} ${scss.blurup} `}
          loading="lazy"
          // effect="blur"
          alt="pet"
          src={imageUrl} // use normal <img> attributes as props
        />
        <p className={scss.item__category}>{normilizeCategory(category)}</p>
        {isFavorite ? (
          <button className={scss.item__heartbutton} type="button" onClick={handleDeleteFromFavorites}>
            <svg className={scss.item__svg}>
              <use href={sprite + '#icon-heartFull'} />
            </svg>
          </button>
        ) : (
          <button className={scss.item__heartbutton} type="button" onClick={handleAddToFavorites}>
            <svg className={scss.item__svg}>
              <use href={sprite + '#icon-heartEmpty'} />
            </svg>
          </button>
        )}
        {myads && (
          <button className={scss.item__deletebutton} type="button" onClick={handleDeleteUserNotice}>
            <svg className={scss.item__svgdelete}>
              <use href={sprite + '#icon-remov-pets'} />
            </svg>
          </button>
        )}
        </div>
        {/* <img src={imageUrl} alt="pet" className={`${scss.item__image} ${scss.blurup} `} loading="lazy" /> */}

        <div className={scss.item__infoContainer}>
          <h3 className={scss.item__title}>{title}</h3>
          <div className={`${scss.item__textContainer} ${scss.sell}`}>
            <ul className={scss.item__textList}>
              <li className={scss.item__textItem}>
                <div className={scss.item__textKeysContainer}>
                  <p>{t('Breed')}</p>
                </div>
                <div className={scss.item__textValuesContainer}>
                  <span className={scss.item__textItemspan}>{breed}</span>
                </div>
              </li>
              <li className={scss.item__textItem}>
                <div className={scss.item__textKeysContainer}>
                  <p>{t('Place')}</p>
                </div>
                <div className={scss.item__textValuesContainer}>
                  <span className={scss.item__textItemspan}>{place}</span>
                </div>
              </li>
              <li className={scss.item__textItem}>
                <div className={scss.item__textKeysContainer}>
                  <p>{t('Age')}</p>
                </div>
                <div className={scss.item__textValuesContainer}>
                  <span className={scss.item__textItemspan}>{calculatedogAge(age)}</span>
                </div>
              </li>
              {category === 'sell' && (
                <li className={scss.item__textItem}>
                  <div className={scss.item__textKeysContainer}>
                    <p>{t('Price')}</p>
                  </div>
                  <div className={scss.item__textValuesContainer}>
                    <span className={scss.item__textItemspan}>{price}$</span>
                  </div>
                </li>
              )}
            </ul>
          </div>

          <button type="button" className={scss.item__LearnMoreButton} onClick={toggleModal}>
            <span className={scss.item__LearnMoreButtonText}>{t('Learn more')}</span>
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
