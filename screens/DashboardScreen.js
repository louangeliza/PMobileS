import React, { useState } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Searchbar, Card, Text, Button, ActivityIndicator } from 'react-native-paper';

// Temporary mock data
const MOCK_PARKING_LOTS = [
  {
    id: '1',
    name: 'Downtown Parking',
    location: '123 Main St',
    vacantSpaces: 15,
    feePerHour: 5,
  },
  {
    id: '2',
    name: 'City Center Garage',
    location: '456 Market St',
    vacantSpaces: 8,
    feePerHour: 7,
  },
  {
    id: '3',
    name: 'Riverside Parking',
    location: '789 River Rd',
    vacantSpaces: 20,
    feePerHour: 4,
  },
];

const DashboardScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // TODO: Implement refresh logic with MockAPI
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const renderParkingLot = ({ item }) => (
    <Card style={styles.card} onPress={() => navigation.navigate('ParkingLotDetails', { parkingLot: item })}>
      <Card.Content>
        <Text style={styles.parkingName}>{item.name}</Text>
        <Text style={styles.location}>{item.location}</Text>
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Vacant Spaces</Text>
            <Text style={styles.detailValue}>{item.vacantSpaces}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Fee/Hour</Text>
            <Text style={styles.detailValue}>${item.feePerHour}</Text>
          </View>
        </View>
      </Card.Content>
      <Card.Actions>
        <Button mode="contained" onPress={() => navigation.navigate('ParkingLotDetails', { parkingLot: item })}>
          View Details
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search parking lots..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />
      
      {loading ? (
        <ActivityIndicator style={styles.loader} size="large" />
      ) : (
        <FlatList
          data={MOCK_PARKING_LOTS}
          renderItem={renderParkingLot}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchBar: {
    margin: 16,
    elevation: 4,
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 4,
  },
  parkingName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DashboardScreen; 