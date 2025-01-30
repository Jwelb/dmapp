import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FIREBASE_AUTH } from '../firebaseconfig';
const Settings = () => {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Settings</Text>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <MaterialCommunityIcons name="close" size={28} color="#AD94C7" />
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <Text style={styles.text}>Settings Content</Text>
                <TouchableOpacity
                    onPress={FIREBASE_AUTH.signOut}
                >
                    <Text>Sign Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1221',
    },
    header: {
        height: 60,
        backgroundColor: '#261C33',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    backButton: {
        position: 'absolute',
        right: 16,
        height: '100%',
        justifyContent: 'center',
    },
    headerText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        padding: 20,
    },
    text: {
        color: 'white',
        fontSize: 16,
    },
});

export default Settings; 