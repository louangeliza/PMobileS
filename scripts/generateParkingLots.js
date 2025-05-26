const parkingLots = [
  {
    name: "Downtown Central Parking",
    location: "123 Main Street, Downtown",
    totalSpaces: 200,
    availableSpaces: 45,
    feePerHour: 5.00,
    coordinates: {
      latitude: 40.7128,
      longitude: -74.0060
    },
    amenities: ["24/7 Security", "CCTV", "Lighting"],
    rating: 4.5,
    isOpen: true
  },
  {
    name: "City Mall Parking",
    location: "456 Shopping Avenue, City Center",
    totalSpaces: 500,
    availableSpaces: 120,
    feePerHour: 3.50,
    coordinates: {
      latitude: 40.7142,
      longitude: -74.0064
    },
    amenities: ["Valet Service", "Covered Parking", "Security"],
    rating: 4.2,
    isOpen: true
  },
  {
    name: "Airport Express Parking",
    location: "789 Terminal Road, Airport Zone",
    totalSpaces: 1000,
    availableSpaces: 300,
    feePerHour: 7.00,
    coordinates: {
      latitude: 40.7150,
      longitude: -74.0070
    },
    amenities: ["24/7 Shuttle", "Covered Parking", "Security"],
    rating: 4.7,
    isOpen: true
  },
  {
    name: "University Campus Parking",
    location: "101 Campus Drive, University Area",
    totalSpaces: 300,
    availableSpaces: 50,
    feePerHour: 2.50,
    coordinates: {
      latitude: 40.7135,
      longitude: -74.0055
    },
    amenities: ["Student Discount", "Security", "Lighting"],
    rating: 4.0,
    isOpen: true
  },
  {
    name: "Hospital Visitor Parking",
    location: "202 Medical Center Drive, Healthcare District",
    totalSpaces: 400,
    availableSpaces: 100,
    feePerHour: 4.00,
    coordinates: {
      latitude: 40.7145,
      longitude: -74.0065
    },
    amenities: ["24/7 Access", "Security", "Covered Parking"],
    rating: 4.3,
    isOpen: true
  },
  {
    name: "Beachfront Parking",
    location: "303 Coastal Highway, Beach Area",
    totalSpaces: 150,
    availableSpaces: 30,
    feePerHour: 6.00,
    coordinates: {
      latitude: 40.7130,
      longitude: -74.0050
    },
    amenities: ["Beach Access", "Security", "Lighting"],
    rating: 4.6,
    isOpen: true
  },
  {
    name: "Stadium Parking",
    location: "404 Sports Avenue, Stadium District",
    totalSpaces: 2000,
    availableSpaces: 800,
    feePerHour: 8.00,
    coordinates: {
      latitude: 40.7148,
      longitude: -74.0068
    },
    amenities: ["Event Parking", "Security", "Lighting"],
    rating: 4.4,
    isOpen: true
  },
  {
    name: "Business District Parking",
    location: "505 Corporate Plaza, Business Center",
    totalSpaces: 600,
    availableSpaces: 150,
    feePerHour: 6.50,
    coordinates: {
      latitude: 40.7138,
      longitude: -74.0062
    },
    amenities: ["Business Hours", "Security", "Covered Parking"],
    rating: 4.5,
    isOpen: true
  }
];

// Function to create parking lots in MockAPI
async function createParkingLots() {
  const BASE_URL = 'https://68333d9b464b499636fecb2e.mockapi.io/api/v1';
  
  for (const parkingLot of parkingLots) {
    try {
      const response = await fetch(`${BASE_URL}/parking-lots`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(parkingLot),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log(`Created parking lot: ${data.name}`);
    } catch (error) {
      console.error(`Error creating parking lot ${parkingLot.name}:`, error);
    }
  }
}

// Execute the function
createParkingLots(); 