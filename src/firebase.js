import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import { getFirestore } from 'firebase/firestore'

const app = firebase.initializeApp({
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
});

export const auth = app.auth(); 
export const gprovider = new firebase.auth.GoogleAuthProvider();
export const db = getFirestore(app)
export default app;
