import { useModal } from 'hooks';
import { useTranslation } from 'react-i18next';

import Container from 'components/Container';
import Modal from 'components/Modal';
import { ModalAddsPet } from 'components/ModalAddsPet';
import { Logout } from 'components/User/Logout';
import PetsData from 'components/User/PetsData';
import UserData from 'components/User/UserData';

import sprite from 'images/symbol-defs.svg';
import scss from './UserPage.module.scss';

const UserPage = () => {
  const { t } = useTranslation();
  const { isModalOpen, closeModal, toggleModal } = useModal();

  return (
    <Container>
      <div className={scss.user__box}>
        <div>
          <h1 className={scss.user__title}>{t('My information:')}</h1>
          <div className={scss.user__info}>
            <UserData />
            <Logout />
          </div>
        </div>
        <div className={scss.pets__container}>
          <h2 className={scss.user__pets}>{t('My Pets:')}</h2>
          <PetsData />
        </div>
        <div className={scss.addpats}>
          <p className={scss.addpats__title}>{t('Add pet')}</p>
          <button className={scss.addpats__btm} type="button" onClick={toggleModal}>
            <svg className={scss.addpats__svg}>
              <use href={sprite + '#icon-plus'} />
            </svg>
          </button>
          {isModalOpen && (
            <Modal onCloseModal={closeModal} mode="dark">
              <ModalAddsPet onCloseModal={closeModal} />
            </Modal>
          )}
        </div>
      </div>
    </Container>
  );
};

export default UserPage;
