import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button } from 'react-native';
import Start from './start'; // Correctly import Start with default export
import Dashboard from './dashboard'; // Correctly import Dashboard with default export


export default function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  const handleScreenClick = () => {
    setShowDashboard(true); // Navigate to Dashboard when clicked
  };

  return (
    <View style={styles.container}>
      {showDashboard ? (
        <Dashboard />
      ) : (
        <Start onPress={handleScreenClick} /> // Trigger handleScreenClick when clicked
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
