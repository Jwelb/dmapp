//import liraries alwyas do rnf to create a new component
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// create a component you MUST provide text to the component or it wont render in the app
const Encounters = () => {
    const [playerCount, setPlayerCount] = useState('');
    const [playerLevel, setPlayerLevel] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [monsterResults, setMonsterResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [expandedMonsterId, setExpandedMonsterId] = useState(null);
    const [monsterDetails, setMonsterDetails] = useState({});
    const [selectedMonsters, setSelectedMonsters] = useState([]);

    const handlePlayerCountChange = (text) => {
        const numericValue = parseInt(text) || 0;
        if (numericValue <= 10) {
            setPlayerCount(text);
        }
    };

    const handleLevelChange = (text) => {
        const numericValue = parseInt(text) || 0;
        if (numericValue <= 20) {
            setPlayerLevel(text);
        }
    };

    const searchMonsters = async (query) => {
        setSearchQuery(query);
        if (query.length > 0) {
            setIsLoading(true);
            try {
                const response = await fetch(`https://www.dnd5eapi.co/api/monsters`);
                const data = await response.json();

                // Filter monsters based on the search query
                const filteredMonsters = data.results.filter(monster =>
                    monster.name.toLowerCase().includes(query.toLowerCase())
                );

                setMonsterResults(filteredMonsters);
            } catch (error) {
                console.error('Error fetching monsters:', error);
                setMonsterResults([]);
            }
            setIsLoading(false);
        } else {
            setMonsterResults([]);
        }
    };

    const fetchMonsterDetails = async (index) => {
        try {
            const response = await fetch(`https://www.dnd5eapi.co/api/monsters/${index}`);
            const data = await response.json();
            setMonsterDetails(prev => ({
                ...prev,
                [index]: data
            }));
        } catch (error) {
            console.error('Error fetching monster details:', error);
        }
    };

    const toggleMonsterExpand = (index) => {
        if (expandedMonsterId === index) {
            setExpandedMonsterId(null);
        } else {
            setExpandedMonsterId(index);
            if (!monsterDetails[index]) {
                fetchMonsterDetails(index);
            }
        }
    };

    const toggleMonsterSelection = (monsterId) => {
        setSelectedMonsters(prev => {
            if (prev.includes(monsterId)) {
                return prev.filter(id => id !== monsterId);
            } else {
                return [...prev, monsterId];
            }
        });
    };

    const renderMonsterDetails = (monster) => {
        const details = monsterDetails[monster.index];
        if (!details) {
            return <ActivityIndicator color="#AD94C7" />;
        }
        // if the monster is selected, show the details
        // If need to show more details, add them here
        return (
            <View style={styles.detailsContainer}>
                <Text style={styles.detailText}>Size: {details.size}</Text>
                <Text style={styles.detailText}>Type: {details.type}</Text>
                <Text style={styles.detailText}>Alignment: {details.alignment}</Text>
                <Text style={styles.detailText}>Armor Class: {details.armor_class[0]?.value}</Text>
                <Text style={styles.detailText}>Hit Points: {details.hit_points}</Text>
                <Text style={styles.detailText}>Challenge Rating: {details.challenge_rating}</Text>
                <Text style={styles.detailText}>XP: {details.xp}</Text>
            </View>
        );
    };
    // Difficulty will be hard to implement but we can do it later
    // basically it calculates the difficulty based on the player count.level and the monster CR
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <Text style={styles.texth}>Generate Encounter</Text>
                <Text style={styles.text}>Players</Text>
                <TextInput
                    style={styles.input}
                    placeholder="0"
                    value={playerCount}
                    onChangeText={handlePlayerCountChange}
                    textAlignVertical="top"
                    selectionColor="transparent"
                    placeholderTextColor="#666"
                    keyboardType="numeric"
                    maxLength={2}
                />

                <Text style={styles.text}>Level</Text>
                <TextInput
                    style={styles.input}
                    placeholder="0"
                    value={playerLevel}
                    onChangeText={handleLevelChange}
                    textAlignVertical="top"
                    selectionColor="transparent"
                    placeholderTextColor="#666"
                    keyboardType="numeric"
                    maxLength={2}
                />
                <View style={styles.difficultyContainer}>
                    <Text style={styles.text}>Difficulty:</Text>
                </View>

                <View style={styles.searchSection}>
                    <Text style={styles.text}>Monsters and Creatures</Text>
                    <View style={styles.searchContainer}>
                        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchBar}
                            placeholder="Search monsters..."
                            placeholderTextColor="#666"
                            value={searchQuery}
                            onChangeText={searchMonsters}
                            selectionColor="transparent"
                            cursorColor="transparent"
                        />
                    </View>
                </View>

                {/* Updated Monster Results List */}
                <View style={styles.resultsContainer}>
                    {isLoading ? (
                        <Text style={styles.noResults}>Searching...</Text>
                    ) : monsterResults.length > 0 ? (
                        monsterResults.map((monster) => (
                            <View key={monster.index} style={styles.monsterItem}>
                                <View style={styles.monsterRow}>
                                    <TouchableOpacity
                                        onPress={() => toggleMonsterSelection(monster.index)}
                                        style={styles.checkbox}
                                    >
                                        <Ionicons
                                            name={selectedMonsters.includes(monster.index) ? "checkbox" : "square-outline"}
                                            size={24}
                                            color="#AD94C7"
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.monsterContent}
                                        onPress={() => toggleMonsterExpand(monster.index)}
                                    >
                                        <View style={styles.monsterHeader}>
                                            <Text style={styles.monsterName}>{monster.name}</Text>
                                            <Ionicons
                                                name={expandedMonsterId === monster.index ? "chevron-up" : "chevron-down"}
                                                size={24}
                                                color="#AD94C7"
                                            />
                                        </View>
                                        {expandedMonsterId === monster.index && renderMonsterDetails(monster)}
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))
                    ) : searchQuery.length > 0 ? (
                        <Text style={styles.noResults}>No monsters found</Text>
                    ) : null}
                </View>
            </ScrollView>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1221',
    },
    difficultyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    scrollContainer: {
        flex: 1,
        padding: 15,
    },
    texth: {
        color: 'white',
        fontSize: 34,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: '#AD94C7',
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
    },
    searchSection: {
        marginTop: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2D2136',
        borderRadius: 8,
        marginTop: 10,
        marginBottom: 15,
        paddingHorizontal: 12,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchBar: {
        flex: 1,
        color: 'white',
        fontSize: 16,
        padding: 12,
    },
    resultsContainer: {
        marginTop: 10,
    },
    monsterRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    checkbox: {
        padding: 8,
        marginRight: 8,
    },
    monsterContent: {
        flex: 1,
        padding: 8,
    },
    monsterItem: {
        backgroundColor: '#2D2136',
        padding: 8,
        borderRadius: 8,
        marginBottom: 10,
    },
    monsterHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    monsterName: {
        color: 'white',
        fontSize: 18,
        flex: 1,
    },
    detailsContainer: {
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#3D2F4C',
    },
    detailText: {
        color: '#AD94C7',
        fontSize: 14,
        marginBottom: 5,
    },
    noResults: {
        color: '#666',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
});

//make this component available to the app
export default Encounters;
