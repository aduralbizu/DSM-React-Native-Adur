// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpi73sV249fuPyjduQQIINxooEQeAMMD0",
  authDomain: "dsm-gaztaroa.firebaseapp.com",
  databaseURL: "https://dsm-gaztaroa-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "dsm-gaztaroa",
  storageBucket: "dsm-gaztaroa.appspot.com",
  messagingSenderId: "614359807258",
  appId: "1:614359807258:web:c5a1f7fb591536c37868a3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);