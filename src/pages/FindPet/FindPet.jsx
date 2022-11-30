import React from 'react';
import NoticesSearch from 'components/Notices/NoticesSearch';
import NoticesCategoriesNav from 'components/Notices/NoticesCategoriesNav';
import AddNoticeButton from 'components/Notices/AddNoticeButton';
import styles from './FindPet.module.scss';
import Container from 'components/Container';
import { Outlet } from 'react-router-dom/dist';
import { useTranslation } from 'react-i18next';

const FindPet = () => {
  const { t } = useTranslation();

  return (
    <>
      <Container>
        <h1 className={styles.title__findpet}>{t('Find your favorite pet')}</h1>
        <NoticesSearch />

        <div className={styles.navContainer__findpet}>
          <NoticesCategoriesNav />
          <AddNoticeButton />
        </div>

        <Outlet />
      </Container>
    </>
  );
};

export default FindPet;
