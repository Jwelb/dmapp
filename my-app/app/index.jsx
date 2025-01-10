//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ColorList from '../components/ColorList';

// create a component
const Home = () => {
    return (
        <View style={styles.container}>
            <ColorList barColor='black'></ColorList>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default Home;
