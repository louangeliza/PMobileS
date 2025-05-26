import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { register, loading } = useAuth();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleRegister = async () => {
    try {
      setError('');

      // Validation
      if (!name || !email || !password || !confirmPassword) {
        setError('Please fill in all fields');
        return;
      }

      if (!validateEmail(email)) {
        setError('Please enter a valid email address');
        return;
      }

      if (!validatePassword(password)) {
        setError('Password must be at least 6 characters long');
        return;
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      const success = await register({
        name,
        email,
        password,
        createdAt: new Date().toISOString(),
      });

      if (success) {
        navigation.replace('Login');
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/parking-bg.jpg')}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Sign up to get started</Text>

            <TextInput
              label="Full Name"
              value={name}
              onChangeText={(text) => {
                setName(text);
                setError('');
              }}
              style={styles.input}
              mode="outlined"
            />

            <TextInput
              label="Email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setError('');
              }}
              style={styles.input}
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              label="Password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setError('');
              }}
              style={styles.input}
              mode="outlined"
              secureTextEntry
            />

            <TextInput
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                setError('');
              }}
              style={styles.input}
              mode="outlined"
              secureTextEntry
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Button
              mode="contained"
              onPress={handleRegister}
              style={styles.button}
              loading={loading}
              disabled={loading}
            >
              Register
            </Button>

            <Button
              mode="text"
              onPress={() => navigation.navigate('Login')}
              style={styles.linkButton}
            >
              Already have an account? Login
            </Button>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  formContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    padding: 5,
  },
  linkButton: {
    marginTop: 15,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default RegisterScreen;
