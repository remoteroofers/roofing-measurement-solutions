import { auth, db } from './firebase.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";


signupForm.addEventListener('submit', async e => {
e.preventDefault();
const user = await createUserWithEmailAndPassword(auth, email.value, password.value);


await setDoc(doc(db, "users", user.user.uid), {
name: name.value,
address: address.value,
phone: phone.value,
role: "user"
});


location.href = 'dashboard.html';
});
