// import { Alert } from 'react-native';
// import { useEffect } from 'react';
// import { Camera, useCameraDevice } from 'react-native-vision-camera';
// import { useCodeScanner } from 'react-native-vision-camera';

// const AttendanceScanner = ({ route, navigation }) => {
//     const device = useCameraDevice('back');
//     const [hasPermission, setHasPermission] = useState(false);
    
//     const codeScanner = useCodeScanner({
//         codeTypes: ['qr'],
//         onCodeScanned: async (codes) => {
//             try {
//                 const qrData = JSON.parse(codes[0].value);
//                 await addDoc(collection(db, "attendance"), {
//                     eventId: qrData.eventId,
//                     coordinatorId: coordinatorId,
//                     universityId: universityId,
//                     timestamp: new Date().toISOString(),
//                     status: 'present'
//                 });
//                 Alert.alert("Success", "Attendance marked successfully!");
//             } catch (error) {
//                 Alert.alert("Error", "Failed to mark attendance");
//             }
//         }
//     });

//     useEffect(() => {
//         checkPermission();
//     }, []);

//     const checkPermission = async () => {
//         const permission = await Camera.requestCameraPermission();
//         setHasPermission(permission === 'authorized');
//     };

//     if (!device || !hasPermission) {
//         return (
//             <View style={styles.container}>
//                 <Text style={styles.overlayText}>No camera available</Text>
//             </View>
//         );
//     }

//     return (
//         <View style={styles.container}>
//             <Camera
//                 style={StyleSheet.absoluteFill}
//                 device={device}
//                 isActive={true}
//                 codeScanner={codeScanner}
//             />
//             <TouchableOpacity 
//                 style={styles.cancelButton}
//                 onPress={() => navigation.goBack()}
//             >
//                 <Text style={styles.buttonText}>Cancel</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };
