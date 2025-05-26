import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Card, ProgressBar } from 'react-native-paper';

const ActiveParkingScreen = ({ route, navigation }) => {
  const { booking } = route.params;
  const [currentTime, setCurrentTime] = useState(new Date());
  const [duration, setDuration] = useState(0);
  const [currentFee, setCurrentFee] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      // Calculate duration in hours
      const durationInHours = (now - booking.entryTime) / (1000 * 60 * 60);
      setDuration(durationInHours);
      
      // Calculate current fee
      const fee = durationInHours * booking.parkingLot.feePerHour;
      setCurrentFee(fee.toFixed(2));
    }, 1000);

    return () => clearInterval(timer);
  }, [booking]);

  const formatDuration = (hours) => {
    const wholeHours = Math.floor(hours);
    const minutes = Math.floor((hours - wholeHours) * 60);
    return `${wholeHours}h ${minutes}m`;
  };

  const handleExitParking = () => {
    navigation.navigate('ExitParking', {
      booking: {
        ...booking,
        actualExitTime: currentTime,
        actualFee: currentFee,
      },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Active Parking Session</Text>
          
          <View style={styles.timerContainer}>
            <Text style={styles.timerLabel}>Time Parked</Text>
            <Text style={styles.timerValue}>{formatDuration(duration)}</Text>
          </View>

          <View style={styles.progressContainer}>
            <Text style={styles.progressLabel}>Session Progress</Text>
            <ProgressBar
              progress={duration / ((booking.exitTime - booking.entryTime) / (1000 * 60 * 60))}
              color="#2196F3"
              style={styles.progressBar}
            />
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Parking Lot</Text>
              <Text style={styles.detailValue}>{booking.parkingLot.name}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>License Plate</Text>
              <Text style={styles.detailValue}>{booking.plateNumber}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Entry Time</Text>
              <Text style={styles.detailValue}>
                {booking.entryTime.toLocaleString()}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Expected Exit</Text>
              <Text style={styles.detailValue}>
                {booking.exitTime.toLocaleString()}
              </Text>
            </View>

            <View style={styles.feeContainer}>
              <Text style={styles.feeLabel}>Current Fee</Text>
              <Text style={styles.feeValue}>${currentFee}</Text>
            </View>
          </View>

          <Button
            mode="contained"
            onPress={handleExitParking}
            style={styles.exitButton}
          >
            Exit Parking
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    margin: 16,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  timerLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  timerValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  detailsContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  feeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#dee2e6',
  },
  feeLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  feeValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  exitButton: {
    marginTop: 8,
    paddingVertical: 8,
  },
});

export default ActiveParkingScreen; 