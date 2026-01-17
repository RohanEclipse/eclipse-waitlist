import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCHWpKJZVne9uSnx2wwMC8bgMkj9QQQFDc",
  authDomain: "eclipse-waitlist.firebaseapp.com",
  projectId: "eclipse-waitlist",
  storageBucket: "eclipse-waitlist.firebasestorage.app",
  messagingSenderId: "708083540018",
  appId: "1:708083540018:web:4466e6e49379338e311c2b",
  measurementId: "G-NTYL9CWHJR",
};

// Lazy initialization to avoid blocking during build
let _app = null;
let _db = null;

function getAppInstance() {
  if (!_app) {
    _app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  }
  return _app;
}

function getDbInstance() {
  if (!_db) {
    _db = getFirestore(getAppInstance());
  }
  return _db;
}

const app = getAppInstance();
const db = getDbInstance();

// Only initialize analytics if window exists (client side)
let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, db, analytics };