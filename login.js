import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

async function loginUser() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    // 1️⃣ Sign in user
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    // 2️⃣ CHECK EMAIL VERIFICATION (PUT IT HERE 👇)
    if (!user.emailVerified) {
      alert("Please verify your email before logging in.");

      // OPTIONAL: force logout
      await auth.signOut();

      return;
    }

    // 3️⃣ If verified → continue
    alert("Login successful!");
    window.location.href = "dashboard.html";

  } catch (error) {
    alert(error.message);
  }
}

// Make function available to HTML
window.loginUser = loginUser;
