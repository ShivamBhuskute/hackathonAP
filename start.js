import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Animated } from 'react-native';

export default function Start({ onPress }) {
  // Animated values for fade-in effect
  const fadeAnimTitle = useRef(new Animated.Value(0)).current; // Initial opacity for title
  const fadeAnimSubtitle = useRef(new Animated.Value(0)).current; // Initial opacity for subtitle
  const scaleAnim = useRef(new Animated.Value(1)).current; // Initial scale for the button

  // Animation for fade-in effect
  useEffect(() => {
    // Fade in title and subtitle with staggered timing
    Animated.sequence([
      Animated.timing(fadeAnimTitle, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnimSubtitle, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnimTitle, fadeAnimSubtitle]);

  // Scale animation for the button
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95, // Scale down when pressed
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1, // Scale back to original size
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ImageBackground
      source={{ uri: 'https://via.placeholder.com/1080x1920.png?text=EventManager+Background' }} // Background image
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {/* Title with fade-in animation */}
        <Animated.Text style={[styles.title, { opacity: fadeAnimTitle }]}>
          Welcome to EventManager
        </Animated.Text>

        {/* Subtitle with fade-in animation */}
        <Animated.Text style={[styles.subtitle, { opacity: fadeAnimSubtitle }]}>
          Start managing your events with ease. Let’s get started!
        </Animated.Text>

        {/* Button with scale animation on press */}
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            style={styles.buttonPrimary}
            onPress={onPress}
            onPressIn={handlePressIn} // Trigger scale-down effect when pressed
            onPressOut={handlePressOut} // Trigger scale-up effect when press is released
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Ensure the image covers the entire screen
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay for better text visibility
  },
  title: {
    fontSize: 36,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#fff', // White text for better contrast
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 40,
    color: '#ddd', // Light gray for subtitle
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  buttonPrimary: {
    width: '80%',
    padding: 15,
    marginBottom: 20,
    borderRadius: 30,
    backgroundColor: '#4CAF50', // Green color
    alignItems: 'center',
    elevation: 5, // Deeper shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff', // White text
    fontWeight: 'bold',
  },
});
