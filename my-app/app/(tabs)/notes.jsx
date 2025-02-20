
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, KeyboardAvoidingView, Platform, ScrollView, Touchable, TouchableOpacity,Text, Button } from 'react-native';
import Folder from '../../components/folder';
import { useRouter } from 'expo-router';
import AddFolderScreen from '../../components/AddFolderScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
//TODO: This needs work done to have notes based on different campaigns
// This will show the folders and notes for a selected campaign
// This will allow the user to add notes to the campaign
// This will allow the user to edit notes
// This will allow the user to delete notes
// This will allow the user to add folders
// This will allow the user to edit folders
// refer to the figma for the design
const Notes = () => {
    const [isAddFolderVisible, setIsAddFolderVisible] = useState(false);

    const handleOpenAddFolder = () => {
        setIsAddFolderVisible(true);
    };

    const handleCloseAddFolder = () => {
        setIsAddFolderVisible(false);
    };

    return (
        <View style={styles.container}>
            <Folder />
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleOpenAddFolder}>
                    <MaterialCommunityIcons name="plus-circle" size={74} color="#AD94C7" />
                </TouchableOpacity>
            </View>
            {isAddFolderVisible && (
                <AddFolderScreen onClose={handleCloseAddFolder} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1221',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        flex: 1,
        color: 'white',
        fontSize: 16,
        lineHeight: 24,
        backgroundColor: '#1A1221',
        padding: 15,
        textAlignVertical: 'top',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    button: {
        backgroundColor: '#AD94C7',
    }
});

export default Notes;
