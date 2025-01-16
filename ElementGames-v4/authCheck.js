import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js';

document.addEventListener("DOMContentLoaded", function () {
const firebaseConfig = {
    apiKey: "AIzaSyCrNMzKkmWCl0yfP_mLO9nhn1p1n7DMbfk",
    authDomain: "elementgames-v4.firebaseapp.com",
    projectId: "elementgames-v4",
    storageBucket: "elementgames-v4.appspot.com",
    messagingSenderId: "604113750396",
    appId: "1:604113750396:web:8343b59f3b2a7e893efcf9",
    measurementId: "G-CV6TY6NJBR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = '/ElementGames-v4/login.html';
    }
});
});
