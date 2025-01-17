// Create a new file: CoordinatorAttendanceScanner.js
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./src/firebase";
import { Drawer } from "react-native-paper";

const CoordinatorAttendanceScanner = ({ route }) => {
    const { coordinatorId, universityId } = route.params;
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        requestCameraPermission();
    }, []);

    const requestCameraPermission = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === "granted");
    };

    const handleBarCodeScanned = async ({ data }) => {
        setScanned(true);
        try {
            const qrData = JSON.parse(data);
            await markAttendance(qrData);
        } catch (error) {
            Alert.alert("Error", "Invalid QR Code");
        }
    };

    const markAttendance = async (qrData) => {
        try {
            const attendanceRef = collection(db, "attendance");
            await addDoc(attendanceRef, {
                eventId: qrData.eventId,
                coordinatorId: coordinatorId,
                universityId: universityId,
                timestamp: new Date().toISOString(),
                status: "present",
            });
            Alert.alert("Success", "Attendance marked successfully!");
        } catch (error) {
            Alert.alert("Error", "Failed to mark attendance");
        }
    };

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned && (
                <TouchableOpacity
                    style={styles.scanAgainButton}
                    onPress={() => setScanned(false)}
                >
                    <Text style={styles.buttonText}>Scan Again</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default function App() {
    return (
      <Drawer.Navigator screenOptions={{ headerShown: false }}>
        <Drawer.Screen name="CoordinatorAttendanceScanner" component={CoordinatorAttendanceScanner} />
      </Drawer.Navigator>
    );
  }