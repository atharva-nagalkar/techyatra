const { MongoClient } = require('mongodb');
require('dotenv').config();

async function testConnection() {
  console.log('Testing MongoDB Atlas connection...');
  
  // Mask the password in the connection string for security
  const maskedUri = process.env.MONGO_URI.replace(/:([^:]*?)@/, ':***@');
  console.log('Connection string:', maskedUri);

  const client = new MongoClient(process.env.MONGO_URI, {
    connectTimeoutMS: 15000,
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    maxPoolSize: 10,
    retryWrites: true,
    w: 'majority'
  });

  try {
    console.log('Attempting to connect to MongoDB Atlas...');
    await client.connect();
    
    // Test the connection
    const adminDb = client.db('admin');
    await adminDb.command({ ping: 1 });
    
    // Get server info
    const serverStatus = await adminDb.command({ serverStatus: 1 });
    
    console.log('✅ Successfully connected to MongoDB Atlas!');
    console.log('MongoDB Server Version:', serverStatus.version);
    
    // List all databases
    const databases = await adminDb.admin().listDatabases();
    console.log('\nAvailable databases:');
    databases.databases.forEach(db => console.log(`- ${db.name}`));
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.error('Error details:', {
      name: error.name,
      code: error.code,
      codeName: error.codeName,
      errorLabels: error.errorLabels,
    });
    console.error('Error details:', {
      name: error.name,
      code: error.code,
      codeName: error.codeName,
      errorLabels: error.errorLabels,
    });
  } finally {
    await client.close();
    process.exit(0);
  }
}

testConnection();
