import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import useGetData from '../hooks/useGetData';
import { API_URL } from '@env';
import endPoints from '../api/endPoints';

// Icons
import { MaterialIcons } from '@expo/vector-icons';

const Schedule = () => {
	// const { data, isLoading } = useGetData(`${API_URL}/programacions`);
	const { data, isLoading, isError } = useGetData(
		endPoints.programacion.getAll
	);

	console.log(endPoints.programacion.getAll);
	console.log(data);
	console.log(isError);

	if (isLoading) {
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
		<SafeAreaView style={styles.container}>
			<ScrollView style={styles.scrollView}>
				{data?.data?.map((dia) => (
					<View key={dia.id} style={styles.dayView}>
						<Text style={styles.dayTitle}>{dia.attributes.dia}</Text>
						{dia.attributes.programas.map((programa) => (
							<View key={programa.id} style={styles.dayProgram}>
								<Text style={styles.dayProgramName}>{programa.nombre}</Text>
								<View style={styles.dayProgramInfo}>
									<Text style={styles.dayProgramTime}>
										{programa.hora_inicio.substr(0, 5)}
									</Text>
									<Text style={styles.dayProgramTime}>
										{programa.hora_final.substr(0, 5)}
									</Text>
									<MaterialIcons name="favorite-border" size={18} color="red" />
									{/* <MaterialIcons name="favorite" size={18} color="red" /> */}
								</View>
							</View>
						))}
						{/* <Text>{dia.attributes.hora}</Text> */}
					</View>
				))}
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
	},
	scrollView: {
		marginTop: 40,
		width: '100%',
		paddingLeft: 10,
		// backgroundColor: 'red',
	},
	dayView: {
		width: '95%',
		// backgroundColor: 'red',
		marginBottom: 10,
	},
	dayTitle: {
		fontWeight: 'bold',
		fontSize: 30,
		color: 'red',
	},
	dayProgram: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 5,
		// backgroundColor: 'blue',
	},
	dayProgramName: {
		fontSize: 18,
		color: '#05100c',
	},
	dayProgramInfo: {
		display: 'flex',
		flexDirection: 'row',
	},
	dayProgramTime: {
		fontSize: 18,
		marginRight: 5,
	},
});

export default Schedule;
