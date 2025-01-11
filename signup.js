import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { commonStyles } from './commonStyles';

export default function SignInPage({ navigation }) {
  const [email, setEmail] = useState('123');
  const [password, setPassword] = useState('123');
  const [confirmPassword, setConfirmPassword] = useState('123');
  const [errorMessage, setErrorMessage] = useState('');

  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Animated values for bubble movement
  const bubble1Position = useRef(new Animated.ValueXY({ x: -50, y: 0 })).current;
  const bubble2Position = useRef(new Animated.ValueXY({ x: 200, y: 0 })).current;
  const bubble3Position = useRef(new Animated.ValueXY({ x: 500, y: 0 })).current;
  const bubble4Position = useRef(new Animated.ValueXY({ x: 300, y: 0 })).current;

  useEffect(() => {
    // Change header to dark theme
    navigation.setOptions({ headerStyle: { backgroundColor: '#121212' }, headerTintColor: '#fff' });

    // Fade-in animation for the title
    Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }).start();

    // Start bubble animations
    Animated.loop(
      Animated.stagger(1000, [
        // Bubble 1 animation
        Animated.timing(bubble1Position, {
          toValue: { x: 300, y: 100 },
          duration: 4000,
          useNativeDriver: true,
        }),
        // Bubble 2 animation
        Animated.timing(bubble2Position, {
          toValue: { x: 0, y: -100 },
          duration: 5000,
          useNativeDriver: true,
        }),
        // Bubble 3 animation
        Animated.timing(bubble3Position, {
          toValue: { x: 200, y: 300 },
          duration: 3000,
          useNativeDriver: true,
        }),
        // Bubble 4 animation
        Animated.timing(bubble4Position, {
          toValue: { x: -100, y: 200 },
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [navigation]);

  const validateInputs = () => {
    if (email !== '123') {
      setErrorMessage('Invalid email.');
      return false;
    }
    if (password !== '123') {
      setErrorMessage('Invalid password.');
      return false;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const handleSignIn = () => {
    if (validateInputs()) {
      navigation.navigate('RoleSelection'); // Navigate to Role Selection
    }
  };

  const handleForgotPassword = () => {
    console.log('Forgot Password button pressed');
  };

  const handleLogin = () => {
    navigation.navigate('Login'); // Navigate to Login page
  };

  return (
    <View style={styles.container}>
      {/* Moving Bubbles */}
      <Animated.View
        style={[styles.bubble, { transform: [{ translateX: bubble1Position.x }, { translateY: bubble1Position.y }] }]} />
      <Animated.View
        style={[styles.bubble, { transform: [{ translateX: bubble2Position.x }, { translateY: bubble2Position.y }] }]} />
      <Animated.View
        style={[styles.bubble, { transform: [{ translateX: bubble3Position.x }, { translateY: bubble3Position.y }] }]} />
      <Animated.View
        style={[styles.bubble, { transform: [{ translateX: bubble4Position.x }, { translateY: bubble4Position.y }] }]} />

      {/* EventHub Title with Blue Color */}
      <Animated.Text style={[commonStyles.title, { opacity: fadeAnim, color: '#1E90FF' }]}>EventHub</Animated.Text>

      <Text style={commonStyles.label}>Sign in</Text>

      {/* Email Input */}
      <View style={commonStyles.input}>
        <Icon name="mail-outline" size={20} color="#bbb" style={{ marginHorizontal: 5 }} />
        <TextInput
          placeholder="Email address"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          style={{ flex: 1, color: '#000' }} // Dark input text color
        />
      </View>

      {/* Password Input */}
      <View style={commonStyles.input}>
        <Icon name="lock-closed-outline" size={20} color="#bbb" style={{ marginHorizontal: 5 }} />
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={{ flex: 1, color: '#000' }} // Dark input text color
        />
      </View>

      {/* Confirm Password Input */}
      <View style={commonStyles.input}>
        <Icon name="lock-closed-outline" size={20} color="#bbb" style={{ marginHorizontal: 5 }} />
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={{ flex: 1, color: '#000' }} // Dark input text color
        />
      </View>

      {/* Error Message */}
      {errorMessage !== '' && <Text style={styles.errorText}>{errorMessage}</Text>}

      {/* Sign In Button with Blue Theme */}
      <TouchableOpacity style={[commonStyles.button, styles.blueButton]} onPress={handleSignIn}>
        <Text style={commonStyles.buttonText}>SIGN IN</Text>
      </TouchableOpacity>

      {/* Forgot Password */}
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={commonStyles.backButtonText}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Navigate to Login Page */}
      <TouchableOpacity onPress={handleLogin}>
        <Text style={commonStyles.backButtonText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#121212', // Dark background color
  },
  bubble: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#62B1F6', // Light blue
    position: 'absolute',
    opacity: 0.6,
  },
  blueButton: {
    backgroundColor: '#1E90FF', // Blue background for Sign In button
    borderRadius: 5,
  },
  errorText: { color: 'red', fontSize: 14, marginBottom: 10, textAlign: 'center' },
});