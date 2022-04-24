import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

// Screens
import Home from './screens/Home';
import Schedule from './screens/Schedule';

// Icons
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const MyTabs = () => {
	return (
		<Tab.Navigator
			initialRouteName="Escuchar"
			screenOptions={{
				tabBarActiveTintColor: '#007f5f',
			}}
		>
			<Tab.Screen
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
