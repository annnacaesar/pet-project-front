import { useEffect, useState } from 'react';
import { useUpdateUserMutation } from 'redux/fetchUser';
import { toast } from 'react-toastify';
import { toastMainOptions } from 'config';
import { RotatingLines } from 'react-loader-spinner';

import Calendar from '../Calendar';

import sprite from 'images/symbol-defs.svg';
import scss from './Field.module.scss';

export const FieldBirthday = ({ text, value }) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [userBirthday, setUserBirthday] = useState('');

  const [updateUser, { isError, isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    if (isError) {
      toast.error('Invalid value or format', toastMainOptions);
      setIsUpdate(true);
    }
  }, [isError]);

  const handleSend = () => {
    if (userBirthday.length === 0 || value === userBirthday) {
      setIsUpdate(false);
      return;
    } else {
      const date = JSON.parse(userBirthday);
      updateUser({ birthday: date });
      setIsUpdate(false);
    }
  };
  const handleDate = (e) => {
    setUserBirthday(e);
  };

  return (
    <li className={scss.user__items}>
      <p>{text}:</p>
      {isUpdate ? (
        <>
          <Calendar
            onHandleDate={handleDate}
            customStyleMobile={scss.input__birthday}
            customStyleDesktop={scss.input__birthdayDesk}
            onBirthday={value}
          />
          <div className={scss.btn__info}>
            <button className={scss.input__btn} type="button" onClick={handleSend}>
              <svg className={scss.icon__profileCheckMark}>
                <use href={sprite + '#icon-profileCheckMark'} />
              </svg>
            </button>
          </div>
        </>
      ) : (
        <>
          {!value ? <span className={scss.items_info}>00.00.0000</span> : <span className={scss.items_info}>{value}</span>}
          <div className={scss.btn__info}>
            <button className={scss.change__btn} onClick={() => setIsUpdate(true)}>
              {isLoading ? (
                <RotatingLines strokeColor="#ffffff" strokeWidth="5" animationDuration="0.75" width="20" visible={true} />
              ) : (
                <svg className={scss.icon__profilePencil}>
                  <use href={sprite + '#icon-profilePencil'} />
                </svg>
              )}
            </button>
          </div>
        </>
      )}
    </li>
  );
};
