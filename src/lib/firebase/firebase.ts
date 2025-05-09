
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
// import { getStorage, type FirebaseStorage } from 'firebase/storage'; // Example for Storage

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID, // Optional
};

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;
// let storage: FirebaseStorage | undefined; // Example for Storage

const crucialConfigPresent =
  firebaseConfig.apiKey &&
  firebaseConfig.authDomain &&
  firebaseConfig.projectId;

if (crucialConfigPresent) {
  if (getApps().length === 0) {
    try {
      app = initializeApp(firebaseConfig);
    } catch (initError) {
        console.error("Firebase app initialization failed:", initError);
        // Ensure app is undefined so subsequent service initializations are skipped
        app = undefined; 
    }
  } else {
    app = getApps()[0];
  }

  // Only attempt to get auth and db if app was initialized successfully
  if (app) {
    try {
      auth = getAuth(app);
      db = getFirestore(app);
      // storage = getStorage(app); // Example for Storage
    } catch (serviceError) {
      console.error("Error initializing Firebase services (auth, firestore):", serviceError);
      // If services fail to initialize (e.g. due to invalid API key for a specific service),
      // ensure they are undefined. This helps prevent crashes in components using them.
      auth = undefined;
      db = undefined;
      // storage = undefined;
    }
  } else {
     // This case would be hit if initializeApp failed silently or threw and was caught.
     console.warn(
        'Firebase app object is not available. Firebase services (auth, firestore) will not be initialized.'
     );
  }
} else {
  console.warn(
    'Crucial Firebase environment variables (NEXT_PUBLIC_FIREBASE_API_KEY, NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN, NEXT_PUBLIC_FIREBASE_PROJECT_ID) are not configured. ' +
    'Please check your .env.local file or environment settings. ' +
    'Firebase features will be disabled.'
  );
}

export { app, auth, db /*, storage */ };
