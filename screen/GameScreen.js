import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, Alert, ScrollView, FlatList, Dimensions } from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import DefaultStyles from '../constants/default-styles';
import MainButton from '../components/MainButton';
import { Ionicons } from '@expo/vector-icons';
import BodyText from '../components/BodyText';
import * as ScreenOrientation from 'expo-screen-orientation';

const generateRandomBetween = (min, max, exclude) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	const rndNumber = Math.floor(Math.random() * (max - min)) + min;
	if (rndNumber === exclude) {
		return generateRandomBetween(min, max, exclude);
	} else {
		return rndNumber;
	}
}

// const renderListItem = (value, numOfRound) => (
// 	<View key={value} style={styles.listItem}>
// 		<BodyText>#{numOfRound}</BodyText>
// 		<BodyText>{value}</BodyText>
// 	</View>
// )

const renderListItem = (listLength, itemData) => (
	<View style={styles.listItem}>
		<BodyText>#{listLength - itemData.index}</BodyText>
		<BodyText>{itemData.item}</BodyText>
	</View>
)


const GameScreen = props => {
	// ScreenOrientation.lockAsync(ScreenOrientation.Orientation.PORTRAIT);
	const intialGuesses = generateRandomBetween(1, 100, props.userChoice);
	const [currentGuess, setCurrentGuess] = useState(intialGuesses);
	const [pastGuesses, setPastGuesses] = useState([intialGuesses.toString()]);
	const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
	const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);

	// const [rounds, setRounds] = useState(0);
	const currentLow = useRef(1);
	const currentHigh = useRef(100);
	const { userChoice, onGameOver } = props;

	useEffect(() => {
		const updateLayout = () => {
			setAvailableDeviceWidth(Dimensions.get('window').width);
			setAvailableDeviceHeight(Dimensions.get('window').height);
		}
		Dimensions.addEventListener('change', updateLayout);
		return () => {
			Dimensions.removeEventListener('change', updateLayout);
		}
	})

	useEffect(() => {
		if (currentGuess == userChoice) {
			onGameOver(pastGuesses.length);
		}
	}, [currentGuess, userChoice]);




	const nextGuessHandler = direction => {
		if ((direction === 'lower' && currentGuess < props.userChoice) ||
			(direction === 'greater' && currentGuess > props.userChoice)) {
			Alert.alert('Don\'t lie!', 'You know that this is wrong...',
				[{ text: 'Sorry', style: 'cancel' }]);
			return;
		}

		if (direction == 'lower') {
			currentHigh.current = currentGuess;
		} else {
			currentLow.current = currentGuess + 1;
		}

		const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
		setCurrentGuess(nextNumber);
		setPastGuesses(currentPassGuesses => [nextNumber.toString(), ...currentPassGuesses])
		// setRounds(currRounds => currRounds + 1);
	}

	let listContainerStyle = styles.listContainer;
	if (availableDeviceWidth < 350) {
		listContainerStyle = styles.listContainerBig;
	}

	let gameControls = (
		<React.Fragment>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card style={{...styles.buttonContainer, ...{ marginTop: availableDeviceHeight > 600 ? 20 : 5 }}}>
				<MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
					<Ionicons name="md-remove" size={24} color='white' />
				</MainButton>
				<MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
					<Ionicons name="md-add" size={24} color='white' />
				</MainButton>
			</Card>
		</React.Fragment>
	);

	if (availableDeviceHeight < 500) {
		gameControls = (
			<View style={styles.controls}>
				<MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
					<Ionicons name="md-remove" size={24} color='white' />
				</MainButton>
				<NumberContainer>{currentGuess}</NumberContainer>
				<MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
					<Ionicons name="md-add" size={24} color='white' />
				</MainButton>
			</View>
		);
	}

	return (
		<View style={styles.screen}>
			<Text style={DefaultStyles.titleText}>Opponent's Guess</Text>
			{gameControls}
			<View style={listContainerStyle}>
				{/* <ScrollView contentContainerStyle={styles.list}>
					{pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
				</ScrollView> */}
				<FlatList
					keyExtractor={item => item}
					data={pastGuesses}
					renderItem={renderListItem.bind(this, pastGuesses.length)}
					contentContainerStyle={styles.list} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: 'center'
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: 400,
		maxWidth: '90%'
	},
	controls: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		width: '80%'
	},
	listContainer: {
		flex: 1,
		width: '60%'
	},
	listContainerBig: {
		flex: 1,
		width: '80%'
	},
	list: {
		flexGrow: 1,
		// alignItems: 'center',
		justifyContent: 'flex-end'
	},
	listItem: {
		borderColor: '#ccc',
		borderWidth: 1,
		padding: 15,
		marginVertical: 10,
		backgroundColor: 'white',
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%'
	}
});

export default GameScreen;
