import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import Colors from '../constants/colors';
import TitleText from './TitleText';

const Header = props => {
	return (
		<View style={{
			...styles.headerBase,
			...Platform.select({ ios: styles.headerIOS, android: styles.hedaerAndroid })
		}}>
			<TitleText style={styles.title}>{props.title}</TitleText>
		</View >
	);
}

const styles = StyleSheet.create({
	// header: {
	// 	width: '100%',
	// 	height: 90,
	// 	paddingTop: 36,
	// 	backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white',
	// 	alignItems: 'center',
	// 	justifyContent: 'center',
	// 	borderBottomColor: Platform.OS === 'ios' ? '#ccc' : 'transparent',
	// 	borderBottomWidth: Platform.OS === 'ios' ? 1 : 0
	// },
	headerBase: {
		width: '100%',
		height: 90,
		paddingTop: 36,
		alignItems: 'center',
		justifyContent: 'center'
	},
	headerIOS: {
		backgroundColor: 'white',
		borderBottomColor: '#ccc',
		borderBottomWidth: 1
	},
	hedaerAndroid: {
		backgroundColor: Colors.primary,
		// borderBottomColor: 'transparent',
		// borderBottomWidth: 0
	},
	title: {
		color: Platform.OS === 'ios' ? Colors.primary : 'white'
	}
});

export default Header;