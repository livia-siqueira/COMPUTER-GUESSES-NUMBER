


import React, { useState } from "react";
import { Button, View, Alert, Text, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native'
import Card from "../components/Card";
import { Input } from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import { colors } from '../constants/colors.js'

const StartGamesScreen = props => {


    const [newGame, setNewGame] = useState('');
    const [confirm, setConfirm] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

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

    let confirmedOutPut;

    if (confirm) {
        confirmedOutPut = (
            <Card style={styles.summaryContainer}>
                <Text>You selected</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <Button title ="START GAME" onPress={() => props.onStartGame(selectedNumber)}/>
            </Card>
        )
    }
    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <View style={styles.screen}>
                <Text style={styles.title}>Start a New Game</Text>
                <Card style={styles.inputContent}>
                    <View style={styles.inputContent}>
                        <Text>Select a number</Text>
                        <Input onChangeText={numberInputHandler} value={newGame} style={styles.input} blurOnSubmit autoCapitalize='none' autoCorrect={false} keyboardType="number-pad" maxLength={2} />
                        <View style={styles.buttons}>
                            <View style={styles.button}><Button title="Reset" onPress={resetInputHandler} color={colors.accent} /></View>
                            <View style={styles.button}><Button title="Confirm" onPress={confirmInputHandler} color={colors.principal} /></View>
                        </View>
                    </View>
                </Card>
                {confirmedOutPut}
            </View>
        </TouchableWithoutFeedback>
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
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginTop: 20
    },
    inputContent: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
    },
    button: {
        width: 100
    },
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