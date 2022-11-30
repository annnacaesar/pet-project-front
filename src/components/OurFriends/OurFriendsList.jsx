import FriendItem from './OurFriendsItem';
import scss from './FriendStyle.module.scss';
import { useTranslation } from 'react-i18next';

const OurFriendList = ({ info }) => {
  const { t } = useTranslation();
  return (
    <div className={scss.container}>
      <h2 className={scss.title}>{t('friends')}</h2>
      <ul className={scss.friendsList}>
        {info.map(({ url, title, imageUrl, address, addressUrl, email, phone, workDays }) => {
          return (
            <FriendItem
              key={url}
              url={url}
              title={title}
              img={imageUrl}
              timeWork={workDays}
              address={address}
              addressUrl={addressUrl}
              email={email}
              phone={phone}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default OurFriendList;
