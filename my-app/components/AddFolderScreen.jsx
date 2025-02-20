import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AddFolderScreen = ({ onClose }) => {
    const opacityAnim = useRef(new Animated.Value(0)).current;
    const translateYAnim = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(translateYAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const handleClose = () => {
        Animated.parallel([
            Animated.timing(opacityAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(translateYAnim, {
                toValue: 50,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start(() => {
            onClose();
        });
    };

    return (
        <View style={styles.overlay}>
            <Animated.View
                style={[
                    styles.container,
                    {
                        opacity: opacityAnim,
                        transform: [{ translateY: translateYAnim }],
                    },
                ]}
            >
                <View style={styles.header}>
                    <Text style={styles.headerText}>Create Folder</Text>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={handleClose}
                    >
                        <MaterialCommunityIcons name="close" size={28} color="#AD94C7" />
                    </TouchableOpacity>
                </View>
                <View style={styles.content}>
                    <Text style={styles.text}>Folder Name</Text>
                    <TextInput style={styles.input} />
                    <Text style={styles.text}>Campaign</Text>
                    <TextInput style={styles.input} />
                    <TouchableOpacity
                        onPress={handleClose}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Create</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '90%',
        backgroundColor: '#1A1221',
        borderRadius: 10,
        overflow: 'hidden',
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
        fontSize: 20,
        fontWeight: 'bold',
    },
    closeButton: {
        position: 'absolute',
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
    input: {
        backgroundColor: '#362645',
        color: 'white',
        padding: 10,
        borderRadius: 8,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#362645',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 25,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default AddFolderScreen;