// firebase-config.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js';
import { getFirestore, collection, doc, getDoc, setDoc, addDoc, query, where, getDocs, onSnapshot } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyCrNMzKkmWCl0yfP_mLO9nhn1p1n7DMbfk",
    authDomain: "elementgames-v4.firebaseapp.com",
    projectId: "elementgames-v4",
    storageBucket: "elementgames-v4.appspot.com",
    messagingSenderId: "604113750396",
    appId: "1:604113750396:web:8343b59f3b2a7e893efcf9",
    measurementId: "G-CV6TY6NJBR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
