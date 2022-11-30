import { useState } from 'react';
import { useUpdateUserAvatarMutation } from 'redux/fetchUser';
import { useTranslation } from 'react-i18next';
import { HOST } from 'config';

import sprite from 'images/symbol-defs.svg';
import scss from './UserAvatarModal.module.scss';

const UserAvatarModal = ({ onCloseModal, onAvatarImg }) => {
  const { t } = useTranslation();
  const [img, setImg] = useState(onAvatarImg);
  const [file, setFile] = useState(null);

  const [updateUserAvatar] = useUpdateUserAvatarMutation();

  const imageHandler = async (e) => {
    const fileUploaded = e.target.files[0];
    setImg(URL.createObjectURL(fileUploaded));
    const file = new FormData();
    file.append('avatar', fileUploaded);
    setFile(file);
  };

  const ImageSaveClick = async () => {
    updateUserAvatar(file);
    onCloseModal();
  };
  return (
    <div className={scss.avatar__modal}>
      <div className={scss.input__wrapper}>
        <button type="button" className={scss.avatar__close} onClick={onCloseModal}>
          <svg className={scss.close__svg}>
            <use href={sprite + '#icon-exit'} />
          </svg>
        </button>
        <div className={scss.avatar__box}>
          {img ? (
            <img className={scss.avatar__img} src={img} alt="avatar" />
          ) : (
            <img className={scss.avatar__img} src={`${HOST}/${img}`} alt="avatar" />
          )}
        </div>

        <div className={scss.input__container}>
          <input className={scss.input__file} type="file" name="avatar" id="input__file" onChange={(e) => imageHandler(e)} accept="image/*" />
          <label className={scss.input__fileButton} htmlFor="input__file">
            <span className={scss.input__fileIcon}>
              <svg className={scss.input__iconSave} width="40" height="40">
                <use href={sprite + '#icon-save'} />
              </svg>
            </span>

            <span className={scss.input__buttonText}>{t('Select a file')}</span>
          </label>
        </div>
        <button className={scss.save__avatar} type="submit" onClick={ImageSaveClick}>
          {t('Save')}
        </button>
      </div>
    </div>
  );
};

export default UserAvatarModal;
