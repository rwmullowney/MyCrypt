import firebase from 'firebase/app';
import 'firebase/auth';

var config = {
    apiKey: "AIzaSyA_2QmLndchTNxTCXdqyGwdDeOEiN8IOz8",
    authDomain: "mycrypt-3bbc5.firebaseapp.com",
    databaseURL: "https://mycrypt-3bbc5.firebaseio.com",
    projectId: "mycrypt-3bbc5",
    storageBucket: "mycrypt-3bbc5.appspot.com",
    messagingSenderId: "857408700970"
}

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
    auth,
};