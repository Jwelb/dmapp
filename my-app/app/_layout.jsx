//import liraries
import React from 'react';
import { Stack } from 'expo-router';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Create the main tab navigator
const TabLayout = () => {
    return (
        <Tabs
            screenOptions={{
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
                    height: 80,
                    paddingBottom: 10,
                    paddingTop: 10,
                },
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: '#AD94C7',
                tabBarLabelPosition: 'below-icon',
            }}
        >
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

// Root layout with Stack navigator
export default function RootLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: '#1A1221' }
            }}
        >
            <Stack.Screen
                name="login"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="settings"
                options={{
                    headerShown: false,

                }}
            />
            <Stack.Screen
                name="(tabs)"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    );
}

// define your styles

