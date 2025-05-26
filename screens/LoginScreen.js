import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const success = await login(email, password);
    if (success) {
      navigation.replace('Dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/parking-bg.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>

          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            mode="outlined"
            secureTextEntry
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Button
            mode="contained"
            onPress={handleLogin}
            style={styles.button}
            loading={loading}
            disabled={loading}
          >
            Login
          </Button>

          <Button
            mode="text"
            onPress={() => navigation.navigate('Register')}
            style={styles.linkButton}
          >
            Don't have an account? Register
          </Button>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
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

export default LoginScreen;
