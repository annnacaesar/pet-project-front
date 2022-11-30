import { useState } from 'react';
import { useDeletePetMutation } from 'redux/fetchPets';
import { toast } from 'react-toastify';
import { toastMainOptions } from 'config';

import FieldPetsImg from './FieldPetsImg';
import FieldPetsName from './FieldPetsName';
import FieldPetsBirthday from './FieldPetsBirthday';
import FieldPetsComments from './FieldPetsComments';

import sprite from 'images/symbol-defs.svg';
import scss from './PetsList.module.scss';

const PetsList = ({ petImage, name, dateOfBirth, breed, comments, _id }) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [deletePet] = useDeletePetMutation();

  const deletePets = () => {
    deletePet(_id);
    toast.success(`You deleted a pet, ${name}`, toastMainOptions);
  };

  return (
    <>
      {isUpdate ? (
        <div>
          <button className={scss.pets__save} type="button" onClick={() => setIsUpdate(false)}>
            <svg className={scss.icon__profileCheckMark}>
              <use href={sprite + '#icon-profileCheckMark'} />
            </svg>
          </button>
        </div>
      ) : (
        <>
          <div className={scss.pats__btns}>
            <button className={scss.pats__delete} type="button" onClick={deletePets}>
              <svg className={scss.pets__deleteSvg}>
                <use href={sprite + '#icon-remov-pets'} />
              </svg>
            </button>
          </div>
          <FieldPetsImg petImage={petImage} _id={_id} />
          <ul className={scss.pets__list}>
            <FieldPetsName value={name} text="name" onIsUpdate={isUpdate} _id={_id} />
            <FieldPetsBirthday value={dateOfBirth} _id={_id} />
            <FieldPetsName value={breed} text="breed" _id={_id} />
            <FieldPetsComments value={comments} _id={_id} />
          </ul>
        </>
      )}
    </>
  );
};

export default PetsList;
