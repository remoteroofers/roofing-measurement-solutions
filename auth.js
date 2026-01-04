import { auth, db } from "./firebase-config.js";
import { createUserWithEmailAndPassword } from 
"https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { doc, setDoc } from 
"https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

document.getElementById("signupForm")?.addEventListener("submit", async e => {
  e.preventDefault();

  const user = await createUserWithEmailAndPassword(
    auth,
    email.value,
    password.value
  );

  await setDoc(doc(db, "users", user.user.uid), {
    name: name.value,
    address: address.value,
    phone: phone.value,
    role: "client"
  });

  window.location.href = "dashboard.html";
});
