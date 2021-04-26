import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyA2jjUm1dQJb365-hL8qL-iY1R6SPU3czo",
    authDomain: "chat-app-8b6d7.firebaseapp.com",
    projectId: "chat-app-8b6d7",
    storageBucket: "chat-app-8b6d7.appspot.com",
    messagingSenderId: "428868983994",
    appId: "1:428868983994:web:381d9d6e8f59585f397683"
};

const fireb = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const firestore = firebase.firestore()

export default fireb;