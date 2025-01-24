import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ColorList = ({ barColor }) => {
    const bars = [
        { id: 1, name: 'Boblin The Goblin', hp: 100, ac: 15 },
        { id: 2, name: 'Homelander', hp: 80, ac: 12 },
        { id: 3, name: 'Obama', hp: 60, ac: 10 },
    ];

    return (
        <View style={styles.container}>
            <Text style={[styles.text, { color: '#666' }]}>Add your Initiative by generating an encounter or here</Text>
            <TouchableOpacity style={[styles.bar, { backgroundColor: barColor }]}>
                <View style={styles.iconContainer}>
                    <MaterialCommunityIcons name="plus-circle" size={24} color="#AD94C7" />
                </View>
            </TouchableOpacity>
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
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    bar: {
        width: '80%',
        padding: 10,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 15,
    },
    text: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center'
    },
    iconContainer: {
        padding: 5,
    },
});

export default ColorList;