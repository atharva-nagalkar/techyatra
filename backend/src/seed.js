const mongoose = require('mongoose');
const Place = require('./models/Place');
const Alert = require('./models/Alert');
const User = require('./models/User');
const Hotel = require('./models/Hotel');
const Restaurant = require('./models/Restaurant');
const TransportOption = require('./models/TransportOption');
const EmergencyContact = require('./models/EmergencyContact');
const WeatherRecord = require('./models/WeatherRecord');
require('dotenv').config();

const samplePlaces = [
  {
    name: "Amber Fort",
    description: "A magnificent fort palace with stunning architecture and panoramic views of Jaipur city.",
    location: {
      type: "Point",
      coordinates: [75.8513, 26.9855]
    },
    category: "tourist",
    tags: ["fort", "palace", "history", "architecture", "photography"],
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
      "https://images.unsplash.com/photo-1587474260584-b6574745ccf7?w=800"
    ],
    rating: 4.5,
    reviews: [
      {
        userId: "user1",
        userName: "Rajesh Kumar",
        rating: 5,
        comment: "Amazing architecture and great views!"
      }
    ],
    contact: {
      phone: "+91-141-2530843",
      email: "info@amberfort.com"
    },
    website: "https://www.amberfort.com",
    timings: {
      open: "08:00",
      close: "18:00",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    },
    priceRange: {
      min: 100,
      max: 500,
      currency: "INR"
    },
    state: "Rajasthan",
    city: "Jaipur"
  },
  {
    name: "Hawa Mahal",
    description: "The Palace of Winds - a unique five-story palace with 953 small windows.",
    location: {
      type: "Point",
      coordinates: [75.8267, 26.9239]
    },
    category: "tourist",
    tags: ["palace", "architecture", "pink city", "landmark"],
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800"
    ],
    rating: 4.3,
    reviews: [
      {
        userId: "user2",
        userName: "Priya Sharma",
        rating: 4,
        comment: "Beautiful palace, great for photos!"
      }
    ],
    contact: {
      phone: "+91-141-2618862"
    },
    timings: {
      open: "09:00",
      close: "17:00",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    },
    priceRange: {
      min: 50,
      max: 200,
      currency: "INR"
    },
    state: "Rajasthan",
    city: "Jaipur"
  },
  {
    name: "Johari Bazaar",
    description: "Famous jewelry market in Jaipur, known for traditional Rajasthani jewelry and gems.",
    location: {
      type: "Point",
      coordinates: [75.8267, 26.9239]
    },
    category: "shopping",
    tags: ["jewelry", "gems", "traditional", "shopping", "bazaar"],
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800"
    ],
    rating: 4.2,
    reviews: [
      {
        userId: "user3",
        userName: "Amit Singh",
        rating: 4,
        comment: "Great place for traditional jewelry shopping!"
      }
    ],
    contact: {
      phone: "+91-141-2618862"
    },
    timings: {
      open: "10:00",
      close: "19:00",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    },
    priceRange: {
      min: 1000,
      max: 50000,
      currency: "INR"
    },
    state: "Rajasthan",
    city: "Jaipur"
  },
  {
    name: "Nahargarh Fort Trek",
    description: "A moderate trek to Nahargarh Fort offering beautiful city views and sunset spots.",
    location: {
      type: "Point",
      coordinates: [75.8200, 26.9333]
    },
    category: "trekking",
    tags: ["trekking", "fort", "sunset", "city view", "hiking"],
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800"
    ],
    rating: 4.4,
    reviews: [
      {
        userId: "user4",
        userName: "Suresh Patel",
        rating: 5,
        comment: "Great trek with amazing sunset views!"
      }
    ],
    timings: {
      open: "06:00",
      close: "18:00",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    },
    priceRange: {
      min: 0,
      max: 100,
      currency: "INR"
    },
    state: "Rajasthan",
    city: "Jaipur"
  },
  {
    name: "Laxmi Misthan Bhandar",
    description: "Famous sweet shop in Jaipur, known for traditional Rajasthani sweets and snacks.",
    location: {
      type: "Point",
      coordinates: [75.8267, 26.9239]
    },
    category: "food",
    tags: ["sweets", "traditional", "snacks", "local food", "dessert"],
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800"
    ],
    rating: 4.6,
    reviews: [
      {
        userId: "user5",
        userName: "Meera Jain",
        rating: 5,
        comment: "Best traditional sweets in Jaipur!"
      }
    ],
    contact: {
      phone: "+91-141-2618862"
    },
    timings: {
      open: "08:00",
      close: "22:00",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    },
    priceRange: {
      min: 50,
      max: 500,
      currency: "INR"
    },
    state: "Rajasthan",
    city: "Jaipur"
  }
];

