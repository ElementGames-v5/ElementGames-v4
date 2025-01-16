// firebase-config.js

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCrNMzKkmWCl0yfP_mLO9nhn1p1n7DMbfk",
    authDomain: "elementgames-v4.firebaseapp.com",
    projectId: "elementgames-v4",
    storageBucket: "elementgames-v4.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();
