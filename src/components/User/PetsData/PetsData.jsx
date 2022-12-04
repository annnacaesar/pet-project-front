import { useTranslation } from 'react-i18next';
import { useGetUserPetsQuery } from 'redux/fetchPets';
import { selectors } from 'redux/selectors';
import { useSelector } from 'react-redux';
import { RotatingLines } from 'react-loader-spinner';

import PetsList from '../PetsList';

import scss from './PetsData.module.scss';
import { useEffect, useState } from 'react';

const PetsData = () => {
  const { t } = useTranslation();
  const token = useSelector(selectors.getToken);
  const { data, isLoading } = useGetUserPetsQuery(token, { skip: !token });
  const [pets, setPets] = useState([]);

useEffect(() => {
  if(data){
setPets(data.pets)
  }
}, [data])


  return (
    <ul className={scss.pets__container}>

      {pets.length !== 0 ?
        (pets.map((pet) => (
          <li className={scss.pets__item} key={pet._id}>
            <PetsList {...pet} />
          </li>
        ))) : 
        (<div className={scss.pets__notFound}>
          <p className={scss.pets__NFtext}>{t('You havent added your pet yet')}</p>
        </div>)}
        
      {isLoading && (
        <div className={scss.pets__spinner}>
          <RotatingLines strokeColor="rgb(245, 146, 86)" strokeWidth="5" animationDuration="0.75" width="150" visible={true} />
        </div>
      )}
    </ul>
  );
};

export default PetsData;