const samplePlacesMore = [
  {
    name: 'City Palace Udaipur',
    description: 'Historic palace complex with lake views.',
    location: { type: 'Point', coordinates: [73.6833, 24.5764] },
    category: 'tourist',
    rating: 4.6,
    state: 'Rajasthan',
    city: 'Udaipur'
  },
  {
    name: 'Jaisalmer Fort',
    description: 'Living fort with golden sandstone walls.',
    location: { type: 'Point', coordinates: [70.912, 26.9124] },
    category: 'tourist',
    rating: 4.7,
    state: 'Rajasthan',
    city: 'Jaisalmer'
  },
  {
    name: 'Sabarmati Ashram',
    description: 'Gandhi’s residence and museum.',
    location: { type: 'Point', coordinates: [72.5797, 23.06] },
    category: 'tourist',
    rating: 4.5,
    state: 'Gujarat',
    city: 'Ahmedabad'
  },
  {
    name: 'Marine Drive',
    description: 'Famous boulevard along the coast.',
    location: { type: 'Point', coordinates: [72.8194, 18.943] },
    category: 'tourist',
    rating: 4.6,
    state: 'Maharashtra',
    city: 'Mumbai'
  }
];

const sampleHotels = [
  {
    name: 'Haveli Heritage Hotel',
    description: 'Traditional Rajasthani haveli with modern amenities.',
    city: 'Jaipur',
    state: 'Rajasthan',
    address: 'Bapu Bazar, Jaipur',
    rating: 4.4,
    amenities: ['wifi', 'breakfast', 'parking'],
    priceRange: { min: 2000, max: 6000, currency: 'INR' },
    phone: '+91-141-2223333',
    website: 'https://haveli-heritage.example.com'
  },
  {
    name: 'Lakeview Resort',
    description: 'Scenic hotel near Lake Pichola.',
    city: 'Udaipur',
    state: 'Rajasthan',
    address: 'Lake Pichola Road',
    rating: 4.5,
    amenities: ['wifi','breakfast','pool'],
    priceRange: { min: 3000, max: 9000, currency: 'INR' },
    phone: '+91-294-2221111'
  },
  {
    name: 'Sabarmati Suites',
    description: 'Business-friendly stay near riverfront.',
    city: 'Ahmedabad',
    state: 'Gujarat',
    address: 'Riverfront Road',
    rating: 4.1,
    amenities: ['wifi','parking'],
    priceRange: { min: 1800, max: 5500, currency: 'INR' }
  },
  {
    name: 'Bandstand Bay Hotel',
    description: 'Coastal views and city access.',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: 'Bandra',
    rating: 4.2,
    amenities: ['wifi','breakfast','gym'],
    priceRange: { min: 4500, max: 12000, currency: 'INR' }
  }
];

const sampleRestaurants = [
  {
    name: 'Spice Route',
    description: 'Authentic Rajasthani thali and snacks.',
    cuisines: ['Rajasthani', 'Indian'],
    city: 'Jaipur',
    state: 'Rajasthan',
    address: 'MI Road, Jaipur',
    rating: 4.2,
    priceRange: { min: 300, max: 1200, currency: 'INR' },
    phone: '+91-141-1112222'
  },
  {
    name: 'Manek Chowk Eats',
    description: 'Iconic night street food hub.',
    cuisines: ['Street Food','Gujarati'],
    city: 'Ahmedabad',
    state: 'Gujarat',
    rating: 4.5,
    priceRange: { min: 100, max: 600, currency: 'INR' }
  },
  {
    name: 'Jaisal Treats',
    description: 'Local specialties and sweets.',
    cuisines: ['Rajasthani'],
    city: 'Jaisalmer',
    state: 'Rajasthan',
    rating: 4.1,
    priceRange: { min: 250, max: 900, currency: 'INR' }
  },
  {
    name: 'Marine Drive Cafe',
    description: 'Snacks with a sea view.',
    cuisines: ['Cafe','Indian'],
    city: 'Mumbai',
    state: 'Maharashtra',
    rating: 4.3,
    priceRange: { min: 200, max: 1500, currency: 'INR' }
  }
];

