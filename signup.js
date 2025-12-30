// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDmBLEUz5EWtv1si_UgfKgOiRS8P-wWOnc",
  authDomain: "remoteroofers-51826.firebaseapp.com",
  projectId: "remoteroofers-51826",
  storageBucket: "remoteroofers-51826.firebasestorage.app",
  messagingSenderId: "901240361996",
  appId: "1:901240361996:web:2a209986f74f15618aca29"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const message = document.getElementById('message');

    if(password !== confirmPassword){
        message.textContent = "Passwords do not match!";
        return;
    }

    try {
        // Create user
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Send email verification
        await user.sendEmailVerification();

        // Determine if admin (simple rule: example for specific email)
        let role = "user";
        if(email === "admin@example.com") role = "admin";

        // Store user info in Firestore
        await db.collection('users').doc(user.uid).set({
            firstname,
            lastname,
            email,
            role
        });

        message.textContent = "Signup successful! Please verify your email.";
    } catch (err) {
        message.textContent = err.message;
    }
});
