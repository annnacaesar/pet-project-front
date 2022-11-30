import { ModalAddsPetFirstPage } from './ModalAddsPetFirstPage';
import { ModalAddsPetSecondPage } from './ModalAddsPetSecondPage';
import React, { useState } from 'react';
import { usePostPetMutation } from '../../redux/fetchPets';
import { useTranslation } from 'react-i18next';

export const ModalAddsPet = (props) => {
  const { t } = useTranslation();

  const [addPets] = usePostPetMutation();
  const [page, setPage] = useState(0);
  const [data, setData] = useState({
    name: '',
    dateOfBirth: '',
    breed: '',
    petImage: "",
    comments: '',
  });

  const makeRequest = (formData) => {
    addPets(formData);
  };

  const handleNextStep = (newData, final = false) => {
    setData((prev) => ({ ...prev, ...newData }));
    setPage((prev) => prev + 1);

    if (final && page === 1) {
      const {name, dateOfBirth, breed, petImage, comments } = newData;
      const formData = new FormData();
      formData.append('name', name);
      formData.append('dateOfBirth', dateOfBirth);
      formData.append('breed', breed);
      formData.append('petImage', petImage);
      formData.append('comments', comments);
      makeRequest(formData);
      return;
    }
  };

  const handlePrevStep = (newData) => {
    setData((prev) => ({ ...prev, ...newData }));
    setPage((prev) => prev - 1);
  };

  const steps = [
    <ModalAddsPetFirstPage closeModal={props.onCloseModal} next={handleNextStep} data={data} title={t('First Page')} />,
    <ModalAddsPetSecondPage closeModal={props.onCloseModal} prev={handlePrevStep} next={handleNextStep} data={data} title={t('Second Page')} />
  ];
  // console.log('data', data);
  return <>{steps[page]}</>;
};

// import { useModal } from 'hooks';
// import Modal from 'components/Modal';
// import { ModalAddsPet } from 'components/ModalAddsPet';
// import { ModalAddsPetSell } from 'components/ModalAddsPetSell';

// function Home() {
//   const { isModalOpen, closeModal, toggleModal } = useModal();

//   return (
//     <div>
//       {isModalOpen && (
//         <Modal onCloseModal={closeModal} mode="dark">
//           {/* <ModalAddsPet onCloseModal={closeModal} /> */}
//           <ModalAddsPetSell onCloseModal={closeModal } />
//         </Modal>
//       )}
//       Home pages
//       <button type="button" onClick={toggleModal} style={{ width: 40, height: 40, backgroundColor: 'blue' }}></button>
//     </div>
//   );
// }

// export default Home;
