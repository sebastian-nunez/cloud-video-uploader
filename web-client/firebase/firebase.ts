// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  User,
  getAuth,
  onAuthStateChanged,
  signInWithPopup
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Auth
const auth = getAuth(app);

/**
 * Sign in with Google
 * @returns A promise that resolves with the auth credential
 */
export const signInWithGoogle = () => {
  return signInWithPopup(auth, new GoogleAuthProvider());
};

/**
 * Sign out
 * @returns A promise that resolves when the user is signed out
 */
export const signOut = () => {
  return auth.signOut();
};

/**
 Auth triggered when the auth state changes
 */
export const onAuthStateChangedHelper = (
  callback: (user: User | null) => void
) => {
  onAuthStateChanged(auth, callback);
};
