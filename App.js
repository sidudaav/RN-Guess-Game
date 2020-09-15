import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Fonts from 'expo-font'
import { AppLoading } from 'expo'

import Header from './components/Header'

import StartGameScren from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen'
import GameOverScreen from './screens/GameOverScreen'

const fetchFonts = () => {
  return (
    Fonts.loadAsync({
      'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    })
  )
}

export default function App() {
  const [userNumber, setUserNumber] = useState()
  const [guessRounds, setGuessRounds] = useState(0)
  const [dataLoaded, setDataLoaded] = useState(false)

  if (!dataLoaded) {
    return (
      <AppLoading 
        startAsync={fetchFonts} 
        onFinish={() => setDataLoaded(true)} 
        onError={err => console.log(err)}
      />
    )
  }

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber)
    setGuessRounds(0)
  }

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds)
  }

  const newGameHandler = () => {
    setGuessRounds(0)
    setUserNumber(null)
  }

  let content = <StartGameScren onStartGame={startGameHandler} />

  if (userNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
  } else if (guessRounds > 0) {
    content = <GameOverScreen rounds={guessRounds} userNumber={userNumber} onRestart={gameOverHandler} />
  }

  return (
    <View style={styles.screen}>
        <Header title="Guess A Number" />
        {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  }
});