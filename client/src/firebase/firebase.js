import firebase from 'firebase/app';
import 'firebase/auth';

var config = {
    apiKey: "AIzaSyDM3n780fZAlxO8vXqOFiEJ_jNgjaRdcqY",
    authDomain: "mycrypto-6dbc2.firebaseapp.com",
    databaseURL: "https://mycrypto-6dbc2.firebaseio.com",
    projectId: "mycrypto-6dbc2",
    storageBucket: "mycrypto-6dbc2.appspot.com",
    messagingSenderId: "467688812777"
}

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
    auth,
};