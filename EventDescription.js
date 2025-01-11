import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from 'react-native';

const EventDescription = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Sample list of events
  const events = [
    {
      id: '1',
      name: 'Coding Contest',
      department: 'Computer Science',
      date: '2025-01-20',
      time: '10:00 AM - 1:00 PM',
      manager: 'John Doe',
      contact: '123-456-7890',
      coordinators: 'Alice, Bob',
      entryFee: '₹100',
      venue: 'Lab 1, Block A',
    },
    {
      id: '2',
      name: 'Art Exhibition',
      department: 'Arts',
      date: '2025-01-21',
      time: '11:00 AM - 4:00 PM',
      manager: 'Jane Smith',
      contact: '987-654-3210',
      coordinators: 'Charlie, Diana',
      entryFee: '₹50',
      venue: 'Gallery, Block B',
    },
    // Add more events here...
  ];

  // Function to open modal with selected event details
  const openModal = (event) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Event List</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.eventItem}
            onPress={() => openModal(item)}
          >
            <Text style={styles.eventName}>{item.name}</Text>
            <Text style={styles.eventDateTime}>
              {item.date} | {item.time}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Modal for Viewing Event Details */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedEvent && (
              <>
                <Text style={styles.modalTitle}>{selectedEvent.name}</Text>
                <Text style={styles.modalText}>
                  Department: {selectedEvent.department}
                </Text>
                <Text style={styles.modalText}>
                  Date: {selectedEvent.date}
                </Text>
                <Text style={styles.modalText}>
                  Time: {selectedEvent.time}
                </Text>
                <Text style={styles.modalText}>
                  Manager: {selectedEvent.manager} ({selectedEvent.contact})
                </Text>
                <Text style={styles.modalText}>
                  Coordinators: {selectedEvent.coordinators}
                </Text>
                <Text style={styles.modalText}>
                  Entry Fee: {selectedEvent.entryFee}
                </Text>
                <Text style={styles.modalText}>
                  Venue: {selectedEvent.venue}
                </Text>
              </>
            )}
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeModalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  eventItem: {
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventDateTime: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
  },
  closeModalButton: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeModalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EventDescription;
