import React, { useState, useRef, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";

import { Image } from "react-native";


// Sidebar menu content
const SidebarMenu = ({ navigation }) => {
  return (
    <View style={styles.sidebarContainer}>
      {/* Admin Image and Tag */}
      <Image 
        source={require('./CoordinatorImage.png')} 
        style={styles.coImage} 
      />
      <View style={styles.coContainer}>
        <Text style={styles.coTag}>Coordinator</Text> 
      </View>

      {/* Menu Items */}
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Dashboard")}>
        <Ionicons name="home" size={24} color="#FFF" />
        <Text style={styles.menuItemText}>Dashboard</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("CreateEvent")}>
        <Ionicons name="calendar" size={24} color="#FFF" />
        <Text style={styles.menuItemText}>Create Event</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Registrations")}>
        <Ionicons name="person-add" size={24} color="#FFF" />
        <Text style={styles.menuItemText}>Registrations</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Attendance")}>
        <Ionicons name="checkmark-done" size={24} color="#FFF" />
        <Text style={styles.menuItemText}>Attendance</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Messages")}>
        <Ionicons name="chatbubble-ellipses" size={24} color="#FFF" />
        <Text style={styles.menuItemText}>Messages</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Certificates")}>
        <Ionicons name="document-text" size={24} color="#FFF" />
        <Text style={styles.menuItemText}>E-Certificates</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Analytics")}>
        <Ionicons name="analytics" size={24} color="#FFF" />
        <Text style={styles.menuItemText}>Analytics</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Settings")}>
        <Ionicons name="settings" size={24} color="#FFF" />
        <Text style={styles.menuItemText}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Logout")}>
        <Ionicons name="log-out" size={24} color="#FFF" />
        <Text style={styles.menuItemText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

// Dashboard screen
const Dashboard = ({ navigation }) => {
  const [toDoTasks, setToDoTasks] = useState([
    { id: 1, title: "Confirm speakers for the event", isCompleted: false },
    { id: 2, title: "Approve registrations", isCompleted: false },
    { id: 3, title: "Prepare attendance sheet", isCompleted: true },
    { id: 4, title: "Send reminder emails", isCompleted: false },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState("");

  const toggleTaskCompletion = (taskId) => {
    setToDoTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const addNewTask = () => {
    if (!newTaskTitle.trim()) {
      Alert.alert("Error", "Task title cannot be empty!");
      return;
    }
    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      isCompleted: false,
    };
    setToDoTasks((prevTasks) => [...prevTasks, newTask]);
    setNewTaskTitle("");
  };

  const removeTask = (taskId) => {
    setToDoTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  // Sample data for Event Status, Upcoming Events, etc.
  const eventStatus = {
    activeEvents: 3,
    totalParticipants: 120,
    pendingApprovals: 5,
    activeTasks: 4,
    presentAttendees: 80,
  };

  const upcomingEvents = [
    { id: 1, title: "Annual Conference", date: "2025-02-25" },
    { id: 2, title: "Workshop on AI", date: "2025-03-10" },
  ];

  const recentActivities = [
    "Registration approved for 5 users.",
    "Task 'Finalize Speakers' completed.",
    "New message received from a participant.",
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>Dashboard</Text>

      {/* To-Do List Section */}
      <View style={styles.toDoListContainer}>
        <Text style={styles.sectionTitle}>To-Do List</Text>

        {/* Add Task Input and Button */}
        <View style={styles.addTaskContainer}>
          <TextInput
            style={styles.taskInput}
            placeholder="Enter new task..."
            placeholderTextColor="#888"
            value={newTaskTitle}
            onChangeText={setNewTaskTitle}
          />
          <TouchableOpacity style={styles.addButton} onPress={addNewTask}>
            <Text style={styles.addButtonText}>Add Task</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={toDoTasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.toDoItem}>
              <TouchableOpacity onPress={() => toggleTaskCompletion(item.id)}>
                <Text
                  style={[
                    styles.toDoText,
                    item.isCompleted && styles.toDoCompletedText,
                  ]}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeTask(item.id)}
              >
                <Ionicons name="trash-bin" size={20} color="#FF4C4C" />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      {/* Event Status Cards */}
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Active Events</Text>
          <Text style={styles.cardContent}>{eventStatus.activeEvents}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Registration Status</Text>
          <Text style={styles.cardContent}>{eventStatus.totalParticipants} Total</Text>
          <Text style={styles.cardContent}>{eventStatus.pendingApprovals} Pending</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Active Tasks</Text>
          <Text style={styles.cardContent}>{eventStatus.activeTasks}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Attendance Tracking</Text>
          <Text style={styles.cardContent}>{eventStatus.presentAttendees}% Attendees Present</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Notifications</Text>
          <Text style={styles.cardContent}>You have {eventStatus.pendingApprovals} unread notifications</Text>
        </View>
      </View>

      {/* Quick Links */}
      <View style={styles.quickLinksContainer}>
        <Text style={styles.quickLinksTitle}>Quick Links</Text>
        <View style={styles.quickLinks}>
          <TouchableOpacity
            style={[styles.quickLinkItem, styles.quickLinkCreateEvent]}
            onPress={() => navigation.navigate("CreateEvent")}
          >
            <Text style={styles.quickLinkText}>Create Event</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.quickLinkItem, styles.quickLinkManageRegistrations]}
            onPress={() => navigation.navigate("Registrations")}
          >
            <Text style={styles.quickLinkText}>Manage Registrations</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.quickLinkItem, styles.quickLinkViewMessages]}
            onPress={() => navigation.navigate("Messages")}
          >
            <Text style={styles.quickLinkText}>View Messages</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Upcoming Events */}
      <View style={styles.upcomingEventsContainer}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        <FlatList
          data={upcomingEvents}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.upcomingEventItem}>
              <Text style={styles.upcomingEventTitle}>{item.title}</Text>
              <Text style={styles.upcomingEventDate}>{item.date}</Text>
            </View>
          )}
        />
      </View>

      {/* Recent Activity Feed */}
      <View style={styles.activityFeedContainer}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <FlatList
          data={recentActivities}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.activityItem}>
              <Text style={styles.activityText}>{item}</Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

