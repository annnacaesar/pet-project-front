import { useTranslation } from 'react-i18next';
import { useGetUserPetsQuery } from 'redux/fetchPets';
import { selectors } from 'redux/selectors';
import { useSelector } from 'react-redux';
import { RotatingLines } from 'react-loader-spinner';

import PetsList from '../PetsList';

import scss from './PetsData.module.scss';

const PetsData = () => {
  const { t } = useTranslation();
  const token = useSelector(selectors.getToken);
  const { data, isFetching } = useGetUserPetsQuery(token, { skip: !token });

  return (
    <ul className={scss.pets__container}>
      {data &&
        !isFetching &&
        data.pets.length > 0 &&
        data.pets.map((pet) => (
          <li className={scss.pets__item} key={pet._id}>
            <PetsList {...pet} />
          </li>
        ))}
      {!isFetching && data.pets.length === 0 && (
        <div className={scss.pets__notFound}>
          <p className={scss.pets__NFtext}>{t('You havent added your pet yet')}</p>
        </div>
      )}
      {isFetching && (
        <div className={scss.pets__spinner}>
          <RotatingLines strokeColor="rgb(245, 146, 86)" strokeWidth="5" animationDuration="0.75" width="150" visible={true} />
        </div>
      )}
    </ul>
  );
};

export default PetsData;
