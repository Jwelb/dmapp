//import liraries alwyas do rnf to create a new component
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component you MUST provide text to the component or it wont render in the app
const encounters = () => {
    return (
        <View style={styles.container}>
            <Text>Encounters</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1A1221',
    },
});

//make this component available to the app
export default encounters;
