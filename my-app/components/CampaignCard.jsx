import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, {
    useAnimatedStyle,
    withSpring,
    useSharedValue,
} from 'react-native-reanimated';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const CARD_WIDTH = SCREEN_WIDTH * 0.8;
const CARD_HEIGHT = Math.min(SCREEN_HEIGHT * 0.3, 300);

const CampaignCard = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const translateX = useSharedValue(0);

    // Example campaign data - you can move this to a separate file later
    const campaigns = [
        {
            id: 1,
            title: "Lost Mine of Phandelver",
            imageUrl: "https://i.ibb.co/pXs4xzy/IMG-4761.jpg"
        },
        {
            id: 2,
            title: "Curse of Strahd",
            imageUrl: "https://example.com/image2.jpg"
        },
        {
            id: 3,
            title: "Storm King's Thunder",
            imageUrl: "https://example.com/image3.jpg"
        }
    ];

    const handleNext = () => {
        if (currentIndex < campaigns.length - 1) {
            translateX.value = withSpring(-CARD_WIDTH, {
                damping: 20,
                stiffness: 150,
                mass: 0.5
            });
            setTimeout(() => {
                translateX.value = withSpring(0, {
                    damping: 20,
                    stiffness: 150,
                    mass: 0.5
                });
                setCurrentIndex(currentIndex + 1);
            }, 200);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            translateX.value = withSpring(CARD_WIDTH, {
                damping: 20,
                stiffness: 150,
                mass: 0.5
            });
            setTimeout(() => {
                translateX.value = withSpring(0, {
                    damping: 20,
                    stiffness: 150,
                    mass: 0.5
                });
                setCurrentIndex(currentIndex - 1);
            }, 200);
        }
    };

    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        };
    });

    return (
        <View style={styles.outerContainer}>
            <View style={styles.container}>
                <Pressable
                    style={[styles.arrowButton, styles.leftButton]}
                    onPress={handlePrevious}
                    disabled={currentIndex === 0}
                >
                    <MaterialCommunityIcons
                        name="chevron-left"
                        size={Math.min(SCREEN_WIDTH * 0.1, 40)}
                        color={currentIndex === 0 ? '#666' : '#AD94C7'}
                    />
                </Pressable>

                <View style={styles.cardContainer}>
                    <Animated.View style={[styles.card, rStyle]}>
                        <Image
                            source={{ uri: campaigns[currentIndex].imageUrl }}
                            style={styles.image}
                            resizeMode="cover"
                        />
                    </Animated.View>
                    <Text style={styles.title}>{campaigns[currentIndex].title}</Text>
                </View>

                <Pressable
                    style={[styles.arrowButton, styles.rightButton]}
                    onPress={handleNext}
                    disabled={currentIndex === campaigns.length - 1}
                >
                    <MaterialCommunityIcons
                        name="chevron-right"
                        size={Math.min(SCREEN_WIDTH * 0.1, 40)}
                        color={currentIndex === campaigns.length - 1 ? '#666' : '#AD94C7'}
                    />
                </Pressable>
            </View>

            <View style={styles.dotsContainer}>
                {campaigns.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            currentIndex === index && styles.activeDot
                        ]}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        width: SCREEN_WIDTH,
        alignItems: 'center',
    },
    container: {
        width: SCREEN_WIDTH,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: SCREEN_WIDTH * 0.05,
    },
    cardContainer: {
        width: CARD_WIDTH,
        alignItems: 'center',
    },
    card: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        backgroundColor: '#362645',
        borderRadius: Math.min(SCREEN_WIDTH * 0.04, 15),
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    title: {
        color: 'white',
        fontSize: Math.min(SCREEN_WIDTH * 0.045, 18),
        fontWeight: 'bold',
        marginTop: SCREEN_HEIGHT * 0.01,
        marginBottom: SCREEN_HEIGHT * 0.02,
    },
    arrowButton: {
        padding: SCREEN_WIDTH * 0.02,
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH * 0.15,
        height: SCREEN_WIDTH * 0.15,
    },
    leftButton: {
        left: 0,
    },
    rightButton: {
        right: 0,
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: SCREEN_HEIGHT * 0.01,
    },
    dot: {
        width: Math.min(SCREEN_WIDTH * 0.02, 8),
        height: Math.min(SCREEN_WIDTH * 0.02, 8),
        borderRadius: Math.min(SCREEN_WIDTH * 0.01, 4),
        backgroundColor: '#666',
        marginHorizontal: SCREEN_WIDTH * 0.01,
    },
    activeDot: {
        backgroundColor: '#AD94C7',
    },
});

export default CampaignCard; 