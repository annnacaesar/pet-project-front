import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './AddNoticeButton.module.scss';
import { useModal } from 'hooks';
import Modal from 'components/Modal';
import { toast } from 'react-toastify';
import sprite from '../../../images/symbol-defs.svg';
import { ModalAddUserNotice } from 'components/ModalAddUserNotice';
import { useTranslation } from 'react-i18next';
import { toastMainOptions } from 'config';

const AddNoticeButton = () => {
  const { t } = useTranslation();
  const isLogged = useSelector((state) => state.users.isLogged);
  const navigate = useNavigate();

  const { isModalOpen, closeModal, toggleModal } = useModal();

  const buttonSwitch = () => {
    if (isLogged) {
      toggleModal();
      return;
    } else {
      navigate('/login');
      toast.info('Please login first.', toastMainOptions);
      return;
    }
  };

  return (
    <>
      {isModalOpen && (
        <Modal onCloseModal={closeModal} mode="dark">
          {<ModalAddUserNotice onCloseModal={closeModal} />}
        </Modal>
      )}
      <div className={styles.AddNoticeButton__container}>
        <span className={styles.AddNoticeButton__span}>{t('Add')}</span>
        <span className={styles.AddNoticeButton__span}>&nbsp;{t('pet')}</span>
        <button type="button" className={styles.AddNoticeButton__button} onClick={buttonSwitch}>
          <svg className={styles.AddNoticeButton__svg}>
            <use href={sprite + '#icon-plus'} />
          </svg>
        </button>
      </div>
    </>
  );
};

export default AddNoticeButton;
