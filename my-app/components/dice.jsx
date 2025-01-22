import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Dice = () => {
    const [number, setNumber] = useState(null);

    const rollDice = () => {
        const randomNumber = Math.floor(Math.random() * 20) + 1;
        setNumber(randomNumber);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.number}>{number !== null ? number : 'Press the button to roll the dice'}</Text>
            <Button title="Roll" color={'#362645'} onPress={rollDice} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    number: {
        fontSize: 32,
        color: 'white',
        marginBottom: 20,
    },
});

export default Dice;