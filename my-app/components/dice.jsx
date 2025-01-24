import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Animated, Image } from 'react-native';

const Dice = () => {
    const [number, setNumber] = useState(20);
    const spinValue = new Animated.Value(0);
    const opacityValue = new Animated.Value(1);

    const rollDice = () => {
        // Reset animation values
        spinValue.setValue(0);
        opacityValue.setValue(1);

        // Start the rolling animation
        Animated.sequence([
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.timing(opacityValue, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start(() => {
            // Generate the dice roll result and fade it in
            const randomNumber = Math.floor(Math.random() * 20) + 1;
            setNumber(randomNumber);
            Animated.timing(opacityValue, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        });
    };

    // Interpolate spin value to create rotation
    const spin = spinValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ['0deg', '180deg', '360deg'], // Two full spins
    });

    return (
        <View style={styles.container}>
            <View style={styles.diceContainer}>
                {/* Combined Dice and Number */}
                <Animated.View
                    style={[
                        styles.diceWrapper,
                        {
                            transform: [{ rotateX: spin }],
                            opacity: opacityValue,
                        },
                    ]}
                >
                    <Animated.Image
                        source={require('../assets/images/dice.png')}
                        style={styles.image}
                    />
                    <Text style={styles.text}>
                        {number}
                    </Text>
                </Animated.View>
            </View>
            <Pressable
                style={({ pressed }) => [
                    styles.button,
                    { opacity: pressed ? 0.8 : 1 },
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
        flex: 1,
        justifyContent: 'center',
    },
    diceContainer: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    diceWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 300,
        height: 300,
    },
    text: {
        position: 'absolute',
        fontSize: 50,
        color: 'white',
        fontWeight: 'bold',
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
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Dice;
