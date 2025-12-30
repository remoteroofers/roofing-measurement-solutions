import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

async function loginUser() {
  const email = loginEmail.value;
  const password = loginPassword.value;
  const note = document.getElementById("note");

  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const user = cred.user;

    if (!user.emailVerified) {
      note.textContent = "Please verify your email before logging in.";
      await signOut(auth);
      return;
    }

    window.location.href = "dashboard.html";

  } catch (err) {
    note.textContent = err.message;
  }
}

window.loginUser = loginUser;
