import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	ActivityIndicator,
} from 'react-native';
import { Audio } from 'expo-av';

// Icons
import { AntDesign } from '@expo/vector-icons';

// const GOOGLE = 'https://www.google.com';

const STREAM_URI = 'http://stream.zeno.fm/m7e2znfd6nhvv';

const Home = () => {
	const [radio, setRadio] = useState();
	const [isPlaying, setIsPlaying] = useState(false);
	const [isStarted, setIsStarted] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	const playSound = async () => {
		try {
			if (!radio && !isStarted) {
				setIsLoading(true);
				setIsStarted(true);
				const { sound } = await Audio.Sound.createAsync({
					uri: STREAM_URI,
				});
				setRadio(sound);
				await sound.playAsync();
				setIsPlaying(true);
				setIsLoading(false);
			} else {
				if (isPlaying) {
					setIsLoading(true);
					await radio.unloadAsync();
					setIsPlaying(false);
					setIsStarted(false);
					setRadio(null);
					setIsLoading(false);
				}
			}
		} catch (err) {
			setIsError(true);
		}
	};

	useEffect(() => {
		console.log(radio);
	}, [radio]);

	return (
		<View style={styles.container}>
			<Image
				style={styles.image}
				source={require('../assets/images/splashscreen.jpeg')}
			/>
			<TouchableOpacity style={styles.button} onPress={playSound}>
				{isLoading ? (
					<ActivityIndicator size="large" color="#ffff3f" />
				) : isStarted ? (
					<AntDesign name="pausecircleo" size={64} color="#ffff3f" />
				) : (
					<AntDesign name="play" size={64} color="#ffff3f" />
				)}
			</TouchableOpacity>
			{isError && <Text>Hubo un error, intenta de nuevo.</Text>}
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
		fontSize: 30,
		color: 'white',
		fontWeight: 'bold',
		marginTop: 40,
	},
	image: {
		height: '100%',
		width: '100%',
	},
	button: {
		position: 'absolute',
		bottom: 100,
	},
});

export default Home;
