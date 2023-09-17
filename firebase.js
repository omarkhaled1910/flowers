// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC8FQO9yfG__uRzRIom617SK5VA299AT2I',
  authDomain: 'flower-c12d5.firebaseapp.com',
  projectId: 'flower-c12d5',
  storageBucket: 'flower-c12d5.appspot.com',
  messagingSenderId: '398450979010',
  appId: '1:398450979010:web:d77308aeff94af64b2cb5b',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const storage = getStorage();
