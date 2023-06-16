// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getApp , getApps } from "firebase/app";
import { getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "twitter-clone-12e06.firebaseapp.com",
  projectId: "twitter-clone-12e06",
  storageBucket: "twitter-clone-12e06.appspot.com",
  messagingSenderId: "755953158057",
  appId: "1:755953158057:web:5ef50584aba098893ea6b8",
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const storage = getStorage();
const db = getFirestore();
export  {app , storage , db };
