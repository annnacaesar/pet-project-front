import { useAddAvatarToPetMutation } from 'redux/fetchPets';
import sprite from 'images/symbol-defs.svg';
import scss from './PetsList.module.scss';

const FieldPetsImg = ({ petImage, _id }) => {
  const [addAvatarToPet] = useAddAvatarToPetMutation();

  const imageHandler = async (e) => {
    const fileUploaded = e.target.files[0];
    const file = new FormData();
    file.append('petImage', fileUploaded);
    addAvatarToPet({ _id, petImage: file });
  };

  return (
    <div className={scss.pets__imgContainer}>
      <div className={scss.pets__imgBox}>
        <img className={scss.pets__animalImg} src={petImage} alt="pet" />
      </div>
      <div className={scss.pets__imgAdd}>
        <input className={scss.input__file} type="file" name="petImage" id={_id} accept="image/*" onChange={(e) => imageHandler(e)} />
        <label className={scss.input__fileButton} htmlFor={_id}>
          <svg className={scss.info__camera} width="30" height="30">
            <use href={sprite + '#icon-profilePhotoCamera'} />
          </svg>
        </label>
      </div>
    </div>
  );
};
export default FieldPetsImg;
