// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARkuZ0wx7X-i5fMDDPF1HdAVaQJr-Oyeo",
  authDomain: "auth-elfestin.firebaseapp.com",
  projectId: "auth-elfestin",
  storageBucket: "auth-elfestin.appspot.com",
  messagingSenderId: "891405584120",
  appId: "1:891405584120:web:8faae4094dd225f8b71d0d",
  measurementId: "G-EVQZNRHN9K",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
