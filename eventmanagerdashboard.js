import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Modal,
    ScrollView,
    Image,
    TextInput,
    Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Calendar } from "react-native-calendars";
import { BarChart, PieChart } from "react-native-chart-kit";
import { db } from "./src/firebase";
import {
    collection,
    query,
    where,
    getCountFromServer,
    getDocs,
} from "firebase/firestore";

// Import other screens
import CreateEvent from "./CreateEvent";
import Registration from "./EventRegistration";
import EventManagerECertificates from "./EventManagerECertificates";
import EventBudget from "./EventBudget";
import EventCommunicationTool from "./EventCommunicationTool";
import EventPermissions from "./EventPermissions";
import EventReport from "./EventReport";
import EventSettings from "./EventSettings";
import EventAttendance from "./EventAttendance";
import EventDescription from "./EventDescription";

const { width } = Dimensions.get("window");

const EventManagerDashboard = ({ route }) => {
    const [isCalendarModalVisible, setIsCalendarModalVisible] = useState(false);
    const [isEventDetailsVisible, setIsEventDetailsVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedDate, setSelectedDate] = useState("");
    const [totalEvents, setTotalEvents] = useState(0);
    const [totalUpcomingEvents, setTotalUpcomingEvents] = useState(0); // for upcoming events
    const [upcomingEvents, setUpcomingEvents] = useState([]); // for list
    const [completedEvents, setCompletedEvents] = useState(0);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                data: [],
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                strokeWidth: 2,
            },
        ],
    });

    const { universityId, managerId } = route.params || {};

    // console.log(universityId, managerId);
    console.log("Route params:", route.params); // Check if params are being passed correctly
    console.log("University ID:", universityId); // Debug log
    console.log("Manager ID:", managerId);

    useEffect(() => {
        if (universityId) {
            fetchTotalEvents(universityId); // Fetch total events for the university
            fetchTotalUpcomingEvents(universityId); // for upcoming events
            fetchCompletedEvents(universityId); // for completed events
            fetchUpcomingEvents(universityId); // for list
            fetchChartData(); // for chart
        }
    }, [universityId]);

    const fetchTotalEvents = async () => {
        try {
            const eventsRef = collection(db, "events");
            const q = query(
                eventsRef,
                where("universityId", "==", universityId)
            );
            const snapshot = await getCountFromServer(q);
            setTotalEvents(snapshot.data().count); // Update state with the count
        } catch (error) {
            console.error("Error fetching total events:", error);
        }
    };

    const fetchTotalUpcomingEvents = async () => {
        try {
            const eventsRef = collection(db, "events");
            const q = query(
                eventsRef,
                where("universityId", "==", universityId),
                where("status", "==", "upcoming") // Filter for upcoming events
            );
            const snapshot = await getCountFromServer(q);
            setTotalUpcomingEvents(snapshot.data().count); // Update state with the count
        } catch (error) {
            console.error("Error fetching total upcoming events:", error);
        }
    };

    const fetchUpcomingEvents = async (universityId) => {
        try {
            const eventsRef = collection(db, "events");
            const q = query(
                eventsRef,
                where("universityId", "==", universityId),
                where("status", "==", "upcoming") // Filter for upcoming events
            );
            const querySnapshot = await getDocs(q);

            const eventsData = [];
            querySnapshot.forEach((doc) => {
                eventsData.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });

            setUpcomingEvents(eventsData); // Set the state with fetched upcoming events
        } catch (error) {
            console.error("Error fetching upcoming events:", error);
        }
    };

    const fetchCompletedEvents = async () => {
        try {
            const eventsRef = collection(db, "events");
            const q = query(
                eventsRef,
                where("universityId", "==", universityId),
                where("status", "==", "over") // Filter for upcoming events
            );
            const snapshot = await getCountFromServer(q);
            setCompletedEvents(snapshot.data().count); // Update state with the count
        } catch (error) {
            console.error("Error fetching total upcoming events:", error);
        }
    };

    const fetchChartData = async () => {
        try {
            const registrationsRef = collection(db, "eventRegistrations");
            const querySnapshot = await getDocs(registrationsRef);

            // Initialize an object to count registrations by month
            const monthlyCounts = {};

            querySnapshot.forEach((doc) => {
                const registrationData = doc.data(); // Ensure you have a `date` field in your documents
                if (registrationData.date && registrationData.date.toDate) {
                    const registrationDate = registrationData.date.toDate();
                    const month = registrationDate.toLocaleString("default", {
                        month: "short",
                    });

                    if (monthlyCounts[month]) {
                        monthlyCounts[month]++;
                    } else {
                        monthlyCounts[month] = 1;
                    }
                }
            });

            // Convert the monthlyCounts object into chart data
            const labels = Object.keys(monthlyCounts);
            const data = Object.values(monthlyCounts);

            setChartData({
                labels,
                datasets: [
                    {
                        data,
                        color: (opacity = 1) =>
                            `rgba(255, 255, 255, ${opacity})`,
                        strokeWidth: 2,
                    },
                ],
            });
        } catch (error) {
            console.error("Error fetching chart data:", error);
        }
    };

    // const [events, setEvents] = useState([
    //     {
    //         id: "1",
    //         title: "Tech Fest 2025",
    //         date: "2025-01-20",
    //         status: "Upcoming",
    //         description: "A technology festival with various speakers.",
    //         location: "Convention Center",
    //     },
    //     {
    //         id: "2",
    //         title: "Sports Day",
    //         date: "2025-01-25",
    //         status: "Completed",
    //         description: "A day filled with sports activities.",
    //         location: "City Stadium",
    //     },
    // ]);
    const [notifications, setNotifications] = useState([
        {
            id: "1",
            message: "New registration for Tech Fest 2025",
            time: "2025-01-18",
        },
        {
            id: "2",
            message: "Budget approved for Sports Day",
            time: "2025-01-22",
        },
    ]);
    const [tasks, setTasks] = useState([
        {
            id: "1",
            task: "Finalize the guest list for Tech Fest",
            status: "In Progress",
        },
        { id: "2", task: "Confirm sponsors for Sports Day", status: "Pending" },
    ]);
    const [searchQuery, setSearchQuery] = useState("");
    const [totalRegistrations, setTotalRegistrations] = useState(200);
    const [upcomingTasks, setUpcomingTasks] = useState(5);
    const [budgetProgress, setBudgetProgress] = useState(60);

    const handleSearch = (text) => {
        setSearchQuery(text);
    };

    const filteredEvents = upcomingEvents.filter((event) =>
        event.eventName.includes(searchQuery)
    );

    // Sample data for the chart
    // const chartData = {
    //     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    //     datasets: [
    //         {
    //             data: [200, 300, 400, 500, 600, 700],
    //             color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // White color
    //             strokeWidth: 2, // optional
    //         },
    //     ],
    // };

    // Pie chart data for task completion
    const taskCompletionData = [
        {
            name: "Completed",
            population: tasks.filter((task) => task.status === "Completed")
                .length,
            color: "#00C49F",
            legendFontColor: "#FFFFFF",
            legendFontSize: 15,
        },
        {
            name: "Pending",
            population: tasks.filter((task) => task.status === "Pending")
                .length,
            color: "#FF8042",
            legendFontColor: "#FFFFFF",
            legendFontSize: 15,
        },
    ];

    const handleEventPress = (event) => {
        setSelectedEvent(event);
        setIsEventDetailsVisible(true);
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.mainContent}>
                {/* Stats Section */}
                <View style={styles.statsContainer}>
                    <View style={styles.statCard}>
                        <Text style={styles.statTitle}>Total Events</Text>
                        <Text style={styles.statValue}>{totalEvents}</Text>
                    </View>

                    <View style={styles.statCard}>
                        <Text style={styles.statTitle}>Upcoming Events</Text>
                        <Text style={styles.statValue}>
                            {totalUpcomingEvents}
                        </Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statTitle}>
                            Completed Events this year
                        </Text>
                        <Text style={styles.statValue}>{completedEvents}</Text>
                    </View>
                </View>

                {/* Event Search Section */}
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search Events"
                    placeholderTextColor="#888"
                    value={searchQuery}
                    onChangeText={handleSearch}
                />

                {/* Event List Section */}
                <Text style={styles.sectionTitle}>Upcoming Events</Text>
                <View style={styles.cardContainer}>
                    <FlatList
                        data={upcomingEvents}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => handleEventPress(item)}
                                style={styles.eventCard}
                            >
                                <Text style={styles.eventTitle}>
                                    {item.eventName}
                                </Text>
                                {/* <Text style={styles.eventDate}>
                                    {item.date}
                                </Text> */}
                                <Text style={styles.eventStatus}>
                                    Status: {item.status}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>

                {/* Tasks Section */}
                {/* <Text style={styles.sectionTitle}>Tasks</Text>
                <FlatList
                    data={tasks}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.taskCard}>
                            <Text style={styles.taskText}>{item.task}</Text>
                            <Text style={styles.taskStatus}>{item.status}</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    const updatedTasks = tasks.map((t) =>
                                        t.id === item.id
                                            ? { ...t, status: "Completed" }
                                            : t
                                    );
                                    setTasks(updatedTasks);
                                }}
                            >
                                <Text style={styles.completeTaskButton}>
                                    Mark as Completed
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                /> */}

                {/* Notifications Section */}
                {/* <Text style={styles.sectionTitle}>Notifications</Text>
                <FlatList
                    data={notifications}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.notificationCard}>
                            <Text style={styles.notificationMessage}>
                                {item.message}
                            </Text>
                            <Text style={styles.notificationTime}>
                                {item.time}
                            </Text>
                        </View>
                    )}
                /> */}

                {/* Chart Section */}
                {/* <Text style={styles.sectionTitle}>Registrations Over Time</Text>
                <BarChart
                    style={styles.chart}
                    data={chartData}
                    width={width - 40} // Responsive width
                    height={220}
                    yAxisLabel=""
                    chartConfig={{
                        backgroundColor: "#1C1C1C",
                        backgroundGradientFrom: "#1C1C1C",
                        backgroundGradientTo: "#1C1C1C",
                        decimalPlaces: 0,
                        color: (opacity = 1) =>
                            `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) =>
                            `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#FFD700",
                        },
                    }}
                /> */}

                <BarChart
                    style={styles.chart}
                    data={chartData}
                    width={width - 50} // Responsive width
                    height={220}
                    yAxisLabel=""
                    chartConfig={{
                        backgroundColor: "#1C1C1C",
                        backgroundGradientFrom: "#1C1C1C",
                        backgroundGradientTo: "#1C1C1C",
                        decimalPlaces: 0,
                        color: (opacity = 1) =>
                            `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) =>
                            `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#FFD700",
                        },
                    }} 
                />

                {/* Pie Chart for Task Completion */}
                {/* <Text style={styles.sectionTitle}>
                    Task Completion Overview
                </Text>
                <View style={styles.pieChartContainer}>
                    <PieChart
                        data={taskCompletionData}
                        width={width - 40} // Responsive width
                        height={220}
                        chartConfig={{
                            backgroundColor: "#1C1C1C",
                            backgroundGradientFrom: "#1C1C1C",
                            backgroundGradientTo: "#1C1C1C",
                            color: (opacity = 1) =>
                                `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) =>
                                `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16,
                            },
                        }}
                        accessor="population"
                        backgroundColor="transparent"
                        paddingLeft="15"
                        absolute
                    />
                </View> */}

                {/* Event Details Modal */}
                <Modal
                    visible={isEventDetailsVisible}
                    transparent
                    animationType="slide"
                    onRequestClose={() => setIsEventDetailsVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            {selectedEvent && (
                                <>
                                    <Text style={styles.eventDetailTitle}>
                                        {selectedEvent.title}
                                    </Text>
                                    <Text style={styles.eventDetailText}>
                                        Date: {selectedEvent.date}
                                    </Text>
                                    <Text style={styles.eventDetailText}>
                                        Location: {selectedEvent.location}
                                    </Text>
                                    <Text style={styles.eventDetailText}>
                                        Description: {selectedEvent.description}
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.closeButton}
                                        onPress={() =>
                                            setIsEventDetailsVisible(false)
                                        }
                                    >
                                        <Text style={styles.closeButtonText}>
                                            Close
                                        </Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </View>
                    </View>
                </Modal>

                {/* User Feedback Section */}
                {/* <Text style={styles.sectionTitle}>User  Feedback</Text>
        <View style={styles.feedbackCard}>
          <Text style={styles.feedbackText}>We value your feedback! Please let us know your thoughts about our events.</Text>
          <TextInput
            style={styles.feedbackInput}
            placeholder="Type your feedback here..."
            placeholderTextColor="#888"
            multiline
          />
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit Feedback</Text>
          </TouchableOpacity>
        </View> */}

                {/* More Events Section */}
            </ScrollView>

            {/* Calendar Button */}
            <TouchableOpacity
                style={styles.calendarButton}
                onPress={() => setIsCalendarModalVisible(true)}
            >
                <Ionicons name="calendar" size={24} color="#FFF" />
                <Text style={styles.calendarButtonText}>Open Calendar</Text>
            </TouchableOpacity>

            {/* Calendar Modal */}
            <Modal
                visible={isCalendarModalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setIsCalendarModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Calendar
                            onDayPress={(day) => {
                                setSelectedDate(day.dateString);
                                setIsCalendarModalVisible(false);
                            }}
                            markedDates={{
                                [selectedDate]: {
                                    selected: true,
                                    marked: true,
                                    selectedColor: "#FFD700",
                                },
                            }}
                            theme={{
                                calendarBackground: "#333",
                                textSectionTitleColor: "#FFF",
                                selectedDayBackgroundColor: "#FFD700",
                                selectedDayTextColor: "#FFF",
                                todayTextColor: "#FFD700",
                                dayTextColor: "#FFF",
                                textDisabledColor: "#555",
                                monthTextColor: "#FFD700",
                            }}
                        />
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setIsCalendarModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

function SidebarMenu({ navigation }) {
    return (
        <View style={styles.sidebarContainer}>
            <Image
                source={require("./EventManagerImage.png")}
                style={styles.adminImage}
            />
            <View style={styles.adminContainer}>
                <Text style={styles.adminTag}>Event Manager</Text>
            </View>
            {/* Navigation Links */}
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate("Dashboard")}
            >
                <Ionicons name="home" size={24} color="#FFF" />
                <Text style={styles.menuItemText}>Dashboard</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate("CreateEvent")}
            >
                <Ionicons name="add-circle" size={24} color="#FFF" />
                <Text style={styles.menuItemText}>Create Events</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate("EventDescription")}
            >
                <Ionicons name="information-circle" size={24} color="#FFF" />
                <Text style={styles.menuItemText}>Event Description</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate("Registration")}
            >
                <Ionicons name="person-add" size={24} color="#FFF" />
                <Text style={styles.menuItemText}>Registration</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate("EventAttendance")}
            >
                <Ionicons name="people" size={24} color="#FFF" />
                <Text style={styles.menuItemText}>Attendance</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate("EventManagerECertificates")}
            >
                <Ionicons name="document" size={24} color="#FFF" />
                <Text style={styles.menuItemText}>Certificates</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate("EventBudget")}
            >
                <Ionicons name="wallet" size={24} color="#FFF" />
                <Text style={styles.menuItemText}>Budget</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate("EventCommunicationTool")}
            >
                <Ionicons name="chatbox" size={24} color="#FFF" />
                <Text style={styles.menuItemText}>Communication</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate("EventPermissions")}
            >
                <Ionicons name="lock-closed" size={24} color="#FFF" />
                <Text style={styles.menuItemText}>Permissions</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate("EventReport")}
            >
                <Ionicons name="stats-chart" size={24} color="#FFF" />
                <Text style={styles.menuItemText}>Reports</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate("EventSettings")}
            >
                <Ionicons name="cog" size={24} color="#FFF" />
                <Text style={styles.menuItemText}>Settings</Text>
            </TouchableOpacity>
        </View>
    );
}

