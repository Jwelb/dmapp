import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = () => {
        if (email && password) {
            router.replace('/(tabs)');  // Navigate to the tabs layout after login
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={require('../assets/images/logo.png')} style={styles.logo} />
            </View>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Welcome to</Text>
                <Text style={styles.appName}>Campaign Kingdom</Text>
            </View>

            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#666"
                    value={email}
                    onChangeText={setEmail}
                    selectionColor="transparent"
                    autoCapitalize="none"
                    keyboardType="email-address"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#666"
                    value={password}
                    onChangeText={setPassword}
                    selectionColor="transparent"
                    secureTextEntry
                />

                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={handleLogin}
                >
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.signupContainer}>
                    <Text style={styles.signupText}>Don't have an account? </Text>
                    <Text style={styles.signupLink}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1221',
        padding: 20,
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 10,
    },
    headerContainer: {
        marginTop: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    headerText: {
        color: 'white',
        fontSize: 24,
        marginBottom: 10,
    },
    appName: {
        color: '#AD94C7',
        fontSize: 36,
        fontWeight: 'bold',
    },
    formContainer: {
        width: '100%',
        paddingHorizontal: 20,
    },
    input: {
        backgroundColor: '#2D2136',
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        color: 'white',
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#3D2F4C',
    },
    loginButton: {
        backgroundColor: '#AD94C7',
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
        marginTop: 20,
    },
    loginButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    signupText: {
        color: '#666',
        fontSize: 16,
    },
    signupLink: {
        color: '#AD94C7',
        fontSize: 16,
    },
    logo: {
        width: 200,  // adjust as needed
        height: 200, // adjust as needed
        resizeMode: 'contain',
    },
});

export default Login; 