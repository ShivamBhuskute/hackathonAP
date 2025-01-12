// import React, { useEffect, useRef, useState } from "react";
// import {
//     View,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     Animated,
//     StyleSheet,
// } from "react-native";
// import Icon from "react-native-vector-icons/Ionicons";
// import { commonStyles } from "./commonStyles";
// import { auth, createUserWithEmailAndPassword } from "./src/firebase"; // Import the auth instance from firebase.js

// export default function SignUp({ navigation }) {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const [errorMessage, setErrorMessage] = useState("");

//     const fadeAnim = useRef(new Animated.Value(0)).current;

//     // Animated values for bubble movement
//     const bubble1Position = useRef(
//         new Animated.ValueXY({ x: -50, y: 0 })
//     ).current;
//     const bubble2Position = useRef(
//         new Animated.ValueXY({ x: 200, y: 0 })
//     ).current;
//     const bubble3Position = useRef(
//         new Animated.ValueXY({ x: 500, y: 0 })
//     ).current;
//     const bubble4Position = useRef(
//         new Animated.ValueXY({ x: 300, y: 0 })
//     ).current;

//     useEffect(() => {
//         // Change header to dark theme
//         navigation.setOptions({
//             headerStyle: { backgroundColor: "#121212" },
//             headerTintColor: "#fff",
//         });

//         // Fade-in animation for the title
//         Animated.timing(fadeAnim, {
//             toValue: 1,
//             duration: 1000,
//             useNativeDriver: true,
//         }).start();

//         // Start bubble animations
//         Animated.loop(
//             Animated.stagger(1000, [
//                 Animated.timing(bubble1Position, {
//                     toValue: { x: 300, y: 100 },
//                     duration: 4000,
//                     useNativeDriver: true,
//                 }),
//                 Animated.timing(bubble2Position, {
//                     toValue: { x: 0, y: -100 },
//                     duration: 5000,
//                     useNativeDriver: true,
//                 }),
//                 Animated.timing(bubble3Position, {
//                     toValue: { x: 200, y: 300 },
//                     duration: 3000,
//                     useNativeDriver: true,
//                 }),
//                 Animated.timing(bubble4Position, {
//                     toValue: { x: -100, y: 200 },
//                     duration: 4000,
//                     useNativeDriver: true,
//                 }),
//             ])
//         ).start();
//     }, [navigation]);

//     const validateInputs = () => {
//         if (!email) {
//             setErrorMessage("Email is required.");
//             return false;
//         }
//         if (password.length < 6) {
//             setErrorMessage("Password must be at least 6 characters.");
//             return false;
//         }
//         if (password !== confirmPassword) {
//             setErrorMessage("Passwords do not match.");
//             return false;
//         }
//         setErrorMessage("");
//         return true;
//     };

//     const handleSignIn = async () => {
//         if (validateInputs()) {
//             try {
//                 await createUserWithEmailAndPassword(
//                     auth,
//                     email.trim(),
//                     password
//                 );

//                 navigation.navigate("RoleSelection"); // Navigate to Role Selection on successful sign-up
//             } catch (error) {
//                 setErrorMessage(error.message); // Set error message on failure
//             }
//         }
//     };

//     const handleForgotPassword = () => {
//         console.log("Forgot Password button pressed");
//     };

//     const handleLogin = () => {
//         navigation.navigate("Login"); // Navigate to Login page
//     };

//     return (
//         <View style={styles.container}>
//             {/* Moving Bubbles */}
//             <Animated.View
//                 style={[
//                     styles.bubble,
//                     {
//                         transform: [
//                             { translateX: bubble1Position.x },
//                             { translateY: bubble1Position.y },
//                         ],
//                     },
//                 ]}
//             />
//             <Animated.View
//                 style={[
//                     styles.bubble,
//                     {
//                         transform: [
//                             { translateX: bubble2Position.x },
//                             { translateY: bubble2Position.y },
//                         ],
//                     },
//                 ]}
//             />
//             <Animated.View
//                 style={[
//                     styles.bubble,
//                     {
//                         transform: [
//                             { translateX: bubble3Position.x },
//                             { translateY: bubble3Position.y },
//                         ],
//                     },
//                 ]}
//             />
//             <Animated.View
//                 style={[
//                     styles.bubble,
//                     {
//                         transform: [
//                             { translateX: bubble4Position.x },
//                             { translateY: bubble4Position.y },
//                         ],
//                     },
//                 ]}
//             />

//             {/* EventHub Title */}
//             <Animated.Text
//                 style={[
//                     commonStyles.title,
//                     { opacity: fadeAnim, color: "#1E90FF" },
//                 ]}
//             >
//                 EventHub
//             </Animated.Text>

//             <Text style={commonStyles.label}>Sign up</Text>

//             {/* Email Input */}
//             <View style={commonStyles.input}>
//                 <Icon
//                     name="mail-outline"
//                     size={20}
//                     color="#bbb"
//                     style={{ marginHorizontal: 5 }}
//                 />
//                 <TextInput
//                     placeholder="Email address"
//                     keyboardType="email-address"
//                     value={email}
//                     onChangeText={setEmail}
//                     style={{ flex: 1, color: "#000" }}
//                 />
//             </View>

//             {/* Password Input */}
//             <View style={commonStyles.input}>
//                 <Icon
//                     name="lock-closed-outline"
//                     size={20}
//                     color="#bbb"
//                     style={{ marginHorizontal: 5 }}
//                 />
//                 <TextInput
//                     placeholder="Password"
//                     secureTextEntry
//                     value={password}
//                     onChangeText={setPassword}
//                     style={{ flex: 1, color: "#000" }}
//                 />
//             </View>

