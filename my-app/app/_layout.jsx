//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router'
// defining what navigation we want to use
// note: the name of the files will be the names of the tabs 
// note: the order of the files will be the order of the tabs
// note: you must provide a unique text for the component for some reason
// to change the name of the tabs to something else we can do Tabs.Screen and use options to set the title
// rnfc to create a new component
// we create a component called TabBar (future feature)
const _layout = () => {
    return (
        <Tabs>
            <Tabs.Screen name="index" options={{
                title: 'Home',
            }} />
            <Tabs.Screen name="characters" options={{
                title: 'Characters',
            }} />
            <Tabs.Screen name="encounters" options={{
                title: 'Encounters',
            }} />
            <Tabs.Screen name="notes" options={{
                title: 'Notes',
            }} />
        </Tabs>
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
export default _layout;
