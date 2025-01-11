import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Modal, Animated, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";

// Sidebar Menu Content
const SidebarMenu = ({ navigation, visible }) => {
  return (
    <Animated.View style={[styles.sidebarContainer, { transform: [{ translateX: visible ? 0 : -250 }] }]}>
      <Image
        source={require('./EventManagerImage.png')}
        style={styles.stdImage}
      />
      <View style={styles.stdContainer}>
        <Text style={styles.stdTag}>Event Manager</Text>
      </View>

      {/* Menu Items */}
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Dashboard')}>
        <Ionicons name="home" size={24} color="#FFF" />
        <Text style={styles.menuItemText}>Dashboard</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('CreateEvent')}>
        <Ionicons name="calendar" size={24} color="#FFF" />
        <Text style={styles.menuItemText}>Create Event</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Registrations')}>
        <Ionicons name="person-add" size={24} color="#FFF" />
        <Text style={styles.menuItemText}>Registrations</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Attendance')}>
        <Ionicons name="checkmark-done" size={24} color="#FFF" />
        <Text style={styles.menuItemText}>Attendance</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Messages')}>
        <Ionicons name="chatbubble-ellipses" size={24} color="#FFF" />
        <Text style={styles.menuItemText}>Messages</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Certificates')}>
        <Ionicons name="document-text" size={24} color="#FFF" />
        <Text style={styles.menuItemText}>E-Certificates</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Analytics')}>
        <Ionicons name="analytics" size={24} color="#FFF" />
        <Text style={styles.menuItemText}>Analytics</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Settings")}>
        <Ionicons name="settings" size={24} color="#FFF" />
        <Text style={styles.menuItemText}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem}>
        <Ionicons name="log-out" size={24} color="#FFF" />
        <Text style={styles.menuItemText}>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Tasks')}>
  <Ionicons name="clipboard" size={24} color="#FFF" />
  <Text style={styles.menuItemText}>Tasks</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Meetings')}>
  <Ionicons name="videocam" size={24} color="#FFF" />
  <Text style={styles.menuItemText}>Meetings</Text>
</TouchableOpacity>
    </Animated.View>
  );
};

// Dashboard Component
const Dashboard = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [scrollY] = useState(new Animated.Value(0));
  const [hasScrolled, setHasScrolled] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const toggleCalendar = () => {
    setCalendarVisible(!calendarVisible);
  };

  const events = [
    { id: 1, title: "Inter-college Sports Meet", date: "2025-02-25", status: "Upcoming" },
    { id: 2, title: "Workshop on AI", date: "2025-03-10", status: "Completed" },
  ];

  const handleSearchChange = (text) => {
    setSearch(text);
  };

  return (
    <View style={styles.container}>
      <SidebarMenu visible={sidebarVisible} navigation={navigation} />

      {/* Header with Sidebar Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleSidebar} style={styles.menuButton}>
          <Ionicons name="menu" size={30} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Event Manager</Text>
      </View>

      <Animated.ScrollView style={styles.mainContent}>
        <View style={styles.darkTop}>
          <Text style={styles.headerText}>Welcome to Event Manager</Text>
        </View>

        <TextInput
          style={styles.searchBar}
          placeholder="Search Dashboard..."
          placeholderTextColor="#999"
          value={search}
          onChangeText={handleSearchChange}
        />

        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        <FlatList
          data={events}
          renderItem={({ item }) => (
            <View style={styles.eventCard}>
              <Text style={styles.eventTitle}>{item.title}</Text>
              <Text style={styles.eventDate}>{item.date}</Text>
              <Text style={styles.eventStatus}>{item.status}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </Animated.ScrollView>

      {/* Dark-Themed Calendar Modal */}
      <Modal visible={calendarVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.calendarContainer}>
            <Text style={styles.modalTitle}>Select Date</Text>
            <Calendar
              theme={{
                calendarBackground: "#1E293B",
                textSectionTitleColor: "#FBBF24",
                selectedDayBackgroundColor: "#2563EB",
                selectedDayTextColor: "#FFFFFF",
                todayTextColor: "#10B981",
                dayTextColor: "#E2E8F0",
                arrowColor: "#FBBF24",
                monthTextColor: "#FBBF24",
                textDayFontWeight: "bold",
                textMonthFontWeight: "bold",
                textDayHeaderFontWeight: "bold",
              }}
              markedDates={{
                "2025-01-15": { selected: true, marked: true, selectedColor: "#2563EB" },
                "2025-01-20": { marked: true, dotColor: "#FBBF24" },
                "2025-01-25": { marked: true, dotColor: "#10B981" },
              }}
              onDayPress={(day) => console.log("Selected Day:", day)}
            />
            <TouchableOpacity onPress={toggleCalendar} style={styles.closeModalBtn}>
              <Ionicons name="close" size={24} color="#FFF" />
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
    backgroundColor: "#111827", // Dark background color
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#1E293B", // Dark header
  },
  headerText: {
    color: "#FBBF24", // Bright color for the header text
    fontSize: 22,
    fontWeight: "bold",
  },
  sidebarContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: 250,
    backgroundColor: "#1E293B", // Dark sidebar
    zIndex: 10,
    paddingTop: 60,
  },
  stdImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  stdContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  stdTag: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingLeft: 20,
    marginBottom: 10,
    backgroundColor: "#2D3748", // Dark background for menu items
    borderRadius: 8,
    marginHorizontal: 10,
  },
  menuItemText: {
    marginLeft: 15,
    color: "#FFF", // Light text for menu items
    fontSize: 16,
  },
  mainContent: {
    flex: 1,
    padding: 15,
  },
  darkTop: {
    backgroundColor: "#1E293B", // Dark background for top section
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  searchBar: {
    backgroundColor: "#374151", // Dark background for search bar
    color: "#FFF", // Light text in search bar
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    color: "#FBBF24", // Bright section title text
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  eventCard: {
    backgroundColor: "#374151", // Dark background for event cards
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  eventTitle: {
    color: "#FFF", // Light text for event titles
    fontSize: 18,
    fontWeight: "bold",
  },
  eventDate: {
    color: "#AAA", // Subtle text for event date
    fontSize: 14,
  },
  eventStatus: {
    color: "#FFD700", // Status in gold color
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#000000AA", // Dark overlay for modal
    justifyContent: "center",
    alignItems: "center",
  },
  calendarContainer: {
    backgroundColor: "#1E293B", // Dark background for the calendar modal
    width: "90%",
    borderRadius: 8,
    padding: 20,
  },
  modalTitle: {
    color: "#FBBF24", // Bright text for modal title
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  closeModalBtn: {
    marginTop: 20,
    alignSelf: "center",
  },
});

export default Dashboard;
