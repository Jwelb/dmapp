import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FIREBASE_AUTH } from '../firebaseconfig';
import { useRouter } from 'expo-router';

const SettingsModal = ({ visible, onClose }) => {
    const router = useRouter();
    const slideAnim = useRef(new Animated.Value(0)).current;

    const handleSignOut = async () => {
        try {
            await FIREBASE_AUTH.signOut();
            onClose();  // Close the modal
            router.replace('/login');  // Navigate to login screen
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    useEffect(() => {
        if (visible) {
            Animated.spring(slideAnim, {
                toValue: 1,
                useNativeDriver: true,
                tension: 65,
                friction: 11
            }).start();
        } else {
            Animated.spring(slideAnim, {
                toValue: 0,
                useNativeDriver: true,
                tension: 65,
                friction: 11
            }).start();
        }
    }, [visible]);

    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <Animated.View
                    style={[
                        styles.modalContainer,
                        {
                            transform: [{
                                translateY: slideAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [-300, 0]
                                })
                            }]
                        }
                    ]}
                >
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Settings</Text>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={onClose}
                        >
                            <MaterialCommunityIcons name="close" size={28} color="#AD94C7" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.text}>Settings Content</Text>
                        <TouchableOpacity
                            style={styles.signOutButton}
                            onPress={handleSignOut}
                        >
                            <Text style={styles.signOutText}>Sign Out</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-start',
    },
    modalContainer: {
        backgroundColor: '#1A1221',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        minHeight: 300,
    },
    header: {
        height: 60,
        backgroundColor: '#261C33',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#3D2F4C',
    },
    headerText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    closeButton: {
        position: 'absolute',
        right: 16,
        height: '100%',
        justifyContent: 'center',
    },
    content: {
        padding: 20,
        alignItems: 'stretch',
    },
    text: {
        color: 'white',
        fontSize: 16,
        marginBottom: 20,
    },
    signOutButton: {
        backgroundColor: '#362645',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#AD94C7',
    },
    signOutText: {
        color: '#AD94C7',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default SettingsModal; 