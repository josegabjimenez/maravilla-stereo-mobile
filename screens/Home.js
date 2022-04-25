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
				const radioObject = await Audio.Sound.createAsync({
					uri: STREAM_URI,
				});
				setRadio(radioObject.sound);
				await radioObject.sound.playAsync();
				// await Audio.setAudioModeAsync({
				// 	staysActiveInBackground: true,
				// 	interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
				// 	shouldDuckAndroid: true,
				// 	playThroughEarpieceAndroid: true,
				// 	allowsRecordingIOS: true,
				// 	interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
				// 	playsInSilentModeIOS: true,
				// });
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

	return (
		<View style={styles.container}>
			<Image
				style={styles.backgroundImage}
				source={require('../assets/images/microphone.png')}
			/>
			<Image
				style={styles.image}
				source={require('../assets/images/logo_canvas_white.png')}
			/>
			<TouchableOpacity style={styles.button} onPress={playSound}>
				{isLoading ? (
					<ActivityIndicator size="large" color="#007f5f" />
				) : isStarted ? (
					<AntDesign name="pausecircleo" size={64} color="#007f5f" />
				) : (
					<AntDesign name="play" size={64} color="#007f5f" />
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
	backgroundImage: {
		position: 'absolute',
		top: 0,
		height: '100%',
		width: '100%',
	},
	image: {
		height: 200,
		width: '80%',
		borderRadius: 15,
	},
	button: {
		position: 'absolute',
		bottom: 100,
	},
});

export default Home;
