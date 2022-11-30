import React from 'react';
import { useNavigate } from 'react-router-dom';
import PetsIcon from '@mui/icons-material/Pets';
import scss from './LearnMoreModal.module.scss';
import Button from 'components/Button';
import style from '../../Button/Button.module.scss';
import { useSelector } from 'react-redux';
import { useAddToFavoritesMutation, useDeleteFromFavoritesMutation } from '../../../redux/fetchNotice';

import sprite from '../../../images/symbol-defs.svg';

const LearnMore = ({
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
  favorite,
  // myads,
  onCloseModal,
  setIsFavorite
}) => {
  const [addToFavorites] = useAddToFavoritesMutation();
  const [deleteFromFavorites] = useDeleteFromFavoritesMutation();

  const isLogged = useSelector((state) => state.users.isLogged);
  const navigate = useNavigate();

  const handleAddToFavorites = () => {
    if (!isLogged) {
      navigate('/login');
      return;
    } else {
      addToFavorites(_id);
      setIsFavorite(true);
    }
  };

  const handleDeleteFromFavorites = () => {
    if (!isLogged) {
      navigate('/login');
      return;
    } else {
      deleteFromFavorites(_id);
      setIsFavorite(false);
    }
  };

  return (
    <>
      <div className={scss.wrap_container}>
        <div className={scss.wrap_image_info}>
          <button className={scss.button__close} onClick={onCloseModal}>
            <PetsIcon sx={{ fontSize: 30 }} />
          </button>
          <div className={scss.image}>
            <img className={scss.photo} src={imageUrl} alt="Cat error" />
            <div className={scss.sale}>
              <span className={scss.text}>{category}</span>
            </div>
          </div>
          <div className={scss.wrap_info}>
            <h3 className={scss.title}>{title}</h3>
            <div className={scss.wrap_info_column}>
              <ul className={scss.list_info}>
                <li className={scss.item_info}>
                  <div className={scss.wrap_text_info}>
                    <p className={scss.first_column_info}>Name:</p>
                  </div>
                  <div className={scss.wrap_text_info}>
                    <span>{name}</span>
                  </div>
                </li>
                <li className={scss.item_info}>
                  <div className={scss.wrap_text_info}>
                    <p className={scss.first_column_info}>Birthday:</p>
                  </div>
                  <div className={scss.wrap_text_info}>
                    <span>{age}</span>
                  </div>
                </li>
                <li className={scss.item_info}>
                  <div className={scss.wrap_text_info}>
                    <p className={scss.first_column_info}>Breed:</p>
                  </div>
                  <div className={scss.wrap_text_info}>
                    <span>{breed}</span>
                  </div>
                </li>
                <li className={scss.item_info}>
                  <div className={scss.wrap_text_info}>
                    <p className={scss.first_column_info}>Location:</p>
                  </div>
                  <div className={scss.wrap_text_info}>
                    <span>{place}</span>
                  </div>
                </li>
                <li className={scss.item_info}>
                  <div className={scss.wrap_text_info}>
                    <p className={scss.first_column_info}>The sex:</p>
                  </div>
                  <div className={scss.wrap_text_info}>
                    <span>{sex}</span>
                  </div>
                </li>
                <li className={scss.item_info}>
                  <div className={scss.wrap_text_info}>
                    <p className={scss.first_column_info}>Email:</p>
                  </div>
                  <div className={scss.wrap_text_info}>
                    <span>{owner.email}</span>
                  </div>
                </li>
                <li className={scss.item_info}>
                  <div className={scss.wrap_text_info}>
                    <p className={scss.first_column_info}>Phone:</p>
                  </div>
                  <div className={scss.wrap_text_info}>
                    <span>{owner.phone}</span>
                  </div>
                </li>
                {category === 'Sell' && (
                  <li className={scss.item_info}>
                    <div className={scss.wrap_text_info}>
                      <p className={scss.first_column_info}>Sell:</p>
                    </div>
                    <div className={scss.wrap_text_info}>
                      <span>{price}$</span>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className={scss.wrap_coments_buttons}>
          <p className={scss.comments}>
            <span className={scss.comments_span}>Comments: </span> {comments}
          </p>
          <div className={scss.buttons}>
            {favorite ? (
              <Button
                customStyle={style.button__auth_last + ' ' + style.botton__learn_more_mobile}
                buttonName="Remove"
                buttonIcon={
                  <svg className={scss.iconHeart}>
                    <use href={sprite + '#icon-heartFull'} />
                  </svg>
                }
                onClick={handleDeleteFromFavorites}
              ></Button>
            ) : (
              <Button
                customStyle={style.button__auth_last + ' ' + style.botton__learn_more_mobile}
                buttonName="Add to"
                buttonIcon={
                  <svg className={scss.iconHeart}>
                    <use href={sprite + '#icon-heartEmpty'} />
                  </svg>
                }
                onClick={handleAddToFavorites}
              ></Button>
            )}
            <button type="button" className={scss.button__contact}>
              <a href={`tel:${owner.phone}`}>Contact</a>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LearnMore;
