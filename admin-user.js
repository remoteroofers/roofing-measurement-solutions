// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDmBLEUz5EWtv1si_UgfKgOiRS8P-wWOnc",
  authDomain: "remoteroofers-51826.firebaseapp.com",
  projectId: "remoteroofers-51826",
  storageBucket: "remoteroofers-51826.firebasestorage.app",
  messagingSenderId: "901240361996",
  appId: "1:901240361996:web:2a209986f74f15618aca29"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

auth.onAuthStateChanged(async (user) => {
    if(user){
        const doc = await db.collection('users').doc(user.uid).get();
        if(doc.exists && doc.data().role === 'admin'){
            const usersSnapshot = await db.collection('users').get();
            const userList = document.getElementById('user-list');
            usersSnapshot.forEach(u => {
                const li = document.createElement('li');
                li.textContent = `${u.data().firstname} ${u.data().lastname} - ${u.data().email} (${u.data().role})`;
                userList.appendChild(li);
            });
        } else {
            window.location.href = 'dashboard.html';
        }
    } else {
        window.location.href = 'login.html';
    }
});

document.getElementById('logout').addEventListener('click', () => {
    auth.signOut().then(() => window.location.href = 'login.html');
});
