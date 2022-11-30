import { useSelector } from 'react-redux';
import { selectors } from 'redux/selectors.js';

import { Field, FieldBirthday } from '../Field';

import scss from './UserDataItem.module.scss';

const UserDataItem = () => {
  const { name, email, phone, city, birthday } = useSelector(selectors.getUserInfo);

  return (
    <>
      <ul className={scss.user__list}>
        <Field text="name" type="text" value={name} o />
        <Field text="email" type="email" value={email} />
        <FieldBirthday text="Birthday" value={birthday} />
        <Field text="phone" value={phone} />
        <Field text="city" value={city} />
      </ul>
    </>
  );
};

export default UserDataItem;
