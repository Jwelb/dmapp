//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons';
// defining what navigation we want to use
// note: the name of the files will be the names of the tabs 
// note: the order of the files will be the order of the tabs
// note: you must provide a unique text for the component for some reason
// to change the name of the tabs to something else we can do Tabs.Screen and use options to set the title
// rnfc to create a new component
// we create a component called TabBar (future feature)
const _layout = () => {
    return (
        <Tabs screenOptions={{
            headerStyle: {
                backgroundColor: '#261C33',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            tabBarStyle: {
                backgroundColor: '#261C33',
                borderTopWidth: 0,
                elevation: 0,
                shadowOpacity: 0,
                height: 60,
            },
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: '#AD94C7',
            tabBarLabelPosition: 'below-icon',
        }}>
            <Tabs.Screen name="index" options={{
                title: 'Home',
                headerTitle: 'Overview',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="home" size={size} color={color} />
                ),
            }} />
            <Tabs.Screen name="characters" options={{
                title: 'Characters',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="account-group" size={size} color={color} />
                ),
            }} />
            <Tabs.Screen name="encounters" options={{
                title: 'Encounters',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="sword-cross" size={size} color={color} />
                ),
            }} />
            <Tabs.Screen name="notes" options={{
                title: 'Notes',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="note-text" size={size} color={color} />
                ),
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
