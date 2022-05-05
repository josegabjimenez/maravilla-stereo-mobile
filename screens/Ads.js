import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	Linking,
	TouchableOpacity,
	Dimensions,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';

// Fetch data
import useGetData from '../hooks/useGetData';
import endPoints from '../api/endPoints';

// Icons
import { FontAwesome } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = SCREEN_WIDTH * 0.88;

const carouselCardItem = ({ item, index }) => {
	return (
		<View style={styles.carouselContainer} key={item.url}>
			<Image style={styles.carouselImage} source={{ uri: item.url }} />
		</View>
	);
};

const Ads = () => {
	const [images, setImages] = useState([]);
	const {
		data: { data },
		isLoading,
		isError,
	} = useGetData(endPoints.ads.getAll);

	const getImages = () => {
		const arrOfImages = [];
		data.forEach((item) => {
			arrOfImages.push({ url: item.attributes.url_image });
		});
		setImages(arrOfImages);
		// data.map((item) => {
		// 	setImages([
		// 		...images,
		// 		{
		// 			// width: item.attributes.logo.data.attributes.width,
		// 			// height: item.attributes.logo.data.attributes.height,
		// 			// url: `${endPoints.api}${item.attributes.logo.data.attributes.url}`,
		// 			url: `${item.attributes.url_image}`,
		// 		},
		// 	]);
		// });
	};

	useEffect(() => {
		if (data) {
			getImages();
		}
	}, [data]);

	if (isLoading || !data) {
		return (
			<View style={styles.container}>
				<Text>Loading...</Text>
			</View>
		);
	}

	if (isError) {
		return (
			<View style={styles.container}>
				<Text>Hubo un error en el servidor. Vuelve a intentar</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Nuestros Clientes</Text>
			<View>
				<Carousel
					data={images}
					renderItem={carouselCardItem}
					sliderWidth={SCREEN_WIDTH}
					sliderHeight={SCREEN_WIDTH}
					itemWidth={ITEM_WIDTH}
					containerCustomStyle={{ flexGrow: 0 }}
					autoplay={true}
					loop={true}
				/>
			</View>
			<TouchableOpacity
				style={styles.button}
				onPress={() => {
					Linking.openURL(
						'whatsapp://send?text=Hola%20Maravilla%20Stereo!,%20estoy%20interesado%20en%20pautar&phone=+573027489458'
					);
				}}
			>
				<Text style={styles.button_text}>¡Contáctanos para publicitarte! </Text>
				<FontAwesome name="whatsapp" size={30} color="white" />
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontSize: 40,
		fontWeight: 'bold',
		marginBottom: 30,
	},
	carousel: {
		backgroundColor: 'red',
	},
	carouselContainer: {
		width: ITEM_WIDTH,
	},
	carouselImage: {
		height: ITEM_WIDTH,
		borderRadius: 10,
	},
	button: {
		backgroundColor: '#007f5f',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		marginTop: 30,
		padding: 10,
	},
	button_text: {
		color: 'white',
		marginRight: 8,
		fontSize: 20,
	},
});

export default Ads;
