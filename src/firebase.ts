import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Replace with your actual Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAohPhjfjfUdanGk4ZM5j1Tm_-bCAd-9SI",
    authDomain: "cafemaemi-landingpage.firebaseapp.com",
    projectId: "cafemaemi-landingpage",
    storageBucket: "cafemaemi-landingpage.firebasestorage.app",
    messagingSenderId: "890509421116",
    appId: "1:890509421116:web:a8949dc7419e32fdf0b139"
};



const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
