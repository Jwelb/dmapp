import React, { useRef, useEffect,useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '../app/context/AuthContext';
import { useRouter, useSegments } from 'expo-router';

const ProtectedRoute = ({ children }) => {
    const router = useRouter();
    const segments = useSegments();
    const { loading } = useState();

    useEffect(() => {
        if (!loading) {
            const user = useAuth();
            const inAuthGroup = segments[0] === 'login';

            if (!user && !inAuthGroup) {
                // If the user is not signed in and the initial segment is not 'login', redirect to 'login'.
                router.replace('/login');
            } else if (user && inAuthGroup) {
                // If the user is signed in and the initial segment is 'login', redirect to the home page.
                router.replace('/(tabs)');
            }
        }
    }, [loading, segments]);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#AD94C7" />
            </View>
        );
    }

    return children;
};

export default ProtectedRoute;