import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import { Audio } from 'expo-av';
import AppLoading from 'expo-app-loading';

export default function App() {
	const [sound, setSound] = useState();
	const [isLoading, setIsLoading] = useState(true);

	const playSound = async () => {
		const { sound } = await Audio.Sound.createAsync(
			require('./assets/sounds/initialSound.mp3')
		);
		setSound(sound);
		sound.setOnPlaybackStatusUpdate(async (status) => {
			if (status.didJustFinish === true) {
				// Audio just finished playing
				await sound.unloadAsync();
				setIsLoading(false);
			}
		});
		await sound.playAsync();
	};

	useEffect(() => {
		playSound();
	}, []);

	useEffect(() => {
		return sound
			? () => {
					sound.unloadAsync();
					// setIsLoading(false);
			  }
			: undefined;
	}, [sound]);

	if (isLoading) {
		return <AppLoading />;
	}

	return <Navigation />;
}
