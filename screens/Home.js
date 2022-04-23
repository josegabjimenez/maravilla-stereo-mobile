import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { WebView } from 'react-native-webview';
import { Audio } from 'expo-av';

const GOOGLE = 'https://www.google.com';

/* <div style="background-color: red; height: 100%">TEST</div> */
const STREAM_URI = 'http://stream.zeno.fm/m7e2znfd6nhvv';

const Home = () => {
	const [radio, setRadio] = useState();
	const [isPlaying, setIsPlaying] = useState(false);
	const [isStarted, setIsStarted] = useState(false);

	const playSound = async () => {
		if (!radio && !isStarted) {
			setIsStarted(true);
			const { sound } = await Audio.Sound.createAsync({
				uri: STREAM_URI,
			});
			setRadio(sound);
			await sound.playAsync();
			setIsPlaying(true);
		} else {
			if (isPlaying) {
				await radio.stopAsync();
				setIsPlaying(false);
				console.log(radio);
			} else {
				await radio.playAsync();
				setIsPlaying(true);
			}
		}
		console.log(radio?.isPlaying());
	};

	// useEffect(() => {

	// }, []);

	useEffect(() => {
		console.log(radio);
	}, [radio]);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>HELLLOOOOOO</Text>
			<Button
				onPress={playSound}
				title="Play Radio"
				color="#841584"
				accessibilityLabel="Botón para reproducir la radio"
			/>
			{/* <WebView
				source={{
					html: '<iframe src="https://zeno.fm/player/maravilla-stereo" width="100%" height="100%" frameborder="0" scrolling="no"></iframe>',
				}}
				style={{ width: '100%', height: 50 }}
			/> */}
			{/* <StatusBar style="auto" /> */}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: '#3333ac',
	},
	title: {
		fontSize: 30,
		color: 'white',
		fontWeight: 'bold',
		marginTop: 40,
	},
	webView: {
		// width: 400,
		// height: 400,
	},
});

export default Home;
