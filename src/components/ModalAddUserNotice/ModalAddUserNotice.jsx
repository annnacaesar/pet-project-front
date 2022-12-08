import { ModalAddUserNoticeFirstPage } from './ModalAddUserNoticeFirstPage';
import { ModalAddUserNoticeSecondPage } from './ModalAddUserNoticeSecondPage';
import { ModalAddUserNoticeThirdPage } from './ModalAddUserNoticeThirdPage';
import React, { useState } from 'react';
import { useAddNoticeMutation } from '../../redux/fetchNotice';
import { getFormData } from 'services/getFormData';

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

	const [addNotice] = useAddNoticeMutation();

	const makeRequest = formData => {
		addNotice(formData);
	};

	const handleNextStep = (newData, final = false) => {
		setData(prev => ({ ...prev, ...newData }));
		setPage(prev => prev + 1);

		if (final && page === 2) {
			const formData = getFormData(newData)
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
		/>,
		<ModalAddUserNoticeSecondPage
		prev={handlePrevStep}
		closeModal={props.onCloseModal}
		next={handleNextStep}
		data={data}
		/>,
		<ModalAddUserNoticeThirdPage
			prev={handlePrevStep}
			closeModal={props.onCloseModal}
			next={handleNextStep}
			data={data}
		/>,
	];

	return <>{steps[page]}</>;
};
