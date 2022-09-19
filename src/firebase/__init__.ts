import { FirebaseApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from '../../firebase.json';

// Initialize Firebase
const FBapp = initializeApp(firebaseConfig);
const db = getFirestore(FBapp);

export default db; 