//             {/* Confirm Password Input */}
//             <View style={commonStyles.input}>
//                 <Icon
//                     name="lock-closed-outline"
//                     size={20}
//                     color="#bbb"
//                     style={{ marginHorizontal: 5 }}
//                 />
//                 <TextInput
//                     placeholder="Confirm Password"
//                     secureTextEntry
//                     value={confirmPassword}
//                     onChangeText={setConfirmPassword}
//                     style={{ flex: 1, color: "#000" }}
//                 />
//             </View>

//             {/* Error Message */}
//             {errorMessage !== "" && (
//                 <Text style={styles.errorText}>{errorMessage}</Text>
//             )}

//             {/* Sign Up Button */}
//             <TouchableOpacity
//                 style={[commonStyles.button, styles.blueButton]}
//                 onPress={handleSignIn}
//             >
//                 <Text style={commonStyles.buttonText}>SIGN UP</Text>
//             </TouchableOpacity>

//             {/* Forgot Password */}
//             <TouchableOpacity onPress={handleForgotPassword}>
//                 <Text style={commonStyles.backButtonText}>
//                     Forgot Password?
//                 </Text>
//             </TouchableOpacity>

//             {/* Navigate to Login Page */}
//             <TouchableOpacity onPress={handleLogin}>
//                 <Text style={commonStyles.backButtonText}>
//                     Already have an account? Login
//                 </Text>
//             </TouchableOpacity>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         padding: 20,
//         backgroundColor: "#121212",
//     },
//     bubble: {
//         width: 80,
//         height: 80,
//         borderRadius: 40,
//         backgroundColor: "#62B1F6",
//         position: "absolute",
//         opacity: 0.6,
//     },
//     blueButton: {
//         backgroundColor: "#1E90FF",
//         borderRadius: 5,
//     },
//     errorText: {
//         color: "red",
//         fontSize: 14,
//         marginBottom: 10,
//         textAlign: "center",
//     },
// });

import React, { useEffect, useRef } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    StyleSheet,
    Image,
} from "react-native";
import { commonStyles } from "./commonStyles";

export default function WelcomePage({ navigation }) {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    // Animated values for bubble and sparkle movement
    const bubblePositions = Array(5)
        .fill()
        .map(
            () =>
                useRef(
                    new Animated.ValueXY({
                        x: Math.random() * 400 - 200,
                        y: Math.random() * 600 - 300,
                    })
                ).current
        );

    const sparkleOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Animate title and tagline fade-in
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();

        // Animate bubble movements (without restart)
        bubblePositions.forEach((position) => {
            Animated.loop(
                Animated.timing(position, {
                    toValue: {
                        x: Math.random() * 400 - 200,
                        y: Math.random() * 600 - 300,
                    },
                    duration: 5000,
                    useNativeDriver: true,
                })
            ).start();
        });

        // Animate sparkles
        Animated.loop(
            Animated.sequence([
                Animated.timing(sparkleOpacity, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(sparkleOpacity, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    const handleNext = () => navigation.navigate("RoleSelection");
    const handleLogin = () => navigation.navigate("Login");

    return (
        <View style={styles.container}>
            {/* Moving Bubbles */}
            {bubblePositions.map((position, index) => (
                <Animated.View
                    key={index}
                    style={[
                        styles.bubble,
                        {
                            backgroundColor:
                                bubbleColors[index % bubbleColors.length],
                        },
                        {
                            transform: [
                                { translateX: position.x },
                                { translateY: position.y },
                            ],
                        },
                    ]}
                />
            ))}

            {/* Welcome Message */}
            <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
                Welcome to EventHub!
            </Animated.Text>
            <Animated.Text style={[styles.tagline, { opacity: fadeAnim }]}>
                Your Gateway to Amazing Events
            </Animated.Text>

            {/* Sparkles */}
            <Animated.Image
                source={{ uri: "https://example.com/sparkle.png" }} // Replace with a local sparkle icon or URL
                style={[styles.sparkle, { opacity: sparkleOpacity }]}
            />

            {/* Interactive Buttons */}
            <TouchableOpacity style={styles.button} onPress={handleNext}>
                <Text style={styles.buttonText}>
                    Select a role to sign in...
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogin}>
                <Text style={styles.loginText}>
                    Already have an account? Login
                </Text>
            </TouchableOpacity>

            {/* Footer Text */}
            <Text style={styles.footerText}>
                Empowering communities, one event at a time.
            </Text>
        </View>
    );
}

const bubbleColors = ["#ADD8E6", "#87CEFA", "#4682B4", "#5F9EA0", "#00BFFF"];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    title: {
        color: "#1E90FF",
        fontSize: 36,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    tagline: {
        color: "#bbb",
        fontSize: 18,
        textAlign: "center",
        marginBottom: 20,
    },
    bubble: {
        position: "absolute",
        width: 200,
        height: 200,
        borderRadius: 100,
        opacity: 0.4,
    },
    button: {
        backgroundColor: "#1E90FF",
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 30,
        marginVertical: 15,
        shadowColor: "#1E90FF",
        shadowOpacity: 0.8,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    loginText: {
        color: "#87CEFA",
        fontSize: 16,
        textDecorationLine: "underline",
        marginTop: 10,
    },
    sparkle: {
        position: "absolute",
        width: 50,
        height: 50,
        top: 50,
        right: 50,
    },
    footerText: {
        position: "absolute",
        bottom: 20,
        color: "#bbb",
        fontSize: 14,
        textAlign: "center",
    },
});
