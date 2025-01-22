
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import ColorList from '../components/ColorList';
import Dice from '../components/dice';
import CampaignCard from '../components/CampaignCard';

// create a component
// we are going to use the ColorList component here
// we are going to pass a prop to the ColorList component
const Home = () => {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.diceSection}>
                <Dice />
            </View>
            <View style={styles.textSection}>
                <Text style={styles.text}>Campaigns</Text>
            </View>
            <View style={styles.cardSection}>
                <CampaignCard />
            </View>
            <View style={styles.listSection}>
                <View style={styles.initiativeheader}>
                    <Text style={styles.text}>Initiative Tracker</Text> <Button title="Add" />
                </View>
                <ColorList barColor='#362645' />
            </View>
        </ScrollView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1221',

    },
    initiativeheader: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
    },
    contentContainer: {
        paddingBottom: 20, // Add padding at the bottom for scrolling
    },
    diceSection: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    textSection: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    cardSection: {
        alignItems: 'center',
        marginVertical: 10,
    },
    listSection: {
        paddingTop: 20,
        paddingBottom: 80, // Extra padding at bottom to account for tab bar
    },
    text: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    }
});

//make this component available to the app
export default Home;
