import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, ScrollView } from "react-native"; // Import ScrollView here
import { Ionicons } from "@expo/vector-icons";

// Sample Data
const events = [
  { id: 1, title: "Inter-college Sports Meet", date: "2025-02-25", status: "Confirmed", paymentStatus: "Paid", feedbackStatus: "Pending" },
  { id: 2, title: "Workshop on AI", date: "2025-03-10", status: "Confirmed", paymentStatus: "Unpaid", feedbackStatus: "Completed" },
  { id: 3, title: "Tech Conference", date: "2025-04-05", status: "Pending", paymentStatus: "Unpaid", feedbackStatus: "Pending" },
];

const MyEventsPageStudent = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const renderItem = ({ item }) => {
    const progress = getEventProgress(item);

    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDate}>{item.date}</Text>

        <View style={styles.cardRow}>
          <Text style={styles.statusLabel}>Registration:</Text>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
        <View style={styles.cardRow}>
          <Text style={styles.statusLabel}>Payment Status:</Text>
          <Text style={styles.statusText}>{item.paymentStatus}</Text>
        </View>
        <View style={styles.cardRow}>
          <Text style={styles.statusLabel}>Feedback Status:</Text>
          <Text style={styles.statusText}>{item.feedbackStatus}</Text>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={() => handleViewDetails(item)}>
            <Text style={styles.actionText}>View Event Details</Text>
          </TouchableOpacity>
          {item.paymentStatus === "Unpaid" && (
            <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("Payments")}>
              <Text style={styles.actionText}>Pay Now</Text>
            </TouchableOpacity>
          )}
          {item.feedbackStatus === "Pending" && (
            <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("Feedback", { eventId: item.id })}>
              <Text style={styles.actionText}>Submit Feedback</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.progressContainer}>
          <Text style={styles.progressTitle}>Event Progress</Text>
          <View style={styles.progressBar}>
            {renderProgressSteps(progress)}
          </View>
        </View>
      </View>
    );
  };

  const handleViewDetails = (item) => {
    setModalVisible(true);
  };

  const getEventProgress = (item) => {
    const steps = ["Register", "Pay", "Attend", "Provide Feedback"];
    const completedSteps = [];

    if (item.status === "Confirmed") completedSteps.push(steps[0]);
    if (item.paymentStatus === "Paid") completedSteps.push(steps[1]);
    if (item.feedbackStatus === "Completed") completedSteps.push(steps[3]);

    return completedSteps;
  };

  const renderProgressSteps = (progress) => {
    const allSteps = ["Register", "Pay", "Attend", "Provide Feedback"];
    return allSteps.map((step, index) => {
      return (
        <View key={index} style={[styles.step, progress.includes(step) && styles.completedStep]}>
          <Text style={styles.stepText}>{step}</Text>
        </View>
      );
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>My Events</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />

      {/* Modal for Event Details */}
      <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Event Details</Text>
            <Text style={styles.modalText}>Event Description here...</Text>
            <TouchableOpacity style={styles.closeModalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeModalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardDate: {
    fontSize: 14,
    color: "#888",
    marginBottom: 10,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  statusLabel: {
    fontWeight: "bold",
    fontSize: 14,
  },
  statusText: {
    fontSize: 14,
    color: "#333",
  },
  actionContainer: {
    marginTop: 20,
  },
  actionButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  actionText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  progressContainer: {
    marginTop: 20,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  progressBar: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  step: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    marginRight: 5,
    alignItems: "center",
  },
  completedStep: {
    backgroundColor: "#4CAF50",
  },
  stepText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeModalButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
  },
  closeModalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default MyEventsPageStudent;
