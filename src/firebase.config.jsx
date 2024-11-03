import { initializeApp } from "firebase/app";
import {
    getFirestore, collection,
    getDocs, addDoc, deleteDoc, doc,
    query, where, orderBy, or,
    serverTimestamp, onSnapshot,
    updateDoc, arrayUnion
} from 'firebase/firestore';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, signOut,
} from 'firebase/auth'
import {
    getStorage, ref,
    uploadBytes, getMetadata,
    listAll, getDownloadURL
} from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyA5dJXLtcBiUojJZzPfOnbauL_G0bMl83A",
    authDomain: "vibrant-4e40d.firebaseapp.com",
    projectId: "vibrant-4e40d",
    storageBucket: "vibrant-4e40d.appspot.com",
    messagingSenderId: "603046136835",
    appId: "1:603046136835:web:1a7567b393258bd245d236"
};

initializeApp(firebaseConfig)
const db = getFirestore();
const auth = getAuth();
const colRefUser = collection(db, 'users');
const colRefComment = collection(db, 'comment');
const colRefPost = collection(db, 'posts');
const colRefBoxChat = collection(db, 'boxchats');
const colRefMess = collection(db, 'messages');
const storage = getStorage();

export {
    db, auth, colRefUser, colRefComment,
    colRefPost, arrayUnion, colRefBoxChat, colRefMess,
    getDocs, addDoc, deleteDoc, doc, updateDoc,
    query, where, orderBy, or,
    createUserWithEmailAndPassword, signOut,
    signInWithEmailAndPassword,
    serverTimestamp, onSnapshot,
    storage, getStorage, ref,
    uploadBytes, getMetadata,
    listAll, getDownloadURL,
}