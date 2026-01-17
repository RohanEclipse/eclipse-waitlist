// Lazy initialization - only init when actually needed (in API handlers)
let _admin = null;
let _adminDb = null;
let _initialized = false;

function getCredential() {
  // Production: Use JSON from environment variable
  if (process.env.FIREBASE_ADMIN_CREDENTIALS_JSON) {
    try {
      const creds = JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS_JSON);
      return require("firebase-admin").credential.cert(creds);
    } catch (error) {
      console.error("[firebaseAdmin] Error parsing FIREBASE_ADMIN_CREDENTIALS_JSON:", error);
      throw error;
    }
  }
  
  // Development: Use GOOGLE_APPLICATION_CREDENTIALS file path (local dev)
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    return require("firebase-admin").credential.applicationDefault();
  }
  
  throw new Error("Firebase Admin credentials not configured. Set FIREBASE_ADMIN_CREDENTIALS_JSON (production) or GOOGLE_APPLICATION_CREDENTIALS (local dev)");
}

function initializeAdmin() {
  if (!_initialized) {
    // Lazy require - only when actually called from API handler
    if (!_admin) {
      _admin = require("firebase-admin");
    }
    
    if (!_admin.apps.length) {
      try {
        _admin.initializeApp({
          credential: getCredential(),
        });
      } catch (error) {
        console.error("[firebaseAdmin] Initialization error:", error);
        throw error;
      }
    }
    _initialized = true;
  }
}

// Lazy getter for Firestore - only initializes when first accessed
function getAdminDb() {
  if (!_adminDb) {
    initializeAdmin();
    _adminDb = _admin.firestore();
  }
  return _adminDb;
}

// Export object with getter properties - these only execute when accessed
export const adminDb = {
  get collection() {
    const db = getAdminDb();
    return db.collection.bind(db);
  },
  get runTransaction() {
    const db = getAdminDb();
    return db.runTransaction.bind(db);
  },
};

// Export function for direct access
export function getFirestore() {
  return getAdminDb();
}

export default function getAdmin() {
  initializeAdmin();
  return _admin;
}
