import { db } from "./firebase-config.js";
import { collection, getDocs } from 
"https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const snapshot = await getDocs(collection(db, "orders"));
snapshot.forEach(doc => {
  orders.innerHTML += `
    <div class="card">
      Package: ${doc.data().package}
      <br>Status: ${doc.data().status}
    </div>
  `;
});
