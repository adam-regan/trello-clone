import axios from 'axios';
const baseUrl = '/api';

export const getAllLists = () => {
	return axios.get(`${baseUrl}/lists`);
}

export const getList = (id: string) => {
	return axios.get(`${baseUrl}/lists/${id}`);
}

export const addList = (name: string) => {
	return axios.post(`${baseUrl}/lists/add`, {
		list_name: name
	})
}

export const deleteList = (id: string) => {
	return axios.delete(`${baseUrl}/lists/${id}`);
}

export const addCard = (name: string, listID: string) => {
	return axios.post(`${baseUrl}/cards/add`, {
		card_name: name,
		list_id: listID
	})
}

export const editCard = (id: string, name: string) => {
	return axios.put(`${baseUrl}/cards/${id}`, {
		card_name: name
	})
}

export const deleteCard = (id: string) => {
	return axios.delete(`${baseUrl}/cards/${id}`);
}

export const getCards = (listID: string) => {
	return axios.get(`${baseUrl}/cards/list/${listID}`);
}