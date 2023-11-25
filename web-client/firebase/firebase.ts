// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  User,
  getAuth,
  onAuthStateChanged,
  signInWithPopup
} from "firebase/auth";
import { getFunctions } from "firebase/functions";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Auth
const auth = getAuth(app);

export const functions = getFunctions();

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
  return onAuthStateChanged(auth, callback);
};
