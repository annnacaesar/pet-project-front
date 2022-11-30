import { useSelector } from 'react-redux';
import { selectors } from 'redux/selectors.js';
import { useTranslation } from 'react-i18next';
import { useModal } from 'hooks';

import UserDataItem from '../UserDataItem';
import Modal from 'components/Modal';
import UserAvatarModal from '../UserAvatarModal';

import DefaultAvatar from 'images/desctop/DefaultAvatar.png';
import sprite from 'images/symbol-defs.svg';
import scss from './UserData.module.scss';

const UserData = () => {
  const { t } = useTranslation();
  const { isModalOpen, closeModal, toggleModal } = useModal();

  const avatar = useSelector(selectors.getUserAvatar);

  const avatarImg = avatar ? avatar : DefaultAvatar;

  return (
    <div className={scss.data__container}>
      <div className={scss.avatar__container}>
        <div className={scss.avatar__box}>
          <img className={scss.avatar__img} src={avatarImg} alt="avatar" />
        </div>
        <div className={scss.info__box}>
          <button className={scss.info__btn} type="submit" onClick={toggleModal}>
            <svg className={scss.info__camera} width="18" height="18">
              <use href={sprite + '#icon-profilePhotoCamera'} />
            </svg>
            {t('Edit photo')}
          </button>
        </div>
      </div>
      <UserDataItem />
      {isModalOpen && (
        <Modal onCloseModal={closeModal} mode="dark">
          <UserAvatarModal onCloseModal={closeModal} onAvatarImg={avatarImg} />
        </Modal>
      )}
    </div>
  );
};

export default UserData;
