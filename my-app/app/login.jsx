import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { FIREBASE_AUTH, FIREBASE_PROVIDER, FIRESTORE_DB } from '../firebaseconfig'
const Index = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const auth = FIREBASE_AUTH;
    const db = FIRESTORE_DB;
    // backend firebase user auth
    // TODO: implement firestore db

    useEffect(() => {
        // check if user is logged in
        // if user is logged in, redirect to home page
        // if user is not logged in, show login page
    }, [email, password]);

    const validationForm = () => {
        let errors = {};

        if (!email) {
            errors.email = 'Email is required'
        }

        if (!password) {
            errors.password = 'Password is required'
        }
        else {
            setIsFormValid(true)
        }
        setErrors(errors)
        setIsFormValid(Object.keys(errors).length === 0)
    }

    const signIn = async () => {
        if (isFormValid) {
            setLoading(true);
            try {
                const response = await signInWithEmailAndPassword(auth, email, password);
                router.replace('/(tabs)/home');
            }
            catch (error) {
                console.log(error);
                alert('Sign in failed' + error.message);
            }
            finally {
                setLoading(false);
            }
        }
    };

    const signInWithGoogle = async () => {
        setLoading(true);
        try {
            const response = await signInWithPopup(auth, FIREBASE_PROVIDER);
            router.replace('/(tabs)');
        }
        catch (error) {
            console.log(error);
            alert('Sign in with Google failed' + error.message);
        }
        finally {
            setLoading(false);
        }
    };
    // TODO: Think about what else we want to store in the users collection?
    // TODO: add user authentication throughout the entire app for when a user is logged in
    const signUp = async () => {
        setLoading(true);
        try {
            router.navigate('/signup');
        }
        catch (error) {
            console.log(error);
            alert('Sign up failed' + error.message);
        }
        finally {
            setLoading(false);
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
                    onChange={validationForm}
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
                    onChange={validationForm}
                    selectionColor="transparent"
                    secureTextEntry
                />
                {/* Display error messages */}
                {Object.values(errors).map((error, index) => (
                    <Text style={styles.errorText} key={index}>
                        {error}
                    </Text>
                ))}
                {loading ? <Text>Loading...</Text> : (
                    <View>
                        <TouchableOpacity
                            style={[styles.loginButton, { opacity: isFormValid ? 1 : 0.5 }]}
                            disabled={!isFormValid}
                            onPress={signIn}
                        >
                            <Text style={styles.loginButtonText}>Login</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.signupContainer} onPress={signUp}>
                            <Text style={styles.signupText}>Don't have an account? </Text>
                            <Text style={styles.signupLink}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1221',
        padding: 20,
        paddingTop: 50,
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
    errorText: {
        color: 'red',
        fontSize: 16,
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

export default Index; 