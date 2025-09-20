const mongoose = require('mongoose');
const Place = require('./models/Place');
const Alert = require('./models/Alert');
const User = require('./models/User');
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
    console.log('🗑️  Cleared existing data');

    // Insert sample data
    await Place.insertMany(samplePlaces);
    console.log(`✅ Inserted ${samplePlaces.length} places`);

    await Alert.insertMany(sampleAlerts);
    console.log(`✅ Inserted ${sampleAlerts.length} alerts`);

    await User.create(sampleUser);
    console.log('✅ Inserted sample user');

    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run seed function
seedDatabase();