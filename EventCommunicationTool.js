import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  Modal,
  Animated,
} from 'react-native';

const CommunicationTools = () => {
  const [messages, setMessages] = useState([
    { id: '1', sender: 'John Doe', preview: 'Meeting at 3 PM', unread: true, timestamp: new Date().toLocaleTimeString() },
    { id: '2', sender: 'Event Team', preview: 'Welcome to the event!', unread: false, timestamp: new Date().toLocaleTimeString() },
  ]);
  const [composeVisible, setComposeVisible] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));

  const handleCompose = () => {
    if (!newMessage.trim()) {
      Alert.alert('Error', 'Message content cannot be empty!');
      return;
    }
    setMessages([
      {
        id: (messages.length + 1).toString(),
        sender: 'You',
        preview: newMessage,
        unread: true,
        timestamp: new Date().toLocaleTimeString(),
      },
      ...messages,
    ]);
    Alert.alert('Message Sent', 'Your message has been sent successfully.');
    setNewMessage('');
    setComposeVisible(false);
  };

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const toggleUnread = (id) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, unread: !msg.unread } : msg
      )
    );
  };

  const deleteMessage = (id) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  const renderMessageCard = ({ item }) => (
    <TouchableOpacity
      style={[styles.messageCard, item.unread && styles.unread]}
      onPress={() => {
        setSelectedMessage(item);
        toggleUnread(item.id);
      }}
    >
      <View style={styles.messageHeader}>
        <Text style={styles.messageSender}>{item.sender}</Text>
        {item.unread && <View style={styles.unreadDot} />}
      </View>
      <Text style={styles.messagePreview}>{item.preview}</Text>
      <Text style={styles.messageTimestamp}>{item.timestamp}</Text>
    </TouchableOpacity>
  );

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>In-App Messaging System</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search messages..."
        value={searchText}
        onChangeText={handleSearch}
      />

      <FlatList
        data={messages.filter((msg) =>
          msg.sender.toLowerCase().includes(searchText.toLowerCase()) ||
          msg.preview.toLowerCase().includes(searchText.toLowerCase())
        )}
        keyExtractor={(item) => item.id}
        renderItem={renderMessageCard}
      />

      <TouchableOpacity
        style={styles.composeButton}
        onPress={() => {
          setComposeVisible(!composeVisible);
          composeVisible ? fadeOut() : fadeIn();
        }}
      >
        <Text style={styles.composeButtonText}>Compose Message</Text>
      </TouchableOpacity>

      <Animated.View style={[styles.composeContainer, { opacity: fadeAnim }]}>
        {composeVisible && (
          <>
            <TextInput
              style={styles.textInput}
              placeholder="Compose your message..."
              multiline
              value={newMessage}
              onChangeText={setNewMessage}
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleCompose}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </>
        )}
      </Animated.View>

      {selectedMessage && (
        <Modal
          visible={true}
          transparent={true}
          onRequestClose={() => setSelectedMessage(null)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalHeader}>{selectedMessage.sender}</Text>
              <Text style={styles.modalBody}>{selectedMessage.preview}</Text>
              <Text style={styles.modalTimestamp}>{selectedMessage.timestamp}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSelectedMessage(null)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => {
                  deleteMessage(selectedMessage.id);
                  setSelectedMessage(null);
                }}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#121212',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#ffffff',
  },
  messageCard: {
    padding: 16,
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  unread: {
    backgroundColor: '#333333',
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff3b30', // Red color for unread indicator
  },
  messageSender: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#ffffff',
  },
  messagePreview: {
    color: '#b0b0b0',
  },
  messageTimestamp: {
    fontSize: 12,
    color: '#777',
    marginTop: 5,
  },
  composeButton: {
    backgroundColor: '#1e88e5',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  composeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  composeContainer: {
    backgroundColor: '#1e1e1e',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 16,
  },
  textInput: {
    height: 100,
    borderColor: '#444444',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    textAlignVertical: 'top',
    color: '#ffffff',
  },
  sendButton: {
    backgroundColor: '#43a047',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  searchInput: {
    borderColor: '#444444',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    backgroundColor: '#1e1e1e',
    color: '#ffffff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#1e1e1e',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffffff',
  },
  modalBody: {
    fontSize: 16,
    marginBottom: 20,
    color: '#b0b0b0',
  },
  modalTimestamp: {
    fontSize: 14,
    color: '#999',
    marginTop: 10,
  },
  closeButton: {
    backgroundColor: '#1e88e5',
    padding: 10,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#e53935',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CommunicationTools;