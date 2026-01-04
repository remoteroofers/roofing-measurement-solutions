import { db, auth } from "./firebase-config.js";
import { addDoc, collection } from 
"https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

orderForm.addEventListener("submit", async e => {
  e.preventDefault();

  await addDoc(collection(db, "orders"), {
    userId: auth.currentUser.uid,
    package: package.value,
    status: "Pending",
    createdAt: new Date()
  });

  alert("Order submitted! Admin will confirm.");
});
