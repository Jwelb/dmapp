//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ColorList from '../components/ColorList';
import Dice from '../components/dice';

// create a component
// we are going to use the ColorList component here
// we are going to pass a prop to the ColorList component
const Home = () => {
    return (
        <View style={styles.container}>
            <View>
                <Dice></Dice>
            </View>
            <View>
                <Text style={styles.text}>This is where the campaigns will go</Text>
            </View>
            <View>
                <ColorList barColor='#362645'></ColorList>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#1A1221',
    },
    text: {
        color: 'white',
    }
});

//make this component available to the app
export default Home;
