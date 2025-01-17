import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ColorList = ({ barColor }) => {
    const bars = [
        { id: 1, name: 'Boblin The Goblin', hp: 100, ac: 15 },
        { id: 2, name: 'Homelander', hp: 80, ac: 12 },
        { id: 3, name: 'Obama', hp: 60, ac: 10 },
    ];

    return (
        <View style={styles.container}>
            {bars.map(bar => (
                <View key={bar.id} style={[styles.bar, { backgroundColor: barColor }]}>
                    <Text style={styles.text}>{bar.name}</Text>
                    <Text style={styles.text}>HP: {bar.hp}</Text>
                    <Text style={styles.text}>AC: {bar.ac}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bar: {
        width: '80%',
        padding: 10,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 5,
    },
    text: {
        color: '#fff',
        fontSize: 16,
    },
});

export default ColorList;