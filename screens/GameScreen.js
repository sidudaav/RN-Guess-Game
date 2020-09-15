import React, { useState, useRef, useEffect } from "react"
import {View, Text, StyleSheet, Button, Alert} from "react-native"

import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    const rdNum = Math.floor(Math.random() * (max - min)) + min;
    
    if (rdNum === exclude) {
        return generateRandomBetween(min, max, exclude)
    }

    return rdNum
}

const GameScreen = props => {
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoice))
    const [rounds, setRounds] = useState(0)

    const currentLow = useRef(1)
    const currentHigh = useRef(100)

    useEffect(() => {
        if (currentGuess === props.userChoice) {
            props.onGameOver(rounds)
        }
    }, [currentGuess, props.userChoice, props.onGameOver])

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'higher' && currentGuess > props.userChoice)) {
            Alert.alert(
                'Don\'t Lie!',
                'You know that it is wrong',
                [
                    {
                        text: 'Sorry',
                        style: 'cancel'
                    }
                ]
            )
            return
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess
        } else if (direction === 'higher') {
            currentLow.current = currentGuess
        }

        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
        setCurrentGuess(nextNumber)
        setRounds(curRounds => curRounds + 1)
    }

    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer number={currentGuess} />
            <Card style={styles.buttonContainer}>
                <Button title="LOWER" onPress={nextGuessHandler.bind(this, 'lower')}/>
                <Button title="HIGHER" onPress={nextGuessHandler.bind(this, 'higher')}/>
            </Card>
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
        marginTop: 20,
        width: 300,
        maxWidth: '80%',
    }
})

export default GameScreen