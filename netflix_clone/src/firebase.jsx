// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBMWH7GMIe-kxKsr4aB9VULSUy68aWya4Y",
  authDomain: "netflix-clone-c32d5.firebaseapp.com",
  projectId: "netflix-clone-c32d5",
  storageBucket: "netflix-clone-c32d5.appspot.com",
  messagingSenderId: "1075244740822",
  appId: "1:1075244740822:web:cfa13d4c791bd379159977",
  measurementId: "G-YKTZV9E1DB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
