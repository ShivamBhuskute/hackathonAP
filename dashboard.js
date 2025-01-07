import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>EventHub</Text>

      <Text style={styles.title}>Sign in</Text>

      <View style={styles.inputContainer}>
        <Icon name="mail-outline" size={20} color="#888" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="abc@email.com"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock-closed-outline" size={20} color="#888" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Icon name="eye-off-outline" size={20} color="#888" style={styles.icon} />
      </View>

      <View style={styles.options}>
        <View style={styles.rememberMe}>
          <Switch
            value={rememberMe}
            onValueChange={() => setRememberMe(!rememberMe)}
          />
          <Text style={styles.optionText}>Remember Me</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.optionText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.signInButton}>
        <Text style={styles.signInText}>SIGN IN</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>OR</Text>

      <TouchableOpacity style={[styles.socialButton, styles.googleButton]}>
        <Text style={styles.socialText}>Login with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.socialButton, styles.facebookButton]}>
        <Text style={styles.socialText}>Login with Facebook</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don’t have an account? </Text>
        <TouchableOpacity>
          <Text style={styles.signUpText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  icon: {
    marginLeft: 5,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 14,
    color: '#555',
  },
  signInButton: {
    backgroundColor: '#3B82F6',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  signInText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    fontSize: 14,
    color: '#aaa',
    marginVertical: 10,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    marginBottom: 10,
  },
  googleButton: {
    backgroundColor: '#f5f5f5',
  },
  facebookButton: {
    backgroundColor: '#4267B2',
  },
  socialText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#555',
  },
  signUpText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: 'bold',
  },
});

export default SignInScreen;
