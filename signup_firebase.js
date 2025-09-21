// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXQ_4m20pfx0ASdbQ1llCFkC51AF0ZB6A",
  authDomain: "spark-d.firebaseapp.com",
  projectId: "spark-d",
  storageBucket: "spark-d.firebasestorage.app",
  messagingSenderId: "577293031414",
  appId: "1:577293031414:web:053c2bf775489b1c84d9d7",
  measurementId: "G-QCEYJP63ZS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);