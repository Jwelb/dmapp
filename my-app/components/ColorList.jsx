import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../firebaseconfig';
import { collection, getDocs, addDoc, deleteDoc,doc } from 'firebase/firestore';

const ColorList = ({ barColor }) => {
    const user = FIREBASE_AUTH.currentUser;
    const [initiatives, setInitiatives] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newInitiative, setNewInitiative] = useState({ name: '', hp: '', ac: '', diceResult: '' });

    const fetchInitiatives = async () => {
        if (!user) return;

        try {
            const initiativesCollection = collection(FIRESTORE_DB, `users/${user.uid}/initiatives`);
            const initiativesSnapshot = await getDocs(initiativesCollection);
            const initiativesList = initiativesSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setInitiatives(initiativesList);
        } catch (error) {
            console.error("Error fetching initiatives: ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInitiatives();
    }, [user]);

    const addInitiative = async () => {
        if (!user) return;

        try {
            await addDoc(collection(FIRESTORE_DB, `users/${user.uid}/initiatives`), {
                name: newInitiative.name,
                hp: parseInt(newInitiative.hp),
                ac: parseInt(newInitiative.ac),
                diceResult: parseInt(newInitiative.diceResult),
            });
            setNewInitiative({ name: '', hp: '', ac: '', diceResult: '' });
            fetchInitiatives(); // Call fetchInitiatives to refresh the list
        } catch (error) {
            console.error("Error adding initiative: ", error);
        }
    };

    const deleteInitiative = async (id) => {
        if (!user) return;

        try {
            await deleteDoc(doc(FIRESTORE_DB, `users/${user.uid}/initiatives`, id));
            fetchInitiatives(); // Call fetchInitiatives to refresh the list
        } catch (error) {
            console.error("Error deleting initiative: ", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={[styles.text, { color: '#666' }]}>Add your Initiative by generating an encounter or here</Text>
            <View style={[styles.inputContainer, { backgroundColor: barColor }]}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    placeholderTextColor="#666"
                    value={newInitiative.name}
                    onChangeText={(text) => setNewInitiative({ ...newInitiative, name: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="HP"
                    placeholderTextColor="#666"
                    value={newInitiative.hp}
                    onChangeText={(text) => setNewInitiative({ ...newInitiative, hp: text })}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="AC"
                    placeholderTextColor="#666"
                    value={newInitiative.ac}
                    onChangeText={(text) => setNewInitiative({ ...newInitiative, ac: text })}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Dice Result"
                    placeholderTextColor="#666"
                    value={newInitiative.diceResult}
                    onChangeText={(text) => setNewInitiative({ ...newInitiative, diceResult: text })}
                    keyboardType="numeric"
                />
                <TouchableOpacity style={styles.addButton} onPress={addInitiative}>
                    <MaterialCommunityIcons name="plus-circle" size={24} color="#AD94C7" />
                </TouchableOpacity>
            </View>
            
            {initiatives.map(initiative => (
                <View key={initiative.id} style={[styles.bar, { backgroundColor: barColor }]}>
                    <View style = {styles.initiativeContent}>
                        <Text style={styles.text}>{initiative.name}</Text>
                        <Text style={styles.text}>HP: {initiative.hp}</Text>
                        <Text style={styles.text}>AC: {initiative.ac}</Text>
                        <Text style={styles.text}>Dice Result: {initiative.diceResult}</Text>
                    </View>
                    <TouchableOpacity style={styles.deleteButton} onPress={() => deleteInitiative(initiative.id)}>
                        <MaterialCommunityIcons name="delete" size={24} color="#AD94C7" />
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        width: '80%',
        flex: 1,
        padding: 10,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 15,
    },
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
        flex: 1,
        flexDirection: 'column',
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
    initiativeContent: {
        flex: 1,
        alignItems: 'center',
    },
    input: {
        backgroundColor: '#2D2136',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        color: 'white',
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#3D2F4C',
        width: '100%',
    },
    addButton: {
        marginTop: 10,
    },
    deleteButton: {
        marginLeft: 10,
    },
});

export default ColorList;