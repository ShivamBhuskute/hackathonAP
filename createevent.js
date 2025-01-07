import React from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

export default function EventCreation() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Event</Text>
      {/* Add form or event creation components here */}
      
      <TextInput
        style={styles.input}
        placeholder="Enter Event Name"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Event Date"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Event Location"
      />
      
      <Button title="Save Event" onPress={() => alert('Event Saved')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 10,
  },
});
