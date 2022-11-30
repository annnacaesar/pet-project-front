import { useState } from 'react';
import { useUpdatePetMutation } from 'redux/fetchPets';
import { toast } from 'react-toastify';
import { toastMainOptions } from 'config';

import { Input } from 'components/Input';

import sprite from 'images/symbol-defs.svg';
import scss from './PetsList.module.scss';

const FieldPetsName = ({ text, value, onIsUpdate, _id }) => {
  const [isUpdate, setIsUpdate] = useState(onIsUpdate);
  const [petsName, setPetsName] = useState(value);

  const [updatePet] = useUpdatePetMutation();

  const handleSend = () => {
    const validate = /^[a-zA-Z\s]+$/;
    if (petsName.length === 0 || value === petsName) {
      return setIsUpdate(false);
    } else {
      updatePet({ _id, [text]: petsName });
      setIsUpdate(false);
    }
    if (!validate.test(petsName)) {
      toast.error(`Invalid value, must be a string`, toastMainOptions);
    }
  };

  return (
    <li className={scss.pets__items}>
      {isUpdate ? (
        <button className={scss.pets__save} type="button" onClick={handleSend}>
          <svg className={scss.icon__profileCheckMark}>
            <use href={sprite + '#icon-profileCheckMark'} />
          </svg>
        </button>
      ) : (
        <button className={scss.pats__btn} type="button" onClick={() => setIsUpdate(true)}>
          <svg className={scss.pets__svg}>
            <use href={sprite + '#icon-profilePencil'} />
          </svg>
        </button>
      )}
      <p className={scss.pets__subtitle}>{text}:</p>
      {isUpdate ? (
        <div className={scss.pets__changeBox}>
          <Input value={petsName} customStyle={scss.input__change} name={text} onChange={(e) => setPetsName(e.currentTarget.value)} />
        </div>
      ) : (
        <>
          <span className={scss.pets__info}>{value}</span>
        </>
      )}
    </li>
  );
};
export default FieldPetsName;
