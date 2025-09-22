const admin = require('firebase-admin');
const fs = require('fs');

let serviceAccount;
try {
  const accountData = process.env.FIREBASE_SERVICE_ACCOUNT;

  if (accountData.endsWith('.json')) {
    // Load from file (local dev)
    serviceAccount = JSON.parse(fs.readFileSync(accountData, 'utf8'));
  } else {
    // Load from inline JSON (for deployment)
    serviceAccount = JSON.parse(accountData);
  }
} catch (error) {
  console.warn('⚠️ Firebase service account not configured. Authentication will be disabled.');
  serviceAccount = null;
}

if (serviceAccount) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const idToken = authHeader.split('Bearer ')[1];

    if (!serviceAccount) {
      req.user = { uid: 'dev-user', email: 'dev@example.com' };
      return next();
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = { verifyToken };
