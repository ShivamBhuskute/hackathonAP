import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
    Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { doc, setDoc, arrayUnion, serverTimestamp } from 'firebase/firestore';
import { auth, db, createUserWithEmailAndPassword } from './src/firebase'

export default function EventManagerRegistration() {
    const navigation = useNavigation();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [institutionName, setInstitutionName] = useState("");
    const [verificationId, setVerificationId] = useState("");

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const bubblePositions = [
        useRef(new Animated.ValueXY({ x: -50, y: 0 })).current,
        useRef(new Animated.ValueXY({ x: 200, y: 0 })).current,
        useRef(new Animated.ValueXY({ x: 500, y: 0 })).current,
        useRef(new Animated.ValueXY({ x: 300, y: 0 })).current,
        useRef(new Animated.ValueXY({ x: -200, y: 100 })).current,
        useRef(new Animated.ValueXY({ x: 150, y: -50 })).current,
        useRef(new Animated.ValueXY({ x: 400, y: 200 })).current,
    ];

    const bubbleColors = [
        "#62B1F6",
        "#4682B4",
        "#1E90FF",
        "#5F9EA0",
        "#87CEFA",
        "#00BFFF",
        "#4169E1",
    ];

    const isValidEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    };

    const handleRegistration = async () => {
        if (
            !name ||
            !email ||
            !password ||
            !confirmPassword ||
            !contactNumber ||
            !institutionName ||
            !verificationId
        ) {
            Alert.alert("Error", "Please fill all fields.");
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match.");
            return;
        }

        if (!isValidEmail(email)) {
            Alert.alert("Error", "Invalid email address.");
            return;
        }

        try {
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;

            // Add user data to Firestore
            await setDoc(doc(db, "users", user.uid), {
                role: "eventmanager",
                name,
                email,
                contactNumber,
                institutionName,
                verificationId,
            });

            // Update institution document
            const institutionRef = doc(db, "institutions", institutionName);
            await setDoc(
                institutionRef,
                {
                    name: institutionName,
                    eventManagers: arrayUnion(user.uid),
                },
                { merge: true }
            );

            // Create a sample event for the new event manager
            // const eventRef = doc(db, "events", "sampleEvent" + user.uid);
            // await setDoc(eventRef, {
            //     date: serverTimestamp(),
            //     description: "Sample event description",
            //     institutionId: institutionName,
            //     managerId: doc(db, "users", user.uid), // Reference to the user document
            //     name: "Sample Event",
            // });

            // Create a sample task for the new event manager
            // const taskRef = doc(db, "tasks", "sampleTask" + user.uid);
            // await setDoc(taskRef, {
            //     assignedBy: doc(db, "users", user.uid), // Reference to the user document
            //     description: "Sample task description",
            //     dueDate: serverTimestamp(),
            //     eventId: doc(db, "events", "sampleEvent" + user.uid), // Reference to the event document
            //     status: "assigned",
            //     title: "Sample Task",
            // });

            Alert.alert("Success", "Registration completed successfully.", [
                {
                    text: "OK",
                    onPress: () =>
                        navigation.navigate("eventmanagerdashboard", {
                            userId: user.uid,
                        }),
                },
            ]);
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    };

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();

        Animated.loop(
            Animated.stagger(
                1000,
                bubblePositions.map((position) =>
                    Animated.timing(position, {
                        toValue: {
                            x: Math.random() * 400,
                            y: Math.random() * 400,
                        },
                        duration: 5000 + Math.random() * 3000,
                        useNativeDriver: true,
                    })
                )
            )
        ).start();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {bubblePositions.map((position, index) => (
                <Animated.View
                    key={index}
                    style={[
                        styles.bubble,
                        {
                            backgroundColor:
                                bubbleColors[index % bubbleColors.length],
                            transform: [
                                { translateX: position.x },
                                { translateY: position.y },
                            ],
                        },
                    ]}
                />
            ))}

            <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
                Event Manager Registration
            </Animated.Text>

            <View style={styles.card}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your full name"
                    value={name}
                    onChangeText={setName}
                />
                <Text style={styles.label}>Email Address</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email address"
                    value={email}
                    keyboardType="email-address"
                    onChangeText={setEmail}
                />
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    value={password}
                    secureTextEntry
                    onChangeText={setPassword}
                />
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    secureTextEntry
                    onChangeText={setConfirmPassword}
                />
            </View>

            <View style={styles.card}>
                <Text style={styles.label}>Contact Number</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your contact number"
                    value={contactNumber}
                    keyboardType="phone-pad"
                    onChangeText={setContactNumber}
                />
                <Text style={styles.label}>Institution Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your institution name"
                    value={institutionName}
                    onChangeText={setInstitutionName}
                />
            </View>

            <View style={styles.card}>
                <Text style={styles.label}>Role Verification ID</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter the verification ID provided by the college"
                    value={verificationId}
                    onChangeText={setVerificationId}
                />
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={handleRegistration}
                activeOpacity={0.8}
            >
                <Text style={styles.buttonText}>REGISTER</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#121212",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#1E90FF",
        textAlign: "center",
    },
    card: {
        width: "100%",
        backgroundColor: "#1E1E1E",
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
        color: "#2196F3",
    },
    input: {
        width: "100%",
        padding: 12,
        borderRadius: 8,
        backgroundColor: "#333",
        borderWidth: 1,
        borderColor: "#444",
        marginBottom: 10,
        color: "#FFF",
    },
    button: {
        marginTop: 20,
        width: "100%",
        padding: 15,
        borderRadius: 10,
        backgroundColor: "#1E90FF",
        alignItems: "center",
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    buttonText: {
        fontSize: 18,
        color: "#FFF",
        fontWeight: "bold",
    },
    bubble: {
        width: 150,
        height: 150,
        borderRadius: 75,
        position: "absolute",
        opacity: 0.6,
    },
});
