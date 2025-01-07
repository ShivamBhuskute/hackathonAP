import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

export default function Dashboard({ navigation }) {
  // Animated values for fade-in effect
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity is 0
  const scaleAnimPrimary = useRef(new Animated.Value(1)).current; // Initial scale for the primary button
  const scaleAnimSecondary = useRef(new Animated.Value(1)).current; // Initial scale for the secondary button

  // Animation for fade-in effect when the component mounts
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Fade in to opacity 1
      duration: 1000, // Duration of the fade-in effect
      useNativeDriver: true, // Use native driver for better performance
    }).start();
  }, [fadeAnim]);

  // Scale animation for the buttons on press (primary and secondary)
  const handlePressIn = (scaleAnim) => {
    Animated.spring(scaleAnim, {
      toValue: 0.95, // Scale down when pressed
      friction: 4, // Add some friction for smoothness
      useNativeDriver: true, // Use native driver for better performance
    }).start();
  };

  const handlePressOut = (scaleAnim) => {
    Animated.spring(scaleAnim, {
      toValue: 1, // Scale back to original size
      friction: 4,
      useNativeDriver: true, // Use native driver for better performance
    }).start();
  };

  return (
    <View style={styles.container}>
      {/* Title with fade-in animation */}
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
        Event Manager Dashboard
      </Animated.Text>

      {/* Primary Button with scale animation on press */}
      <Animated.View style={{ transform: [{ scale: scaleAnimPrimary }] }}>
        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={() => navigation.navigate('EventCreation')} // Navigate to 'EventCreation' when pressed
          onPressIn={() => handlePressIn(scaleAnimPrimary)} // Trigger scale-down effect when pressed
          onPressOut={() => handlePressOut(scaleAnimPrimary)} // Trigger scale-up effect when press is released
        >
          <Text style={styles.buttonText}>Create New Event</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Secondary Button with scale animation on press */}
      <Animated.View style={{ transform: [{ scale: scaleAnimSecondary }] }}>
        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => alert('View Registrations')} // Alert on button press (can be replaced with actual logic)
          onPressIn={() => handlePressIn(scaleAnimSecondary)} // Trigger scale-down effect when pressed
          onPressOut={() => handlePressOut(scaleAnimSecondary)} // Trigger scale-up effect when press is released
        >
          <Text style={styles.buttonText}>View Registrations</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5', // Light gray background for the Dashboard
  },
  title: {
    fontSize: 28,
    marginBottom: 30,
    fontWeight: 'bold',
    color: '#333', // Dark gray for the title text
    textAlign: 'center',
  },
  buttonPrimary: {
    width: '80%',
    padding: 15,
    marginBottom: 20,
    borderRadius: 25,
    backgroundColor: '#4CAF50', // Green color for the primary button
    alignItems: 'center',
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonSecondary: {
    width: '80%',
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#2196F3', // Blue color for the secondary button
    alignItems: 'center',
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff', // White text for both buttons
    fontWeight: 'bold',
  },
});
