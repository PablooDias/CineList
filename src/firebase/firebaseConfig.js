import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; // <-- IMPORTE O FIRESTORE


const firebaseConfig = {
  apiKey: "AIzaSyBPXNJ4UBhgFJXzs7w4qMm0oaCVH6Zbsh4",
  authDomain: "cinelist-c574e.firebaseapp.com",
  projectId: "cinelist-c574e",
  storageBucket: "cinelist-c574e.firebasestorage.app",
  messagingSenderId: "120976782509",
  appId: "1:120976782509:web:86701e1f0f7af64baec224",
  measurementId: "G-98K1FMTMG7"
};


const app = initializeApp(firebaseConfig);


const db = getFirestore(app); // <-- CRIA A INSTÂNCIA DO BANCO


export { db }; 