const sampleTransport = [
  {
    type: 'bus',
    from: 'Jaipur',
    to: 'Udaipur',
    operator: 'RSRTC',
    price: { amount: 600, currency: 'INR' },
    departureTime: new Date(Date.now() + 24*60*60*1000),
    arrivalTime: new Date(Date.now() + 24*60*60*1000 + 6*60*60*1000),
    durationMinutes: 360
  },
  {
    type: 'train',
    from: 'Ahmedabad',
    to: 'Surat',
    operator: 'Western Railway',
    price: { amount: 500, currency: 'INR' },
    departureTime: new Date(Date.now() + 36*60*60*1000),
    arrivalTime: new Date(Date.now() + 36*60*60*1000 + 3*60*60*1000),
    durationMinutes: 180
  },
  {
    type: 'flight',
    from: 'Mumbai',
    to: 'Ahmedabad',
    operator: 'IndiGo',
    price: { amount: 3500, currency: 'INR' },
    departureTime: new Date(Date.now() + 48*60*60*1000),
    arrivalTime: new Date(Date.now() + 48*60*60*1000 + 75*60*1000),
    durationMinutes: 75
  }
];

const sampleEmergency = [
  { label: 'Police', number: '100', state: 'Rajasthan', city: 'Jaipur', is24x7: true },
  { label: 'Ambulance', number: '108', state: 'Rajasthan', city: 'Jaipur', is24x7: true },
  { label: 'Fire', number: '101', state: 'Rajasthan', city: 'Jaipur', is24x7: true }
];

const sampleWeather = [
  {
    city: 'Jaipur',
    state: 'Rajasthan',
    currentTempC: 28,
    condition: 'Partly Cloudy',
    humidity: 45,
    windKph: 12,
    forecast: [
      { date: new Date(Date.now()+1*24*60*60*1000), minTempC: 23, maxTempC: 31, condition: 'Sunny' },
      { date: new Date(Date.now()+2*24*60*60*1000), minTempC: 22, maxTempC: 30, condition: 'Light Rain' }
    ],
    source: 'seed'
  }
];

const sampleAlerts = [
  {
    title: "Heavy Rainfall Alert",
    description: "Heavy rainfall expected in Jaipur and surrounding areas. Avoid waterlogged areas and plan travel accordingly.",
    type: "weather",
    severity: "medium",
    location: {
      type: "Point",
      coordinates: [75.8267, 26.9239]
    },
    state: "Rajasthan",
    city: "Jaipur",
    affectedAreas: ["Jaipur", "Ajmer", "Tonk"],
    validFrom: new Date(),
    validUntil: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    source: "India Meteorological Department"
  },
  {
    title: "Road Construction Alert",
    description: "Major road construction work on NH-8 near Jaipur. Expect traffic delays and plan alternative routes.",
    type: "transport",
    severity: "low",
    location: {
      type: "Point",
      coordinates: [75.8267, 26.9239]
    },
    state: "Rajasthan",
    city: "Jaipur",
    affectedAreas: ["NH-8 Jaipur stretch"],
    validFrom: new Date(),
    validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    source: "National Highways Authority of India"
  }
];

const sampleUser = {
  firebaseUid: "dev-user-123",
  email: "dev@example.com",
  phoneNumber: "+91-9876543210",
  name: "Dev User",
  age: 25,
  address: {
    street: "123 Main Street",
    city: "Jaipur",
    state: "Rajasthan",
    pincode: "302001",
    country: "India"
  },
  contactNumber: "+91-9876543210",
  preferences: {
    categories: ["tourist", "food", "shopping"],
    budget: {
      min: 1000,
      max: 10000,
      currency: "INR"
    },
    travelStyle: "mid-range"
  }
};

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ai_travel_mate', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Place.deleteMany({});
    await Alert.deleteMany({});
    await User.deleteMany({});
    await Hotel.deleteMany({});
    await Restaurant.deleteMany({});
    await TransportOption.deleteMany({});
    await EmergencyContact.deleteMany({});
    await WeatherRecord.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert sample data
    const allPlaces = [...samplePlaces, ...samplePlacesMore];
    await Place.insertMany(allPlaces);
    console.log(`✅ Inserted ${allPlaces.length} places`);

    await Alert.insertMany(sampleAlerts);
    console.log(`✅ Inserted ${sampleAlerts.length} alerts`);

    await User.create(sampleUser);
    console.log('✅ Inserted sample user');

    await Hotel.insertMany(sampleHotels);
    console.log(`✅ Inserted ${sampleHotels.length} hotels`);

    await Restaurant.insertMany(sampleRestaurants);
    console.log(`✅ Inserted ${sampleRestaurants.length} restaurants`);

    await TransportOption.insertMany(sampleTransport);
    console.log(`✅ Inserted ${sampleTransport.length} transport options`);

    await EmergencyContact.insertMany(sampleEmergency);
    console.log(`✅ Inserted ${sampleEmergency.length} emergency contacts`);

    await WeatherRecord.insertMany(sampleWeather);
    console.log(`✅ Inserted ${sampleWeather.length} weather records`);

    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run seed function
seedDatabase();