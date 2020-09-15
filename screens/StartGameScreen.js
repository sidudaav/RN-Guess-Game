import React, {useState} from "react"
import {
    View, 
    Text, 
    StyleSheet, 
    Button, 
    TouchableWithoutFeedback, 
    Keyboard,
    Alert
} from "react-native"

import Colors from '../constants/colors'

import Card from '../components/Card'
import Input from '../components/Input'
import NumberContainer from '../components/NumberContainer'

const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('')
    const [confirmed, setConfirmed] = useState(false)
    const [selectedNumber, setSelectedNumber] = useState()
    
    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''))
    }

    const resetInputHandler = () => {
        setEnteredValue('')
        setConfirmed(false)
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue)
        if (isNaN(chosenNumber) || chosenNumber < 1 || chosenNumber > 99) {
            Alert.alert(
                'Invalid Number',
                'Number has to be a number between 1 and 99',
                [
                    {
                        text: 'Okay',
                        onPress: resetInputHandler,
                        style: 'cancel'
                      },
                ]

            )
            return
        }

        Keyboard.dismiss()
        
        setConfirmed(true)
        setSelectedNumber(parseInt(enteredValue))
        setEnteredValue('')
    }

    let confirmedOutput;
    
    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.cardSummmary}>
                <Text>You selected</Text>
                <NumberContainer number={selectedNumber} />
                <Button title="START GAME" onPress={props.onStartGame(selectedNumber)} />
            </Card>
        )
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.screen}>
                <Text style={styles.title}>Start Game Screen!</Text>
                <Card style={styles.inputContainer}>
                    <Text>Select a Number!</Text>
                    <Input 
                        style={styles.input} 
                        keyboardType="number-pad" 
                        maxLength={2}
                        onChangeText={numberInputHandler}
                        value={enteredValue}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button 
                                title="Reset"
                                onPress={resetInputHandler}
                                color={Colors.accent} 
                            />
                        </View>
                        <View style={styles.button}>
                            <Button 
                                title="Confirm"
                                onPress={confirmInputHandler} 
                                color={Colors.primary} 
                            />
                        </View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    button: {
        width: 100,
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    cardSummmary: {
        alignItems: 'center',
        width: 200,
        maxWidth: '65%',
        marginTop: 30, 
    }
})

export default StartGameScreen