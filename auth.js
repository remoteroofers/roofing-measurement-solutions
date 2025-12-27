import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDmBLEUz5EWtv1si_UgfKgOiRS8P-wWOnc",
  authDomain: "remoteroofers-51826.firebaseapp.com",
  projectId: "remoteroofers-51826"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// SIGN UP
const signupBtn = document.getElementById("signupBtn");
if (signupBtn) {
  signupBtn.onclick = () => {
    createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    )
    .then(() => window.location.href = "order.html")
    .catch(e => alert(e.message));
  };
}

// LOGIN
const loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
  loginBtn.onclick = () => {
    signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    )
    .then(() => window.location.href = "order.html")
    .catch(e => alert(e.message));
  };
}
