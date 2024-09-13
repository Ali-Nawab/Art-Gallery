import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import this for storage

const firebaseConfig = {
  apiKey: "AIzaSyC7pBceibk4JXnKXCilcSTsXCHjS8pjevA",
  authDomain: "artgalleryproject-d95dd.firebaseapp.com",
  projectId: "artgalleryproject-d95dd",
  storageBucket: "artgalleryproject-d95dd.appspot.com",
  messagingSenderId: "144184748714",
  appId: "1:144184748714:web:91e0e388c64a003a3e3ed3",
  measurementId: "G-JHJWF58ZP2"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app); // Add this for storage
