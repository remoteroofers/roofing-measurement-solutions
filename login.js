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

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('message');

    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;

        if(!user.emailVerified){
            message.textContent = "Please verify your email before login.";
            await auth.signOut();
            return;
        }

        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    } catch (err) {
        message.textContent = err.message;
    }
});
