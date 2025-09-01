import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDl4urRW0ZBcx15XgpuQiP-r7k4nFyFIPI",
  authDomain: "afriweld-0.firebaseapp.com",
  projectId: "afriweld-0",
  storageBucket: "afriweld-0.appspot.com",
  messagingSenderId: "738100517012",
  appId: "1:738100517012:web:e58950affc0bbdb0c67c81",
  measurementId: "G-DTGN5BYH4R",
};

firebase.initializeApp(firebaseConfig);

export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const timestamp = firebase.firestore.FieldValue.serverTimestamp();
export const storage = firebase.storage();
export const db = firebase.firestore();
export const auth = getAuth();
export default firebase;
