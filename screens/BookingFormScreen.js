import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Text, Card, HelperText } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

const BookingFormScreen = ({ route, navigation }) => {
  const { parkingLot } = route.params;
  
  const [plateNumber, setPlateNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [entryTime, setEntryTime] = useState(new Date());
  const [exitTime, setExitTime] = useState(new Date(Date.now() + 3600000)); // Default 1 hour later
  const [showEntryPicker, setShowEntryPicker] = useState(false);
  const [showExitPicker, setShowExitPicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const calculateEstimatedFee = () => {
    const durationInHours = (exitTime - entryTime) / (1000 * 60 * 60);
    return (durationInHours * parkingLot.feePerHour).toFixed(2);
  };

  const handleBooking = async () => {
    if (!plateNumber) {
      // TODO: Show error message
      return;
    }

    setLoading(true);
    // TODO: Implement booking logic with MockAPI
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('BookingConfirmation', {
        booking: {
          id: '123', // This would come from the API
          parkingLot,
          plateNumber,
          vehicleType,
          entryTime,
          exitTime,
          estimatedFee: calculateEstimatedFee(),
        },
      });
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.title}>Book Parking</Text>
            <Text style={styles.subtitle}>{parkingLot.name}</Text>

            <TextInput
              label="License Plate Number"
              value={plateNumber}
              onChangeText={setPlateNumber}
              mode="outlined"
              style={styles.input}
              autoCapitalize="characters"
            />

            <TextInput
              label="Vehicle Type (Optional)"
              value={vehicleType}
              onChangeText={setVehicleType}
              mode="outlined"
              style={styles.input}
              placeholder="e.g., Sedan, SUV, Truck"
            />

            <View style={styles.timeContainer}>
              <Text style={styles.timeLabel}>Entry Time</Text>
              <Button
                mode="outlined"
                onPress={() => setShowEntryPicker(true)}
                style={styles.timeButton}
              >
                {entryTime.toLocaleTimeString()}
              </Button>
              {showEntryPicker && (
                <DateTimePicker
                  value={entryTime}
                  mode="time"
                  is24Hour={true}
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowEntryPicker(false);
                    if (selectedDate) {
                      setEntryTime(selectedDate);
                    }
                  }}
                />
              )}
            </View>

            <View style={styles.timeContainer}>
              <Text style={styles.timeLabel}>Expected Exit Time</Text>
              <Button
                mode="outlined"
                onPress={() => setShowExitPicker(true)}
                style={styles.timeButton}
              >
                {exitTime.toLocaleTimeString()}
              </Button>
              {showExitPicker && (
                <DateTimePicker
                  value={exitTime}
                  mode="time"
                  is24Hour={true}
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowExitPicker(false);
                    if (selectedDate) {
                      setExitTime(selectedDate);
                    }
                  }}
                />
              )}
            </View>

            <View style={styles.feeContainer}>
              <Text style={styles.feeLabel}>Estimated Fee:</Text>
              <Text style={styles.feeValue}>${calculateEstimatedFee()}</Text>
            </View>

            <Button
              mode="contained"
              onPress={handleBooking}
              style={styles.bookButton}
              loading={loading}
              disabled={loading}
            >
              Confirm Booking & Get Ticket
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 16,
  },
  card: {
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  timeContainer: {
    marginBottom: 16,
  },
  timeLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  timeButton: {
    width: '100%',
  },
  feeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  feeLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  feeValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  bookButton: {
    marginTop: 8,
    paddingVertical: 8,
  },
});

export default BookingFormScreen; 