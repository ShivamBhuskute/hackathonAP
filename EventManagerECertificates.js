import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, Button, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { PDFDocument, rgb } from 'react-native-pdf-lib';

export default function App() {
  const [name, setName] = useState('');
  const [eventName, setEventName] = useState('');
  const [date, setDate] = useState('');
  const [signature, setSignature] = useState(null);
  const [showCertificate, setShowCertificate] = useState(false);
  const [certificateData, setCertificateData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const pickSignature = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSignature(result.assets[0].uri);
    }
  };

  const generateCertificate = async () => {
    if (!name || !eventName || !date) {
      setErrorMessage('Please fill in all fields before generating the certificate.');
      return;
    }
    setErrorMessage('');
    setLoading(true);
    
    try {
      const certificate = { name, eventName, date, signature };
      setCertificateData(certificate);
      setShowCertificate(true);
    } catch (error) {
      console.error('Error generating certificate:', error);
      Alert.alert('Error', 'Unable to generate the certificate. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const sendCertificate = () => {
    Alert.alert('Certificate Sent', The certificate for ${name} has been sent successfully.);
    setShowCertificate(false);
  };

  const downloadCertificate = async () => {
    try {
      const doc = await PDFDocument.create();
      const page = doc.addPage([600, 800]);

      page.drawText('Certificate of Recognition', {
        x: 200,
        y: 700,
        fontSize: 24,
        color: rgb(1, 1, 1),
      });

      page.drawText(This award is given to ${certificateData?.name}, {
        x: 180,
        y: 650,
        fontSize: 18,
        color: rgb(1, 1, 1), 
      });

      page.drawText(This is to certify that ${certificateData?.name} has actively participated in the ${certificateData?.eventName} event held on ${certificateData?.date}, {
        x: 50,
        y: 600,
        fontSize: 14,
        color: rgb(1, 1, 1), 
      });

      page.drawText('Your dedication and contribution to the event are highly appreciated, and we commend your enthusiasm and efforts.', {
        x: 50,
        y: 550,
        fontSize: 12,
        color: rgb(1, 1, 1), 
      });

      if (signature) {
        const signatureImage = await FileSystem.readAsStringAsync(signature, { encoding: FileSystem.EncodingType.Base64 });
        page.drawImage(signatureImage, {
          x: 200,
          y: 450,
          width: 100,
          height: 50,
        });
      }

      page.drawText('Principal', {
        x: 250,
        y: 400,
        fontSize: 14,
        color: rgb(1, 1, 1), 
      });

      const pdfPath = FileSystem.documentDirectory + 'certificate.pdf';
      await doc.writeToFile(pdfPath);

      await Sharing.shareAsync(pdfPath);

      Alert.alert('Download Successful', 'The certificate has been downloaded.');
    } catch (error) {
      console.error('Error generating PDF:', error);
      Alert.alert('Error', 'Unable to generate the certificate. Please try again.');
    }
  };

  const clearFields = () => {
    setName('');
    setEventName('');
    setDate('');
    setSignature(null);
    setCertificateData(null);
    setShowCertificate(false);
    setErrorMessage('');
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#00ff00" />}
      
      {!showCertificate ? (
        <View style={styles.form}>
          <Text style={styles.label}>Enter Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <Text style={styles.label}>Enter Event Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Event Name"
            value={eventName}
            onChangeText={setEventName}
          />
          <Text style={styles.label}>Enter Date:</Text>
          <TextInput
            style={styles.input}
            placeholder="Date (DD/MM/YYYY)"
            value={date}
            onChangeText={setDate}
          />
          <Text style={styles.label}>Upload Principal's Signature:</Text>
          <Button title="Pick Signature" onPress={pickSignature} />
          {signature && (
            <Image source={{ uri: signature }} style={styles.previewImage} />
          )}
          {errorMessage ? (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          ) : null}
          <TouchableOpacity
            style={styles.generateButton}
            onPress={generateCertificate}
            disabled={loading}
          >
            <Text style={styles.generateButtonText}>Generate Certificate</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.certificateContainer}>
          <Image
            source={require('./123.jpg')}
            style={styles.certificateBackground}
          />
          <View style={styles.textContainer}>
            <Text style={[styles.text, styles.header]}>Certificate of Recognition</Text>
            <Text style={[styles.text, styles.subHeader]}>This award is given to</Text>
            <Text style={[styles.text, styles.name]}>{certificateData?.name}</Text>
            <Text style={[styles.text, styles.body]}>{This is to certify that ${certificateData?.name} has actively participated in the ${certificateData?.eventName} event held on ${certificateData?.date}.}</Text>
            <Text style={[styles.text, styles.footer]} >
              Your dedication and contribution to the event are highly appreciated, and we commend your enthusiasm and efforts.
            </Text>
            {signature && <Image source={{ uri: signature }} style={styles.signature} />}
            <Text style={[styles.text, styles.principal]}>Principal</Text>
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={sendCertificate}>
              <Text style={styles.buttonText}>Send to Student</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={downloadCertificate}>
              <Text style={styles.buttonText}>Download Certificate</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={clearFields}>
              <Text style={styles.buttonText}>Clear Fields</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',  // Dark background color
    paddingHorizontal: 20,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  label: {
    fontSize: 18,
    marginVertical: 5,
    fontWeight: 'bold',
    color: '#fff', // White text color
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    fontSize: 16,
    color: '#fff', // White text color
    backgroundColor: '#333', // Dark input background
  },
  previewImage: {
    width: 100,
    height: 50,
    marginVertical: 10,
  },
  generateButton: {
    backgroundColor: '#003366',  // Dark blue color
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 20,
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  certificateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  certificateBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  textContainer: {
    width: '80%',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    textAlign: 'center',
  },
  text: {
    color: '#000', // Black text color for certificate text
    textAlign: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 18,
    fontStyle: 'italic',
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  body: {
    fontSize: 14,
    marginBottom: 18,
  },
  footer: {
    fontSize: 12,
    marginBottom: 18,
  },
  signature: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  principal: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 30,
    left: '10%',
    right: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  button: {
    backgroundColor: '#003366',  // Dark blue color
    paddingVertical: 12,
    borderRadius: 5,
    marginBottom: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  errorMessage: {
    color: 'red',
    fontSize: 14,
    marginVertical: 10,
  },
});
