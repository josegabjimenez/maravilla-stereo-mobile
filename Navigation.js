import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

// Screens
import Home from './screens/Home';
import Schedule from './screens/Schedule';
import Podcast from './screens/Podcast';
import Ads from './screens/Ads';

// Icons
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const tabs = [
	{
		name: 'Home',
		label: 'Escuchar',
		component: Home,
		iconType: 'Ionicons',
		iconName: 'radio',
	},
	{
		name: 'Schedule',
		label: 'Programación',
		component: Schedule,
		iconType: 'MaterialIcons',
		iconName: 'schedule',
	},
	{
		name: 'Podcast',
		label: 'Podcasts',
		component: Podcast,
		iconType: 'MaterialCommunityIcons',
		iconName: 'podcast',
	},
	{
		name: 'Ads',
		label: 'Pautas',
		component: Ads,
		iconType: 'MaterialIcons',
		iconName: 'attach-money',
	},
];

const MyTabs = () => {
	return (
		<Tab.Navigator
			initialRouteName="Home"
			screenOptions={{
				tabBarActiveTintColor: '#007f5f',
			}}
		>
			{tabs.map((tab) => (
				<Tab.Screen
					key={tab.name}
					name={tab.name}
					component={tab.component}
					options={{
						tabBarLabel: tab.label,
						tabBarIcon: ({ color, size }) => {
							if (tab.iconType === 'Ionicons') {
								return (
									<Ionicons name={tab.iconName} size={size} color={color} />
								);
							}
							if (tab.iconType === 'MaterialIcons') {
								return (
									<MaterialIcons
										name={tab.iconName}
										size={size}
										color={color}
									/>
								);
							}
							if (tab.iconType === 'MaterialCommunityIcons') {
								return (
									<MaterialCommunityIcons
										name={tab.iconName}
										size={size}
										color={color}
									/>
								);
							}
						},
						headerShown: false,
					}}
				/>
			))}
			{/* <Tab.Screen
				name="Home"
				component={Home}
				options={{
					tabBarLabel: 'Escuchar',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="radio" size={size} color={color} />
					),
					headerShown: false,
				}}
			/>
			<Tab.Screen
				name="Schedule"
				component={Schedule}
				options={{
					tabBarLabel: 'Programación',
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name="schedule" size={size} color={color} />
					),
					headerShown: false,
				}}
			/>
			<Tab.Screen
				name="Podcast"
				component={Podcast}
				options={{
					tabBarLabel: 'Podcasts',
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="podcast" size={size} color={color} />
					),
					headerShown: false,
				}}
			/> */}
		</Tab.Navigator>
	);
};

const Navigation = () => {
	return (
		<NavigationContainer>
			<MyTabs />
		</NavigationContainer>
	);
};

export default Navigation;
