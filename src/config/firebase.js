// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDp4SzaHOTx_Q7FtrLoiQxLX_wW7BCsTUE",
  authDomain: "lovepet-85813.firebaseapp.com",
  projectId: "lovepet-85813",
  storageBucket: "lovepet-85813.appspot.com",
  messagingSenderId: "26401722685",
  appId: "1:26401722685:web:e5b83ea32c958e4204b554"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);

