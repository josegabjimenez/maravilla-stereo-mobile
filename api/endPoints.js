// import config from '../config';
import { API_URL, MEDIA_URL } from '@env';

const endPoints = {
	api: MEDIA_URL,
	programacion: {
		getAll: `${API_URL}/programacions?populate=*`,
		get: (id) => `${API_URL}/programacions/${id}?populate=*`,
	},
	podcast: {
		getAll: `${API_URL}/podcasts`,
		get: (id) => `${API_URL}/podcasts/${id}`,
	},
	ads: {
		getAll: `${API_URL}/pautas?populate=*`,
		get: (id) => `${API_URL}/pautas/${id}?populate=*`,
	},
};

export default endPoints;
