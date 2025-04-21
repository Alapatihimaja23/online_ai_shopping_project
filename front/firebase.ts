// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPu_bcDrDxMlAmlXxtPMFOv8nQ_3U92CE",
  authDomain: "manashop-online.firebaseapp.com",
  projectId: "manashop-online",
  storageBucket: "manashop-online.firebasestorage.app",
  messagingSenderId: "176495777351",
  appId: "1:176495777351:web:ef411a6c0d7b3eb3934362",
  measurementId: "G-SSDM1KEV9E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();