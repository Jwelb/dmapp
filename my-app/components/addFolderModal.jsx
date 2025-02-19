import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FIREBASE_AUTH } from '../firebaseconfig';
import { useRouter } from 'expo-router';

const AddfolderModal = ({ visible, onClose }) => {
    const slideAnim = useRef(new Animated.Value(0)).current;

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
            <TouchableOpacity onPress={onClose}>
            <View>
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
                        <Text style={styles.headerText}>Add Folder</Text>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={onClose}
                        >
                            <MaterialCommunityIcons name="close" size={28} color="#AD94C7" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.text}>Folder?</Text>
                    </View>
                </Animated.View>

            </View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: '#1A1221',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        minHeight: 300,
    },
    header: {
        height: 100,
        backgroundColor: '#261C33',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#3D2F4C',
    },
    headerText: {
        color: 'white',
        paddingTop: 30,
        fontSize: 20,
        fontWeight: 'bold',
    },
    closeButton: {
        position: 'absolute',
        paddingTop: 30,
        right: 30,
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

export default AddfolderModal; 