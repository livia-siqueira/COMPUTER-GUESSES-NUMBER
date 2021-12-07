


import React, { useState, useEffect } from "react";
import { Button, View, Alert, Text, StyleSheet, Keyboard, TouchableWithoutFeedback, ScrollView, Dimensions, KeyboardAvoidingView } from 'react-native'
import Card from "../components/Card";
import { Input } from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import { colors } from '../constants/colors.js';
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";


const StartGamesScreen = props => {


    const [newGame, setNewGame] = useState('');
    const [confirm, setConfirm] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);


    const numberInputHandler = inputText => {
        setNewGame(inputText.replace(/[^0-9]/g, ''));
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(newGame);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(`Invalid number! `, 'Number has to be a number between 1 and 99.',
                [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }])
            return;
        }
        setConfirm(true)
        setSelectedNumber(chosenNumber)
        setNewGame('');
        Keyboard.dismiss();
    }

    const resetInputHandler = () => {
        setConfirm(false);
        setNewGame('');
    }

    useEffect(() => {
        const updateLayout = () => {
          setButtonWidth(Dimensions.get("window").width / 4);
        };
    
        const subscription = Dimensions.addEventListener("change", updateLayout);
    
        return () => {
          subscription?.remove();
        };
      }, []);

    let confirmedOutPut;

    if (confirm) {
        confirmedOutPut = (
            <Card style={styles.summaryContainer}>
                <BodyText>You selected</BodyText>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress={() => props.onStartGame(selectedNumber)}>START GAME</MainButton>
            </Card>
        )
    }
    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
                    <View style={styles.screen}>
                        <TitleText style={styles.title}>Start a New Game</TitleText>
                        <Card style={styles.inputContent}>
                            <View style={styles.inputContent}>
                                <BodyText>Select a number</BodyText>
                                <Input onChangeText={numberInputHandler} value={newGame} style={styles.input} blurOnSubmit autoCapitalize='none' autoCorrect={false} keyboardType="number-pad" maxLength={2} />
                                <View style={styles.buttons}>
                                    <View style={{ width: buttonWidth }}><Button title="Reset" onPress={resetInputHandler} color={colors.accent} /></View>
                                    <View style={{ width: buttonWidth }}><Button title="Confirm" onPress={confirmInputHandler} color={colors.principal} /></View>
                                </View>
                            </View>
                        </Card>
                        {confirmedOutPut}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',

    },
    buttons: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    inputContent: {
        width: '80%',
        maxWidth: '95%',
        minWidth: 300,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
    },
    //button: {
    //width: 100
    //width: Dimensions.get('window').width / 4
    //},
    input: {
        width: 50,
        textAlign: "center"
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center',

    }
})

export default StartGamesScreen;