import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Start from './start'; // Start screen
import SignInPage from './signup'; // Sign In screen
import LoginPage from './login'; // Login screen

// Create the Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
        screenOptions={{
          headerShown: false, // Hide the header for all screens
        }}
      >
        {/* Start Screen */}
        <Stack.Screen name="Start" component={Start} />

        {/* Sign In Page */}
        <Stack.Screen name="SignInPage" component={SignInPage} />

        {/* Login Page */}
        <Stack.Screen name="LoginPage" component={LoginPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
