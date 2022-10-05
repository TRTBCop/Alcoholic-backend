import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from '../../firebase.json';
import {getStorage} from 'firebase/storage'
import admin, { ServiceAccount } from 'firebase-admin';
import serviceAccount from '../../firebaseAdmin.json';



admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount)
});

// Initialize Firebase
const FBapp = initializeApp(firebaseConfig);


export { admin };
export const db = getFirestore(FBapp);
export const authService = getAuth(FBapp);
export const storage = getStorage(FBapp);
