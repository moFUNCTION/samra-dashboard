// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  GoogleAuthProvider,
  getAuth,
  FacebookAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwf5l4fr6HNHFVc4PVpe5ypXAWknf9Zyc",
  authDomain: "samra-website.firebaseapp.com",
  projectId: "samra-website",
  storageBucket: "samra-website.appspot.com",
  messagingSenderId: "955897899399",
  appId: "1:955897899399:web:9fb5a2d0a31ce97e458b22",
  measurementId: "G-N2YKZ1EY4C",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleAuth = new GoogleAuthProvider();
export const facebookAuth = new FacebookAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
