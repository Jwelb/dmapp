import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'react-native';

const Dice = () => {
    const [number, setNumber] = useState(null);

    const rollDice = () => {
        const randomNumber = Math.floor(Math.random() * 20) + 1;
        setNumber(randomNumber);
    };

    return (
        <View style={styles.container}>
            <View style={styles.diceContainer}>
                <Image
                    source={require('../assets/images/dice.png')}
                    style={styles.image}
                />
                <Text style={styles.text}>
                    {number !== null ? number : '?'}
                </Text>
            </View>
            <Pressable
                style={({ pressed }) => [
                    styles.button,
                    { opacity: pressed ? 0.8 : 1 }
                ]}
                onPress={rollDice}
            >
                <Text style={styles.buttonText}>ROLL</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    diceContainer: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    image: {
        width: 300,
        height: 300,
    },
    text: {
        position: 'absolute',
        fontSize: 32,
        color: 'white',
        textAlign: 'center',
        top: '50%',
        transform: [{ translateY: -16 }],
    },
    button: {
        backgroundColor: '#362645',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 25,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});

export default Dice;