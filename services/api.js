const BASE_URL = 'https://68333d9b464b499636fecb2e.mockapi.io/api/v1';

export const api = {
  // Auth endpoints
  register: async (userData) => {
    try {
      console.log('Attempting registration with:', { ...userData, password: '***' });
      
      const response = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      const responseData = await response.json();
      console.log('Registration response:', responseData);
      return responseData;
    } catch (error) {
      console.error('Registration error:', error);
      if (error.message === 'Network request failed') {
        throw new Error('Unable to connect to the server. Please check your internet connection.');
      }
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      const response = await fetch(`${BASE_URL}/users?email=${email}`, {
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const users = await response.json();
      const user = users.find(u => u.email === email && u.password === password);
      
      if (!user) {
        throw new Error('Invalid credentials');
      }
      
      return user;
    } catch (error) {
      console.error('Login error:', error);
      if (error.message === 'Network request failed') {
        throw new Error('Unable to connect to the server. Please check your internet connection.');
      }
      throw error;
    }
  },

  // Parking lots endpoints
  getParkingLots: async () => {
    try {
      const response = await fetch(`${BASE_URL}/parking-lots`, {
        headers: {
          'Accept': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Get parking lots error:', error);
      if (error.message === 'Network request failed') {
        throw new Error('Unable to connect to the server. Please check your internet connection.');
      }
      throw error;
    }
  },

  getParkingLotById: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/parking-lots/${id}`, {
        headers: {
          'Accept': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Get parking lot by ID error:', error);
      if (error.message === 'Network request failed') {
        throw new Error('Unable to connect to the server. Please check your internet connection.');
      }
      throw error;
    }
  },

  createParkingLot: async (parkingLotData) => {
    try {
      const response = await fetch(`${BASE_URL}/parking-lots`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(parkingLotData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Create parking lot error:', error);
      if (error.message === 'Network request failed') {
        throw new Error('Unable to connect to the server. Please check your internet connection.');
      }
      throw error;
    }
  },

  updateParkingLot: async (id, parkingLotData) => {
    try {
      const response = await fetch(`${BASE_URL}/parking-lots/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(parkingLotData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Update parking lot error:', error);
      if (error.message === 'Network request failed') {
        throw new Error('Unable to connect to the server. Please check your internet connection.');
      }
      throw error;
    }
  },

  deleteParkingLot: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/parking-lots/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Delete parking lot error:', error);
      if (error.message === 'Network request failed') {
        throw new Error('Unable to connect to the server. Please check your internet connection.');
      }
      throw error;
    }
  },

  getParkingLotsByLocation: async (location) => {
    try {
      const response = await fetch(`${BASE_URL}/parking-lots?location=${encodeURIComponent(location)}`, {
        headers: {
          'Accept': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Get parking lots by location error:', error);
      if (error.message === 'Network request failed') {
        throw new Error('Unable to connect to the server. Please check your internet connection.');
      }
      throw error;
    }
  },

  // Bookings endpoints
  createBooking: async (bookingData) => {
    try {
      const response = await fetch(`${BASE_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Create booking error:', error);
      if (error.message === 'Network request failed') {
        throw new Error('Unable to connect to the server. Please check your internet connection.');
      }
      throw error;
    }
  },

  getUserBookings: async (userId) => {
    try {
      const response = await fetch(`${BASE_URL}/bookings?userId=${userId}`, {
        headers: {
          'Accept': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Get user bookings error:', error);
      if (error.message === 'Network request failed') {
        throw new Error('Unable to connect to the server. Please check your internet connection.');
      }
      throw error;
    }
  },
}; 