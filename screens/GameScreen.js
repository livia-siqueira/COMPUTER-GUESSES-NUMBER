import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Alert, ScrollView, Dimensions } from 'react-native'
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import defaultStyles from "../constants/default-styles";
import MainButton from "../components/MainButton";
import { Ionicons } from '@expo/vector-icons'
import BodyText from "../components/BodyText";



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

const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem}>
        <BodyText>#{listLength - itemData.index}</BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>
);


const GameScreen = props => {
    const initialNumber = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialNumber);
    const [pastGuesses, setPastGuesses] = useState([initialNumber.toString()]);
    const currentLow = useRef(1);
    const currentHight = useRef(100);
    const { userChoice, onGameOver } = props;
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
        Dimensions.get("window").width
    );
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
        Dimensions.get("window").height
    );

    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get("window").width);
            setAvailableDeviceHeight(Dimensions.get("window").height);
        };

        const subscription = Dimensions.addEventListener("change", updateLayout);

        return () => {
            subscription?.remove();
        };
    }, []);


    useEffect(() => {
        if (currentGuess === userChoice) {
            props.onGameOver(pastGuesses.length);
        }
    }, [userChoice, onGameOver, currentGuess])

    const nextGuessHandler = type => {
        if ((type === 'LOWER' && currentGuess < props.userChoice) || (type === 'GREATER') && currentGuess > props.userChoice) {
            Alert.alert('Don\'t lie!', 'You know that this is wrong...',
                [{ text: 'Sorry', style: 'cancel' }]
            );
            return;
        }
        if (type === "LOWER") {
            currentHight.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHight.current, currentGuess)
        setCurrentGuess(nextNumber);
        setPastGuesses(curPastGuesses => [
            nextNumber.toString(),
            ...curPastGuesses,
        ]);
    }

    let listContainerStyles = styles.listContainer;

    if (availableDeviceWidth > 350) listContainerStyles = styles.listContainerBig;

    if (availableDeviceHeight < 500) {
        return (
            <View style={styles.screen}>
                <Text style={defaultStyles.title}>Opponent's</Text>
                <View style={styles.controls}>
                    <MainButton onPress={nextGuessHandler.bind(this, 'LOWER')}><Ionicons name="md-remove" size={24} color="white" /></MainButton>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <MainButton onPress={nextGuessHandler.bind(this, 'GREATER')}><Ionicons name="md-add" size={24} color="white" /></MainButton>
                </View>
                <View style={listContainerStyles}>
                    { /*<ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
            </ScrollView>*/}
                    <FlatList
                        keyExtractor={item => item}
                        data={pastGuesses}
                        renderItem={renderListItem.bind(this, pastGuesses.length)}
                        contentContainerStyle={styles.list}
                    />
                </View>
            </View>
        )
    }

    return (
        <View style={styles.screen}>
            <Text style={defaultStyles.title}>Opponent's</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={{
                ...styles.buttonContainer,
                ...{ marginTop: availableDeviceHeight > 600 ? 20 : 5 },
            }}>
                <MainButton onPress={nextGuessHandler.bind(this, 'LOWER')}><Ionicons name="md-remove" size={24} color="white" /></MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'GREATER')}><Ionicons name="md-add" size={24} color="white" /></MainButton>
            </Card>
            <View style={styles.listContainer}>
                { /*<ScrollView contentContainerStyle={styles.list}>
            {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
    </ScrollView>*/}
                <FlatList
                    keyExtractor={item => item}
                    data={pastGuesses}
                    renderItem={renderListItem.bind(this, pastGuesses.length)}
                    contentContainerStyle={styles.list}
                />
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
        width: "80%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
    listContainer: {
        flex: 1,
        width: '60%'
    },
    list: {
        flexGrow: 1,
        // alignItems: 'center', -- os itens foram alinhados pois ocupam 100% do container em que estão inseridos e estão com space-between
        justifyContent: 'flex-end',
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
    },
    listContainerBig: {
        flex: 1,
        width: '80%',
    }
})

export default GameScreen;