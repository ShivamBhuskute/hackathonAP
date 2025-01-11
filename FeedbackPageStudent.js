import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, Animated, TextInput, Alert } from 'react-native';

// Sample Data for Events Requiring Feedback
const feedbackEvents = [
  { id: 1, title: "Inter-college Sports Meet", feedbackStatus: "Pending" },
  { id: 2, title: "Workshop on AI", feedbackStatus: "Completed" },
  { id: 3, title: "Tech Conference", feedbackStatus: "Pending" }
];

const FeedbackPageStudent = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);

  // Animation values
  const fadeAnimTitle = useRef(new Animated.Value(0)).current;
  const fadeAnimSubtitle = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade-in animation for the title and subtitle
    Animated.sequence([ 
      Animated.timing(fadeAnimTitle, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.timing(fadeAnimSubtitle, { toValue: 1, duration: 1000, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleSubmitFeedback = () => {
    if (rating === 0 || feedback.trim() === '') {
      Alert.alert("Error", "Please provide a rating and feedback.");
    } else {
      setModalVisible(true);
    }
  };

  const renderFeedbackEvent = ({ item }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardStatus}>Feedback Status: {item.feedbackStatus}</Text>
        {item.feedbackStatus === "Pending" && (
          <TouchableOpacity
            style={styles.submitFeedbackButton}
            onPress={() => {
              setSelectedEvent(item);
              setFeedback('');
              setRating(0);
            }}
          >
            <Text style={styles.submitFeedbackButtonText}>Submit Feedback</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.title, { opacity: fadeAnimTitle }]}>Event Feedback</Animated.Text>
      <Text style={styles.subHeader}>Events Requiring Feedback</Text>
      <FlatList
        data={feedbackEvents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderFeedbackEvent}
      />

      {/* Feedback Modal */}
      <Modal visible={selectedEvent !== null} animationType="slide" transparent={true} onRequestClose={() => setSelectedEvent(null)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Submit Feedback for {selectedEvent?.title}</Text>
            <Text style={styles.modalText}>Rate the event (1 to 5 stars):</Text>
            {/* Rating Section */}
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setRating(star)}>
                  <Text style={styles.star}>{rating >= star ? '★' : '☆'}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              style={styles.feedbackInput}
              placeholder="Your feedback..."
              placeholderTextColor="#bbb"
              multiline
              value={feedback}
              onChangeText={setFeedback}
            />

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmitFeedback}>
              <Text style={styles.submitButtonText}>Submit Feedback</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeModalButton} onPress={() => setSelectedEvent(null)}>
              <Text style={styles.closeModalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Payment Confirmation Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Feedback Submitted</Text>
            <Text style={styles.modalText}>Thank you for your feedback. Your e-certificate is now available.</Text>
            <TouchableOpacity style={styles.closeModalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeModalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212', // Dark background color
  },
  title: {
    fontSize: 36,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ccc',
  },
  card: {
    backgroundColor: '#1F3558',
    padding: 20,
    marginBottom: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  cardStatus: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  submitFeedbackButton: {
    backgroundColor: '#62B1F6',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  submitFeedbackButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  feedbackInput: {
    backgroundColor: '#f4f4f4',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    width: '100%',
    height: 100,
    textAlignVertical: 'top',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#62B1F6',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeModalButton: {
    backgroundColor: '#62B1F6',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeModalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  star: {
    fontSize: 30,
    color: '#FFD700',
    margin: 5,
  },
});

export default FeedbackPageStudent;
