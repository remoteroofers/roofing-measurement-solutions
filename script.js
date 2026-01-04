const SCRIPT_URL = 'YOUR_APPS_SCRIPT_WEB_URL_HERE'; // Paste your Apps Script URL

// Signup
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
            type: 'signup',
            name: document.getElementById('name').value,
            address: document.getElementById('address').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };
        await fetch(SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify(data)
        });
        alert('Signed up! Now log in.');
        window.location.href = 'login.html';
    });
}

// Login (insecure demo: fetches all users and checks client-side)
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        const response = await fetch(`${SCRIPT_URL}?action=getUsers`);
        const users = await response.json();
        const user = users.find(row => row[4] === email && row[5] === password); // Indices: 4=email, 5=password
        
        if (user) {
            localStorage.setItem('userEmail', email);
            alert('Logged in!');
            window.location.href = 'order.html';
        } else {
            alert('Invalid credentials.');
        }
    });
}

// Order (check if logged in)
if (document.getElementById('orderForm')) {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
        alert('Please log in first.');
        window.location.href = 'login.html';
    }
    
    document.getElementById('orderForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
            type: 'order',
            email: userEmail,
            package: document.getElementById('package').value,
            additionalInfo: document.getElementById('additionalInfo').value
        };
        await fetch(SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify(data)
        });
        alert('Order placed! Check your email or contact admin.');
    });
}

// Admin
async function loginAdmin() {
    const pass = document.getElementById('adminPassword').value;
    if (pass !== 'admin123') { // Hardcoded; change this
        alert('Invalid password.');
        return;
    }
    
    document.getElementById('adminContent').style.display = 'block';
    
    // Fetch users
    const usersResp = await fetch(`${SCRIPT_URL}?action=getUsers`);
    const users = await usersResp.json();
    const usersTable = document.getElementById('usersTable');
    usersTable.innerHTML = '<tr><th>Timestamp</th><th>Name</th><th>Address</th><th>Phone</th><th>Email</th></tr>'; // Skip password
    users.slice(1).forEach(row => {
        usersTable.innerHTML += `<tr><td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td><td>${row[3]}</td><td>${row[4]}</td></tr>`;
    });
    
    // Fetch orders
    const ordersResp = await fetch(`${SCRIPT_URL}?action=getOrders`);
    const orders = await ordersResp.json();
    const ordersTable = document.getElementById('ordersTable');
    ordersTable.innerHTML = '<tr><th>Timestamp</th><th>Email</th><th>Package</th><th>Additional Info</th></tr>';
    orders.slice(1).forEach(row => {
        ordersTable.innerHTML += `<tr><td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td><td>${row[3]}</td></tr>`;
    });
}
