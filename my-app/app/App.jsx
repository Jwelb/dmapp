import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import RootLayout from './_layout';

export default function App() {
    return (
        <AuthProvider>
            <NavigationContainer>
                <RootLayout />
            </NavigationContainer>
        </AuthProvider>
    );
}