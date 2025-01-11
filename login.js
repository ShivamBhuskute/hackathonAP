import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { commonStyles } from './commonStyles';

export default function LoginPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Animated values for bubbles
  const bubble1Position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const bubble2Position = useRef(new Animated.ValueXY({ x: 150, y: 100 })).current;
  const bubble3Position = useRef(new Animated.ValueXY({ x: 200, y: 200 })).current;
  const bubble4Position = useRef(new Animated.ValueXY({ x: -100, y: -50 })).current;

  // Fade animation for the title
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start fade animation for the title
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Start bubble animations
    Animated.loop(
      Animated.stagger(500, [
        Animated.sequence([
          Animated.timing(bubble1Position, {
            toValue: { x: 100, y: 150 },
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(bubble1Position, {
            toValue: { x: 0, y: 0 },
            duration: 2000,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(bubble2Position, {
            toValue: { x: -50, y: 100 },
            duration: 2500,
            useNativeDriver: true,
          }),
          Animated.timing(bubble2Position, {
            toValue: { x: 150, y: 100 },
            duration: 2500,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(bubble3Position, {
            toValue: { x: 100, y: 300 },
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(bubble3Position, {
            toValue: { x: 200, y: 200 },
            duration: 3000,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(bubble4Position, {
            toValue: { x: 0, y: 50 },
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(bubble4Position, {
            toValue: { x: -100, y: -50 },
            duration: 3000,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  }, []);

  const validateInputs = () => {
    if (!email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return false;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const handleLogin = () => {
    if (validateInputs()) {
      console.log('Login successful');
      // Proceed with login logic or navigate to the next screen
    }
  };

  const handleForgotPassword = () => {
    console.log('Forgot Password button pressed');
    // Implement forgot password functionality
  };

  const handleSignUp = () => {
    navigation.navigate('Signup'); // Navigate back to SignInPage
  };

  return (
    <View style={styles.container}>
      {/* Animated Bubbles */}
      <Animated.View
        style={[styles.bubble, { transform: [{ translateX: bubble1Position.x }, { translateY: bubble1Position.y }] }]}
      ></Animated.View>
      <Animated.View
        style={[styles.bubble, { transform: [{ translateX: bubble2Position.x }, { translateY: bubble2Position.y }] }]}
      ></Animated.View>
      <Animated.View
        style={[styles.bubble, { transform: [{ translateX: bubble3Position.x }, { translateY: bubble3Position.y }] }]}
      ></Animated.View>
      <Animated.View
        style={[styles.bubble, { transform: [{ translateX: bubble4Position.x }, { translateY: bubble4Position.y }] }]}
      ></Animated.View>

      {/* Title with animation */}
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>EventHub</Animated.Text>

      <Text style={styles.label}>Login</Text>

      {/* Email Input */}
      <View style={styles.input}>
        <Icon name="mail-outline" size={20} color="#ddd" style={{ marginHorizontal: 5 }} />
        <TextInput
          placeholder="Email address"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          style={styles.textInput}
        />
      </View>

      {/* Password Input */}
      <View style={styles.input}>
        <Icon name="lock-closed-outline" size={20} color="#ddd" style={{ marginHorizontal: 5 }} />
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.textInput}
        />
      </View>

      {/* Error Message */}
      {errorMessage !== '' && <Text style={styles.errorText}>{errorMessage}</Text>}

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin} activeOpacity={0.8}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>

      {/* Forgot Password */}
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.backButtonText}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Sign Up Navigation */}
      <TouchableOpacity onPress={handleSignUp}>
        <Text style={styles.backButtonText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark background
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff', // White title
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: '#ddd', // Light grey text
    marginBottom: 10,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333', // Dark input background
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',
  },
  textInput: {
    flex: 1,
    color: '#fff', // White text in input fields
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#62B1F6', // Blue button
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // White text on button
  },
  backButtonText: {
    color: '#62B1F6', // Blue text for links
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
  },
  bubble: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4C9EE6', // Lighter blue bubble for dark theme
    position: 'absolute',
    opacity: 0.6,
  },
});