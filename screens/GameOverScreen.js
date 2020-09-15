import React from "react"
import { View, Text, StyleSheet, Button, Image } from "react-native"

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>The Game is Over!</Text>
            <View style={styles.imageContainer}>
                <Image 
                    style={styles.image} 
                    source={require('../assets/success.png')}
                />
            </View>
            <Text>Number of rounds: {props.rounds}</Text>
            <Text>Number was: {props.userNumber} </Text>
            <Button title="NEW GAME" onPress={props.onRestart} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 30,
    },
    image: {
        width: '100%',
        height: '100%',
    }
})

export default GameOverScreen