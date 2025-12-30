import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDmBLEUz5EWtv1si_UgfKgOiRS8P-wWOnc",
  authDomain: "remoteroofers-51826.firebaseapp.com",
  projectId: "remoteroofers-51826",
  storageBucket: "remoteroofers-51826.firebasestorage.app",
  messagingSenderId: "901240361996",
  appId: "1:901240361996:web:2a209986f74f15618aca29"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);



