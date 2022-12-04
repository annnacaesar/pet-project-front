import { ModalAddsPetFirstPage } from './ModalAddsPetFirstPage';
import { ModalAddsPetSecondPage } from './ModalAddsPetSecondPage';
import React, { useState } from 'react';
import { usePostPetMutation } from '../../redux/fetchPets';
import { getFormData } from 'services/getFormData';

export const ModalAddsPet = props => {
	const [addPets] = usePostPetMutation();
	const [page, setPage] = useState(0);
	const [data, setData] = useState({
		name: '',
		dateOfBirth: '',
		breed: '',
		petImage: '',
		comments: '',
	});

	const makeRequest = formData => {
		addPets(formData);
	};

	const handleNextStep = (newData, final = false) => {
		setData(prev => ({ ...prev, ...newData }));
		setPage(prev => prev + 1);

		if (final && page === 1) {
			const formData = getFormData(newData);
			makeRequest(formData);
			return;
		}
	};

	const handlePrevStep = newData => {
		setData(prev => ({ ...prev, ...newData }));
		setPage(prev => prev - 1);
	};

	const steps = [
		<ModalAddsPetFirstPage
			closeModal={props.onCloseModal}
			next={handleNextStep}
			data={data}
		/>,
    <ModalAddsPetSecondPage
    closeModal={props.onCloseModal}
    prev={handlePrevStep}
    next={handleNextStep}
    data={data}
		/>,
	];
	return <>{steps[page]}</>;
};
