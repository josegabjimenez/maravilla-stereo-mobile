// import config from '../config';
import { API_URL } from '@env';

const endPoints = {
	programacion: {
		getAll: `${API_URL}/programacions?populate=*`,
		get: (id) => `${API_URL}programacions/${id}?populate=*`,
	},
	podcast: {
		getAll: `${API_URL}podcasts`,
		get: (id) => `${API_URL}podcasts/${id}`,
	},
};

export default endPoints;
