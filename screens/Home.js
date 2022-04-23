import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const GOOGLE = 'https://www.google.com';

const Home = () => {
	return (
		<View style={{ flex: 1 }}>
			<Text style={{ marginTop: 40 }}>HELLLOOOOOO</Text>
			<WebView
				source={{
					html: '<iframe src="https://zeno.fm/player/maravilla-stereo" width="100%" height="500" frameborder="0" scrolling="no"></iframe><a href="https://zeno.fm/" target="_blank" style="display: block; font-size: 0.9em; line-height: 10px;">A Zeno.FM Station</a>',
				}}
				style={{ width: '100%', height: '100%' }}
			/>
			{/* <StatusBar style="auto" /> */}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#3333ac',
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 30,
		color: 'white',
		fontWeight: 'bold',
	},
	webView: {
		// width: 400,
		// height: 400,
	},
});

export default Home;
