import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	Linking,
	TouchableOpacity,
	ScrollView,
	Dimensions,
} from 'react-native';

// Fetch data
import useGetData from '../hooks/useGetData';
import endPoints from '../api/endPoints';

// Icons
import { FontAwesome } from '@expo/vector-icons';

const WIDTH = Dimensions.get('window').width;

const Ads = () => {
	const [images, setImages] = useState([]);
	const {
		data: { data },
		isLoading,
		isError,
	} = useGetData(endPoints.ads.getAll);

	const getImages = () => {
		data.map((item) => {
			setImages([
				...images,
				{
					// width: item.attributes.logo.data.attributes.width,
					// height: item.attributes.logo.data.attributes.height,
					// url: `${endPoints.api}${item.attributes.logo.data.attributes.url}`,
					url: `${item.attributes.url_image}`,
				},
			]);
		});
	};

	console.log(images);

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
			<ScrollView style={styles.carousel} pagingEnabled horizontal>
				{images.map((image) => (
					<View key={image.url} style={styles.imageContainer}>
						<Image
							style={{ width: 207, height: 156 }}
							source={{ uri: image.url }}
						/>
					</View>
				))}
			</ScrollView>
			<TouchableOpacity
				style={styles.button}
				onPress={() => {
					Linking.openURL(
						'whatsapp://send?text=Hola%20Maravilla%20Stereo!&phone=+573027489458'
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
	carousel: {
		width: '100%',
		maxHeight: 156,
		textAlign: 'center',
	},
	title: {
		fontSize: 40,
		fontWeight: 'bold',
		marginBottom: 80,
	},
	imageContainer: {
		// backgroundColor: 'blue',
		width: WIDTH,
		display: 'flex',
		alignItems: 'center',
	},
	image: {
		width: '100%',
		height: '20%',
	},
	button: {
		backgroundColor: '#007f5f',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		marginTop: 80,
		padding: 10,
	},
	button_text: {
		color: 'white',
		marginRight: 8,
		fontSize: 20,
	},
});

export default Ads;