// Dummy screens
const CreateEvent = () => <View><Text>Create Event Screen</Text></View>;
const Registrations = () => <View><Text>Registrations Screen</Text></View>;
const Attendance = () => <View><Text>Attendance Screen</Text></View>;
const Messages = () => <View><Text>Messages Screen</Text></View>;
const Certificates = () => <View><Text>E-Certificates Screen</Text></View>;
const Analytics = () => <View><Text>Analytics Screen</Text></View>;

const Drawer = createDrawerNavigator();

function CoordinatorsDashboard() {
  return (
    
      <Drawer.Navigator drawerContent={(props) => <SidebarMenu {...props} />}>
        <Drawer.Screen name="Dashboard" component={Dashboard} />
        <Drawer.Screen name="CreateEvent" component={CreateEvent} />
        <Drawer.Screen name="Registrations" component={Registrations} />
        <Drawer.Screen name="Attendance" component={Attendance} />
        <Drawer.Screen name="Messages" component={Messages} />
        <Drawer.Screen name="Certificates" component={Certificates} />
        <Drawer.Screen name="Analytics" component={Analytics} />
      </Drawer.Navigator>
   
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#121212",
  },
  sidebarContainer: {
    flex: 1,
    backgroundColor: "#333",
    padding: 15,
  },
  coContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  coImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  coTag: {
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
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
    color: "#FFFFFF",
  },
  addTaskContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  taskInput: {
    flex: 1,
    backgroundColor: "#FFF",
    color: "#000",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
  toDoListContainer: {
    marginBottom: 30,
  },
  toDoItem: {
    padding: 15,
    backgroundColor: "#1E1E1E",
    marginBottom: 15,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  toDoText: {
    fontSize: 16,
    color: "#B0B0B0",
  },
  toDoCompletedText: {
    textDecorationLine: "line-through",
    color: "#A0A0A0",
  },
  removeButton: {
    marginLeft: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#FFF",
  },
  cardContainer: {
    marginBottom: 30,
  },
  card: {
    backgroundColor: "#1E1E1E",
    padding: 25,
    marginBottom: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  cardContent: {
    fontSize: 16,
    color: "#B0B0B0",
  },
  quickLinksContainer: {
    marginBottom: 40,
    padding: 30,
    backgroundColor: "#333333",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
  quickLinksTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#FFF",
  },
  quickLinks: {
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  quickLinkItem: {
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#4CAF50",
    borderRadius: 5,
  },
  quickLinkCreateEvent: {
    backgroundColor: "#FF9800",
  },
  quickLinkManageRegistrations: {
    backgroundColor: "#03A9F4",
  },
  quickLinkViewMessages: {
    backgroundColor: "#8BC34A",
  },
  quickLinkText: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
  },
  upcomingEventsContainer: {
    marginBottom: 30,
  },
  upcomingEventItem: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#333",
    borderRadius: 10,
  },
  upcomingEventTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  upcomingEventDate: {
    fontSize: 16,
    color: "#B0B0B0",
  },
  activityFeedContainer: {
    marginBottom: 30,
  },
  activityItem: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#333",
    borderRadius: 10,
  },
  activityText: {
    fontSize: 16,
    color: "#B0B0B0",
  },
});

export default CoordinatorsDashboard;
