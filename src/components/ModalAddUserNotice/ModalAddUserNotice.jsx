import { ModalAddUserNoticeFirstPage } from './ModalAddUserNoticeFirstPage';
import { ModalAddUserNoticeSecondPage } from './ModalAddUserNoticeSecondPage';
import React, { useState } from 'react';
import { useAddNoticeMutation } from '../../redux/fetchNotice';

export const ModalAddUserNotice = props => {
	const [data, setData] = useState({
		title: '',
		name: '',
		dateOfBirth: '',
		breed: '',
		location: '',
		price: '',
		petImage: '',
		comments: '',
		category: '', //sell, inGoodHands, lostFound
		sex: '',
	});
	const [page, setPage] = useState(0);

	const formTitles = ['First Page', 'Second Page'];

	const [addNotice] = useAddNoticeMutation();

	const makeRequest = formData => {
		addNotice(formData);
	};

	const handleNextStep = (newData, final = false) => {
		setData(prev => ({ ...prev, ...newData }));
		setPage(prev => prev + 1);

		if (final && page === 1) {
			const {
				title,
				name,
				dateOfBirth,
				breed,
				location,
				price,
				comments,
        petImage,
				category,
				sex,
			} = newData;
			const formData = new FormData();
			formData.append('title', title);
			formData.append('name', name);
			formData.append('dateOfBirth', dateOfBirth);
			formData.append('breed', breed);
			formData.append('location', location);
			price && formData.append('price', price);
			formData.append('petImage', petImage);
			formData.append('comments', comments);
			formData.append('category', category);
			formData.append('sex', sex);
			makeRequest(formData);
			return;
		}
	};

	const handlePrevStep = newData => {
		setData(prev => ({ ...prev, ...newData }));
		setPage(prev => prev - 1);
	};

	const steps = [
		<ModalAddUserNoticeFirstPage
			closeModal={props.onCloseModal}
			next={handleNextStep}
			data={data}
			title={formTitles[page]}
		/>,
		<ModalAddUserNoticeSecondPage
			prev={handlePrevStep}
			closeModal={props.onCloseModal}
			next={handleNextStep}
			data={data}
			title={formTitles[page]}
		/>,
	];

	return <>{steps[page]}</>;
};
