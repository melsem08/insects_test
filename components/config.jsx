// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBc9HqIzNbtbPPlMOodyYoXCwLXcXAJYoU",
  authDomain: "nc-insects-test.firebaseapp.com",
  databaseURL:
    "https://nc-insects-test-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "nc-insects-test",
  storageBucket: "nc-insects-test.appspot.com",
  messagingSenderId: "598833549168",
  appId: "1:598833549168:web:8449e3afcd53c07c4149b5",
  measurementId: "G-SBCZVXGKJK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const storage = getStorage(app);
