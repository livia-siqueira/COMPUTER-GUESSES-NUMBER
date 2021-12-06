import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import StartGamesScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOver from './screens/GameOver';
import * as Font from 'expo-font';
import {AppLoading} from 'expo'

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};


export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds)
  }
  
  const startGame = (selectedNumber) => {
    setUserNumber(selectedNumber);
  }

  const resetGame = () => {
    setUserNumber(null);
    setGuessRounds(0);
  }

  let content =  <StartGamesScreen onStartGame={startGame}/>

  if(userNumber && guessRounds <= 0 ) {
    content =    <GameScreen userChoice = {userNumber}  onGameOver = {gameOverHandler}/>
  }else if(guessRounds > 0){
    content = <GameOver onPress={resetGame} userNumber={userNumber} numberRounds={guessRounds}/>
  }
  
  return (
    <View style={styles.screen}>
      <Header title="Gess Numbers"/>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
