import { initializeApp } from "firebase/app";
import {
    getFirestore, collection,
    getDocs, addDoc, deleteDoc, doc,
    query, where, orderBy,
    serverTimestamp, onSnapshot
} from 'firebase/firestore';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, signOut,
} from 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyA5dJXLtcBiUojJZzPfOnbauL_G0bMl83A",
    authDomain: "vibrant-4e40d.firebaseapp.com",
    projectId: "vibrant-4e40d",
    storageBucket: "vibrant-4e40d.appspot.com",
    messagingSenderId: "603046136835",
    appId: "1:603046136835:web:1a7567b393258bd245d236"
};

initializeApp(firebaseConfig)
const db = getFirestore()
const colRefUser = collection(db, 'users')
const auth = getAuth();
const colRefComment = collection(db, 'comment')

export {
    db, auth, colRefUser, colRefComment,
    getDocs, addDoc, deleteDoc, doc,
    query, where, orderBy,
    createUserWithEmailAndPassword, signOut,
    signInWithEmailAndPassword,
    serverTimestamp, onSnapshot
}