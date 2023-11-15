// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAT84s3Pt6Tz7ELJ8lGD53eN8ty4H_XL0w",
  authDomain: "template-next14.firebaseapp.com",
  projectId: "template-next14",
  storageBucket: "template-next14.appspot.com",
  messagingSenderId: "970184080849",
  appId: "1:970184080849:web:450ee0efc14c0e30f734f0",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig); //singleton pattern to prevent multiple instances
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

export { app, auth, db, functions };
