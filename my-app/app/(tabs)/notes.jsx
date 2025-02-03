                                                    //import liraries
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';

const Notes = () => {
    const [noteText, setNoteText] = useState('');

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TextInput
                style={styles.input}
                multiline
                placeholder="Start writing..."
                placeholderTextColor="#666"
                value={noteText}
                onChangeText={setNoteText}
                textAlignVertical="top"
                autoCorrect={true}
                selectionColor="#AD94C7"
            />
        </KeyboardAvoidingView>
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
