import { auth } from './firebase';

// Sign Up
export const doCreateUserWithEmailAndPassword = (
    // username,
    email, password) =>        
    auth.createUserWithEmailAndPassword(
        // username,
        email, password);

// Sign In
export const doSignInWithEmailAndPassword = (email, password) =>
    auth.signInWithEmailAndPassword(email, password);

// Sign out
export const doSignOut = () =>
    auth.signOut();

// Password Reset
export const doPasswordReset = (email) =>
    auth.sendPasswordResetEmail(email);

// Password Change
export const doPasswordUpdate = (password) =>
    auth.currentUser.updatePassword(password);