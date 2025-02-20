import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { FIREBASE_AUTH, FIREBASE_PROVIDER, FIRESTORE_DB } from '../firebaseconfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const auth = FIREBASE_AUTH;
    const db = FIRESTORE_DB;

    const login = async () => {
        setLoading(true);
        try {
            router.navigate('/login');
        }
        catch (error) {
            console.log(error);
            alert('Sign up failed' + error.message);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // check if user is logged in
        // if user is logged in, redirect to home page
        // if user is not logged in, show login page
    }, [email, password, confirmPassword]);

    const validationForm = () => {
        let errors = {};

        if (!email) {
            errors.email = 'Email is required';
        }

        if (!password) {
            errors.password = 'Password is required';
        }
        if (password !== confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }
        else{
            setIsFormValid(true);
            signUp();
        }

        setErrors(errors);
        setIsFormValid(Object.keys(errors).length === 0);
    };

    const signUp = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            const userId = response.user.uid;
            console.log(userId);
            // Set user document
            await setDoc(doc(db, 'users', userId), {
                email: response.user.email
            });

            // Add folders subcollection
            const folderRef = await addDoc(collection(db, `users/${userId}/folders`), {
                name: 'Spells',
                createdAt: new Date()
            });

            // Add notes subcollection
            await addDoc(collection(db, `users/${userId}/folders/${folderRef.id}/notes`), {
                title: 'Fireball',
                content: 'If a fireball is hot how come the wizard\'s hand isn\'t burnt?',
                createdAt: new Date(),
                updatedAt: new Date()
            });

            // Add characters subcollection
            await addDoc(collection(db, `users/${userId}/characters`), {
                name: 'Placeholder',
                class: 'Placeholder',
                level: 1,
                stats: { str: 10, dex: 14, int: 18 }
            });

            // Add initiatives subcollection
            await addDoc(collection(db, `users/${userId}/initiatives`), {
                // Add your initiative data here
                name: 'Placeholder',
                initiative: 10,
                diceResult: 10,
                hp: 10,
                ac: 10,
            });

            router.replace('/(tabs)');
        } catch (error) {
            console.log(error);
            if (error.code === 'auth/email-already-in-use') {
                setErrors({email: 'Email is already in use'});
            }
            else {
            setErrors(error.message);
        } 
    } finally {
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
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    placeholderTextColor="#666"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    selectionColor="transparent"
                    secureTextEntry
                />
                {/* Display error messages */}
                {Object.values(errors).map((error, index) => (
                    <Text key={index} style={styles.error}>
                        {error}
                    </Text>
                ))}
                {loading ? <Text>Loading...</Text> : (
                    <>
                    <TouchableOpacity
                        style={[styles.loginButton]}
                        onPress={validationForm}
                    >
                        <Text style={styles.loginButtonText}>Get Started</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.signupContainer} onPress={login}>
                        <Text style={styles.signupText}>Already have an account? </Text>
                        <Text style={styles.signupLink}>Login</Text>
                    </TouchableOpacity>
                </>
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
    error: {
        color: 'red',
        marginBottom: 10,
    },
});

export default Signup;