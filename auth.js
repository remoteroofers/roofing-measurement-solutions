import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDmBLEUz5EWtv1si_UgfKgOiRS8P-wWOnc",
  authDomain: "remoteroofers-51826.firebaseapp.com",
  projectId: "remoteroofers-51826",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.signup = function () {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(() => location.href = "order.html")
    .catch(err => alert(err.message));
};

window.login = function () {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => location.href = "order.html")
    .catch(err => alert(err.message));
};
