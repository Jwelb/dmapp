                                                    //import liraries
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, KeyboardAvoidingView, Platform, ScrollView, Touchable, TouchableOpacity,Text } from 'react-native';
import Markdown from 'react-native-markdown-display';

//TODO: This needs work done to have notes based on different campaigns
// This will show the folders and notes for a selected campaign
// This will allow the user to add notes to the campaign
// This will allow the user to edit notes
// This will allow the user to delete notes
// This will allow the user to add folders
// This will allow the user to edit folders
// refer to the figma for the design
const Notes = () => {
    const [noteText, setNoteText] = useState('');

    return (
        <View style={styles.container}>
            <Text color='white'>Note 1</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1221',
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
});

export default Notes;
