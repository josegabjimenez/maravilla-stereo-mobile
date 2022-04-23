import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import { Audio } from 'expo-av';

export default function App() {
	const [sound, setSound] = useState();

	const playSound = async () => {
		const { sound } = await Audio.Sound.createAsync(
			require('./assets/sounds/initialSound.mp3')
		);
		setSound(sound);
		await sound.playAsync();
	};

	useEffect(() => {
		playSound();
	}, []);

	useEffect(() => {
		return sound
			? () => {
					sound.unloadAsync();
			  }
			: undefined;
	}, [sound]);

	return <Navigation />;
}
