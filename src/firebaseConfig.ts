// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Ваші параметри конфігурації Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBx7W9b5g830RZGZ1uvoL1VQ47zVoTqkjA",
  authDomain: "test-tasck-a4e8d.firebaseapp.com",
  projectId: "test-tasck-a4e8d",
  storageBucket: "test-tasck-a4e8d.appspot.com",
  messagingSenderId: "121766209827",
  appId: "1:121766209827:web:e482877739208fa941c496",
  measurementId: "G-G2QWX2E5WH"
};

// Ініціалізація Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Отримання екземпляру Firestore

// Експорт
export { db };