const Drawer = createDrawerNavigator();

function EventManagerDashboardApp() {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <SidebarMenu {...props} />}
            screenOptions={{
                unmountOnBlur: true,
                headerStyle: {
                    backgroundColor: "#000", // Black header background
                },
                headerTintColor: "#FFF", // White text color for header
                headerTitleStyle: {
                    fontWeight: "bold",
                    fontSize: 18,
                },
            }}
        >
            <Drawer.Screen
                name="EventManagerDashboard"
                component={EventManagerDashboard}
                options={{
                    unmountOnBlur: true,
                }}
                initialParams={{ universityId: "", managerId: "" }}
            />
            <Drawer.Screen name="CreateEvent" component={CreateEvent} />
            <Drawer.Screen
                name="EventDescription"
                component={EventDescription}
            />
            <Drawer.Screen name="Registration" component={Registration} />
            <Drawer.Screen name="EventAttendance" component={EventAttendance} />
            <Drawer.Screen
                name="EventManagerECertificates"
                component={EventManagerECertificates}
            />
            <Drawer.Screen
                name="EventCommunicationTool"
                component={EventCommunicationTool}
            />
            <Drawer.Screen name="EventBudget" component={EventBudget} />
            <Drawer.Screen
                name="EventPermissions"
                component={EventPermissions}
            />
            <Drawer.Screen name="EventReport" component={EventReport} />
            <Drawer.Screen name="EventSettings" component={EventSettings} />
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000", // Black background
        paddingTop: 20,
    },
    sidebarContainer: {
        flex: 1,
        backgroundColor: "#222",
        padding: 15,
    },
    sectionTitle: {
        color: "#FFF", // White font color
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        marginTop: 20,
    },
    eventCard: {
        backgroundColor: "#444",
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    eventTitle: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    eventDetailTitle: {
        color: "#FFD700",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    eventDetailText: {
        color: "#FFF",
        fontSize: 14,
        marginBottom: 5,
    },
    detailsCard: {
        backgroundColor: "#333",
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
    },
    detailsText: {
        color: "#FFF",
        fontSize: 14,
    },
    feedbackCard: {
        backgroundColor: "#333",
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
    },
    feedbackText: {
        color: "#FFF",
        fontSize: 14,
    },
    feedbackInput: {
        backgroundColor: "#E0E0E0",
        padding: 10,
        borderRadius: 10,
        color: "#000",
        marginTop: 10,
        height: 80,
    },
    submitButton: {
        backgroundColor: "#008080",
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
    },
    submitButtonText: {
        color: "#FFF",
        fontSize: 14,
    },
    moreEventsCard: {
        backgroundColor: "#333",
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
    },
    moreEventsText: {
        color: "#FFF",
        fontSize: 14,
    },
    chart: {
        marginVertical: 8,
        borderRadius: 16,
    },
    pieChartContainer: {
        alignItems: "center",
        marginVertical: 20,
    },
    adminContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    adminImage: {
        width: "100%",
        height: 100,
        borderRadius: 10,
        marginBottom: 10,
    },
    adminTag: {
        fontSize: 16,
        color: "#008080",
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
    },
    menuItemText: {
        marginLeft: 10,
        color: "#FFF",
        fontSize: 14,
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    statCard: {
        backgroundColor: "#333",
        padding: 20,
        borderRadius: 10,
        width: "30%",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    statTitle: {
        color: "#FFF", // White font color
        fontSize: 16,
    },
    statValue: {
        color: "#FFF", // White font color
        fontSize: 20,
        marginTop: 5,
    },
    countdownCard: {
        backgroundColor: "#333",
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    countdownText: {
        color: "#FFF", // White font color
        fontSize: 16,
    },
    countdownTimer: {
        color: "#FFF", // White font color
        fontSize: 14,
        marginTop: 5,
    },
    taskCard: {
        backgroundColor: "#333",
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    taskText: {
        color: "#FFF", // White font color
        fontSize: 14,
    },
    taskStatus: {
        color: "#008080", // Teal font color
        fontSize: 14,
        marginTop: 5,
    },
    completeTaskButton: {
        color: "#FFD700", // Gold font color
        fontSize: 12,
        marginTop: 5,
    },
    notificationCard: {
        backgroundColor: "#333",
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    notificationMessage: {
        color: "#FFF", // White font color
        fontSize: 14,
    },
    notificationTime: {
        color: "#008080", // Teal font color
        fontSize: 12,
        marginTop: 5,
    },
    searchBar: {
        backgroundColor: "#E0E0E0",
        padding: 10,
        borderRadius: 10,
        color: "#000",
        marginBottom: 20,
    },
    calendarButton: {
        backgroundColor: "#008080",
        padding: 12,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    calendarButtonText: {
        marginLeft: 8,
        color: "#FFF", // White font color
        fontSize: 16,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "#222", // Dark background for modal
        padding: 24,
        borderRadius: 10,
        width: "80%",
        maxHeight: "80%",
        overflow: "scroll",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    closeButton: {
        marginTop: 16,
        padding: 10,
        backgroundColor: "#008080",
        borderRadius: 10,
        alignItems: "center",
    },
    closeButtonText: {
        color: "#FFF", // White font color
        fontSize: 16,
    },
});

export default EventManagerDashboardApp;
