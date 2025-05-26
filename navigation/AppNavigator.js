import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Auth Screens
import AuthScreen from '../screens/AuthScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

// Main Screens
import DashboardScreen from '../screens/DashboardScreen';
import ParkingLotDetailsScreen from '../screens/ParkingLotDetailsScreen';
import BookingFormScreen from '../screens/BookingFormScreen';
import BookingConfirmationScreen from '../screens/BookingConfirmationScreen';
import ActiveParkingScreen from '../screens/ActiveParkingScreen';
import ExitParkingScreen from '../screens/ExitParkingScreen';
import PaymentScreen from '../screens/PaymentScreen';
import PaymentSuccessScreen from '../screens/PaymentSuccessScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Auth"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2196F3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        {/* Auth Stack */}
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: 'Create Account' }}
        />

        {/* Main Stack */}
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ title: 'CARGOJET' }}
        />
        <Stack.Screen
          name="ParkingLotDetails"
          component={ParkingLotDetailsScreen}
          options={{ title: 'Parking Details' }}
        />
        <Stack.Screen
          name="BookingForm"
          component={BookingFormScreen}
          options={{ title: 'Book Parking' }}
        />
        <Stack.Screen
          name="BookingConfirmation"
          component={BookingConfirmationScreen}
          options={{ title: 'Booking Confirmed' }}
        />
        <Stack.Screen
          name="ActiveParking"
          component={ActiveParkingScreen}
          options={{ title: 'Active Parking' }}
        />
        <Stack.Screen
          name="ExitParking"
          component={ExitParkingScreen}
          options={{ title: 'Exit Parking' }}
        />
        <Stack.Screen
          name="Payment"
          component={PaymentScreen}
          options={{ title: 'Payment' }}
        />
        <Stack.Screen
          name="PaymentSuccess"
          component={PaymentSuccessScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 