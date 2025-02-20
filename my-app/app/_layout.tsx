import React, { useState, useEffect } from 'react';
import { Tabs, Stack } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useSegments } from 'expo-router';
import SettingsModal from '../components/SettingsModal';
import { onAuthStateChanged,User } from 'firebase/auth';
import { FIREBASE_AUTH } from '../firebaseconfig';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

// Create a custom header component
const CustomHeader = ({ title }: { title: string }) => {
    const router = useRouter();
    const [isSettingsVisible, setIsSettingsVisible] = useState(false);

    return (
        <View style={styles.headerContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.headerTitle}>{title}</Text>
            </View>
            <TouchableOpacity
                style={styles.settingsButton}
                onPress={() => setIsSettingsVisible(true)}
            >
                <MaterialCommunityIcons name="cog-outline" size={28} color="#AD94C7" />
            </TouchableOpacity>
            <SettingsModal
                visible={isSettingsVisible}
                onClose={() => setIsSettingsVisible(false)}
            />
        </View>
    );
};

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
                // Custom header
                header: ({ route, options }) => (
                    <View style={styles.header}>
                        <CustomHeader title={options.headerTitle || options.title} />
                    </View>
                ),
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
            <Tabs.Screen name="home" options={{
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
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    const segments = useSegments();

    const handleAuthStateChanged = (user: User | null) => {
        console.log('onAuthStateChanged:', user);
        setUser(user);
        if (initializing) setInitializing(false);
    };

    useEffect(() => {
        const subscriber = onAuthStateChanged(FIREBASE_AUTH, handleAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, [initializing]);

    useEffect(() => {
        if (initializing) return;

        const inAuthGroup = segments[0] === 'index' || segments[0] === 'signup';

        if (!user && !inAuthGroup) {
            router.replace('/login');
        } else if (user && inAuthGroup) {
            router.replace('/(tabs)/home');
        }
    }, [user, initializing, segments]);

    if (initializing) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

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
                    title: 'Login',
                }}
            />
            <Stack.Screen
                name="signup"
                options={{
                    headerShown: false,
                    title: 'Signup',
                }}
            />
            <Stack.Screen
                name="settings"
                options={{
                    headerShown: false,
                    title: 'Settings',
                }}
            />
            <Stack.Screen
                name="(tabs)"
                options={{
                    headerShown: false,
                    title: '(tabs)',
                }}
            />
        </Stack>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#261C33',
        height: 100,
        justifyContent: 'center',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
        position: 'relative',
        height: '100%',
    },
    titleContainer: {
        flex: 1,
        paddingTop: 30,
        alignItems: 'center',
    },
    headerTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    settingsButton: {
        position: 'absolute',
        paddingTop: 30,
        right: 30,
        height: '100%',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1A1221',
    },
});