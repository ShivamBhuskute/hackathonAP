import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, ScrollView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";


// Event Management App Screens
import EventDescription from './EventDescription';
import ProfilePageStudent from './ProfilePageStudent';
import MyEventsPageStudent from "./MyEventsPageStudent";
import PaymentsPageStudent from "./PaymentsPageStudent";
import FeedbackPageStudent from "./FeedbackPageStudent";
import CertificateStudent from "./CertificateStudent";
import SettingStudent from "./SettingStudent";

// Sidebar Menu Content
const SidebarMenu = ({ navigation }) => {
  return (
    <View style={styles.sidebarContainer}>
      {/* Student Image and Tag */}
      <Image 
        source={require('./StudentImage.png')} 
        style={styles.stdImage} 
      />
      <View style={styles.stdContainer}>
        <Text style={styles.stdTag}>Student</Text>
      </View>

      {/* Menu Items */}
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Dashboard')}>
        <Ionicons name="home" size={24} color="#FFF" />
        <Text style={styles.menuItemText}>Dashboard</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('MyEventsPageStudent')}>
        <Ionicons name="calendar" size={24} color="#FFF" />
        <Text style={styles.menuItemText}>My Events</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ProfilePageStudent')}>
        <Ionicons name="person" size={24} color="#FFF" />
        <Text style={styles.menuItemText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('PaymentsPageStudent')}>
        <Ionicons name="cash" size={24} color="#FFF" />
        <Text style={styles.menuItemText}>Payments</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('FeedbackPageStudent')}>
        <Ionicons name="chatbubble" size={24} color="#FFF" />
        <Text style={styles.menuItemText}>Feedback</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('CertificateStudent')}>
        <Ionicons name="document" size={24} color="#FFF" />
        <Text style={styles.menuItemText}>Certificate</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('SettingStudent')}>
        <Ionicons name="settings" size={24} color="#FFF" />
        <Text style={styles.menuItemText}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem}>
        <Ionicons name="log-out" size={24} color="#FFF" />
        <Text style={styles.menuItemText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

// Dashboard Screen with Event Details and Quick Access
const Dashboard = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Sample Data
  const events = [
    { 
      id: 1, 
      name: "Inter-college Sports Meet", 
      date: "2025-02-25", 
      time: "10:00 AM", 
      registrationStatus: "Confirmed", 
      paymentStatus: "Paid", 
      progress: ["Register", "Pay", "Attend", "Feedback"], 
      qrCode: "sampleQR1.png", 
      venue: "University Stadium", 
      ticketID: "12345", 
      feedbackStatus: "Pending" 
    },
    { 
      id: 2, 
      name: "Workshop on AI", 
      date: "2025-03-10", 
      time: "9:00 AM", 
      registrationStatus: "Pending", 
      paymentStatus: "Unpaid", 
      progress: ["Register", "Pay", "Attend", "Feedback"], 
      qrCode: "sampleQR2.png", 
      venue: "Tech Auditorium", 
      ticketID: "67890", 
      feedbackStatus: "Completed" 
    },
  ];

  const notifications = [
    "Registration for 'Inter-college Sports Meet' confirmed.",
    "Payment for 'Workshop on AI' is pending.",
    "Your feedback for 'Workshop on AI' is due.",
  ];

  const handleSearchChange = (text) => {
    setSearchQuery(text);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>My Events</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search events..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={handleSearchChange}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Registered Events Section */}
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>Registered Events</Text>
        {events.map((event) => (
          <View key={event.id} style={styles.eventCard}>
            <Text style={styles.eventName}>{event.name}</Text>
            <Text style={styles.eventDetails}>{event.date} | {event.time}</Text>
            <Text style={styles.eventStatus}>Registration Status: {event.registrationStatus}</Text>
            <Text style={styles.eventStatus}>Payment Status: {event.paymentStatus}</Text>
            <View style={styles.progressTracker}>
              {event.progress.map((step, index) => (
                <Text key={index} style={styles.progressStep}>{step}</Text>
              ))}
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EventDescription', { eventId: event.id })}>
                <Text style={styles.buttonText}>View Event Details</Text>
              </TouchableOpacity>
              {event.paymentStatus === "Unpaid" && (
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PaymentsPageStudent', { eventId: event.id })}>
                  <Text style={styles.buttonText}>Pay Now</Text>
                </TouchableOpacity>
              )}
              {event.feedbackStatus === "Pending" && (
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FeedbackPageStudent', { eventId: event.id })}>
                  <Text style={styles.buttonText}>Submit Feedback</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </View>

      {/* Notifications Section */}
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>Notifications Center</Text>
        {notifications.map((notification, index) => (
          <Text key={index} style={styles.notificationText}>{notification}</Text>
        ))}
      </View>

      {/* Communication Hub Section */}
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>Communication Hub</Text>
        <Text style={styles.notificationText}>Announcements from event organizers will appear here.</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ChatSupport')}>
          <Text style={styles.buttonText}>Chat Support</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Section */}
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>Profile Section</Text>
        <Text style={styles.profileText}>Name: John Doe</Text>
        <Text style={styles.profileText}>Email: john.doe@example.com</Text>
        <Text style={styles.profileText}>College: University ABC</Text>
        <Text style={styles.profileText}>Contact: +1234567890</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ProfilePageStudent')}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Drawer Navigator
const Drawer = createDrawerNavigator();

function StudentDashboardApp() {
  return (
    <Drawer.Navigator drawerContent={(props) => <SidebarMenu {...props} />}>
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="EventDescription" component={EventDescription} />
      <Drawer.Screen name="ProfilePageStudent" component={ProfilePageStudent} />
      <Drawer.Screen name="MyEventsPageStudent" component={MyEventsPageStudent} />
      <Drawer.Screen name="PaymentsPageStudent" component={PaymentsPageStudent} />
      <Drawer.Screen name="FeedbackPageStudent" component={FeedbackPageStudent} />
      <Drawer.Screen name="CertificateStudent" component={CertificateStudent} />
      <Drawer.Screen name="SettingStudent" component={SettingStudent} />
    </Drawer.Navigator>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#121212",
  },
  sidebarContainer: {
    flex: 1,
    backgroundColor: "#333",
    padding: 15,
  },
  stdContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  stdImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  stdTag: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#444",
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 15,
    color: "#FFF",
  },
  headerText: {
    fontSize: 24,
    color: "#FFF",
    fontWeight: "bold",
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#444",
    color: "#FFF",
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: "#555",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  cardContainer: {
    marginBottom: 30,
    backgroundColor: "#222",
    borderRadius: 10,
    padding: 15,
  },
  cardTitle: {
    fontSize: 20,
    color: "#FFF",
    fontWeight: "bold",
    marginBottom: 10,
  },
  eventCard: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#333",
    borderRadius: 10,
  },
  eventName: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
  },
  eventDetails: {
    color: "#AAA",
    fontSize: 14,
    marginBottom: 5,
  },
  eventStatus: {
    color: "#FFF",
    fontSize: 14,
    marginBottom: 5,
  },
  progressTracker: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  progressStep: {
    color: "#888",
    fontSize: 12,
    marginRight: 10,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#1E90FF",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  notificationText: {
    color: "#FFF",
    fontSize: 14,
    marginBottom: 5,
  },
  profileText: {
    color: "#FFF",
    fontSize: 16,
    marginBottom: 5,
  },
});

export default StudentDashboardApp;
