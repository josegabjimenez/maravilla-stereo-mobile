import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetData = (API) => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	const getData = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios.get(API);
			setData(data);
			setIsLoading(false);
		} catch (err) {
			setIsError(err);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return { data, isLoading, isError };
};

export default useGetData;
