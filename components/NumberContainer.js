import React from "react"
import { StyleSheet, View, Text } from "react-native"

import Colors from '../constants/colors'

const NumberContainer = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.number}>{props.number}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderColor: Colors.primary,
        borderRadius: 10,
        borderWidth: 2,
        padding: 10,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    number: {
        color: Colors.accent,
        fontSize: 22,
    }
})

export default NumberContainer