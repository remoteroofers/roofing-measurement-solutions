import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// 🔥 Firebase config (PASTE YOURS HERE)
const firebaseConfig = {
  apiKey: "AIzaSyDmBLEUz5EWtv1si_UgfKgOiRS8P-wWOnc",
  authDomain: "remoteroofers-51826.firebaseapp.com",
  
  projectId: "remoteroofers-51826",
  storageBucket: "remoteroofers-51826.firebasestorage.app",
  messagingSenderId: "901240361996",
  appId: "1:901240361996:web:2a209986f74f15618aca29"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Form submit
document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    // 1️⃣ Create user (Auth)
    const userCredential = await createUserWithEmailAndPassword(
      auth, email, password
    );

    // 2️⃣ Store user info (Firestore)
    await setDoc(doc(db, "users", userCredential.user.uid), {
      firstName,
      lastName,
      email,
      createdAt: new Date()
    });

    alert("Signup successful!");
    document.getElementById("signupForm").reset();

  } catch (error) {
    alert(error.message);
  }
});
