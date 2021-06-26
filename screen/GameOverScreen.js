import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, Dimensions, ScrollView } from 'react-native';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import Colors from '../constants/colors';
import MainButton from '../components/MainButton';

const GameOverScreen = props => {
	const [availableDeviceWidth, setDeviceAvailableWidth] = useState(Dimensions.get('window').width);
	const [availableDeviceHeight, setDeviceAvailableHeight] = useState(Dimensions.get('window').height);

	useEffect(() => {
		const updateLayout = () => {
			setDeviceAvailableWidth(Dimensions.get('window').width);
			setDeviceAvailableHeight(Dimensions.get('window').height)
		}
		Dimensions.addEventListener('change', updateLayout);
		return (() => {
			Dimensions.removeEventListener('change', updateLayout);
		})
	});

	return (
		<ScrollView>
			<View style={styles.screen}>
				<TitleText>The Game is Over!</TitleText>
				<View style={{
					...styles.imageContianer, ...{
						width: availableDeviceWidth * 0.7,
						height: availableDeviceWidth * 0.7,
						borderRadius: availableDeviceWidth * 0.7 / 2,
						marginVertical: availableDeviceHeight / 30
					}
				}}>
					<Image
						// source={require('../assets/success.png')}
						source={{ uri: 'https://static01.nyt.com/images/2021/01/20/sports/19ALTsummit-k2-2-print/19summit-k2-2-articleLarge.jpg?quality=75&auto=webp&disable=upscale' }}
						style={styles.image}
						resizeMode='cover' />
				</View>
				<View style={{ ...styles.resultContainer, ...{ marginVertical: availableDeviceHeight / 60 } }}>
					<BodyText style={{
						...styles.resultText, ...{
							fontSize: availableDeviceHeight < 400 ? 16 : 20
						}
					}}>You phone needed{' '}
						<Text style={styles.highlight}>{props.roundsNumber}</Text>
						{' '}rounds to guess the number{' '}
						<Text style={styles.highlight}>{props.userNumber}</Text>.
					</BodyText>
				</View>
				<MainButton onPress={props.onRestart}>NEW GAME</MainButton>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 10
	},
	imageContianer: {
		borderWidth: 3,
		borderColor: 'black',
		overflow: 'hidden',
	},
	image: {
		width: '100%',
		height: '100%'
	},
	resultContainer: {
		marginHorizontal: 30
	},
	resultText: {
		textAlign: 'center'
	},
	highlight: {
		color: Colors.primary,
		fontFamily: 'open-sans-bold'
	}
});

export default GameOverScreen;

