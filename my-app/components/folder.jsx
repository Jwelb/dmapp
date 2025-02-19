import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { collection, doc, setDoc } from 'firebase/firestore';
import { FIREBASE_AUTH } from '../firebaseconfig';
import { FIRESTORE_DB } from '../firebaseconfig';
import { useState } from 'react';

const Folder = () => {
    const [folders, setFolders] = useState([]);
    const [loading, setLoading] = useState(true);
    // actually fetch the folders from the database for the user
    useEffect(() => {
        const fetchFolders = async () => {
            try {
                const collectionRef = collection(FIRESTORE_DB,'folders');
                const querySnapshot = await collection('folders').get();
                const folders = querySnapshot.docs.map(doc => doc.data());
                
                setFolders(folders);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching folders:', error);
            }
        }
        fetchFolders();
    }, []);
    return (
        <View style={styles.container}>
            <Text style={[styles.text, { color: '#666' }]}>Add your folders for your campaigns</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    bar: {
        width: '80%',
        padding: 10,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 15,
    },
    text: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center'
    },
    iconContainer: {
        padding: 5,
    },
});

export default Folder;