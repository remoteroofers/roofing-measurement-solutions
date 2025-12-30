import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

async function signupUser() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    // Send email verification
    await sendEmailVerification(user);

    // Store user info in Firestore
    await setDoc(doc(db, "users", user.uid), {
      firstName,
      lastName,
      email,
      phone,
      role: "user",
      createdAt: serverTimestamp()
    });

    alert("Signup successful! Please verify your email.");

  } catch (error) {
    alert(error.message);
  }
}

window.signupUser = signupUser;
