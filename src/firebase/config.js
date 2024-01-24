// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDm3XYxif3cEAn5wPjtTcW2ofrdDumxnLw",
  authDomain: "eshopfire.firebaseapp.com",
  projectId: "eshopfire",
  storageBucket: "eshopfire.appspot.com",
  messagingSenderId: "844681184488",
  appId: "1:844681184488:web:da77e3f1e6a65c589b355d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
