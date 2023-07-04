// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCTlMDbeI3-RSgAZACYBNUIaltAvJ3DxCs",
  authDomain: "whatsapp-vprtsingh.firebaseapp.com",
  projectId: "whatsapp-vprtsingh",
  storageBucket: "whatsapp-vprtsingh.appspot.com",
  messagingSenderId: "331428528253",
  appId: "1:331428528253:web:b7a014cef9412f1bbaf114",
  measurementId: "G-XXNW4KB2LY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();


