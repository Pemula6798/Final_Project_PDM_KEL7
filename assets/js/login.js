const ownerAccount = {
    email: 'admin123@gmail.com',
    password: 'admin123'
};

document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email');
    const savedEmail = localStorage.getItem('email');

    if (savedEmail) {
        emailInput.value = savedEmail;
    }

    emailInput.addEventListener('input', () => {
        localStorage.setItem('email', emailInput.value);
    });
});

function loginUser() {
    const email = document.getElementById('email').value;
    const passwordInput = document.getElementById('password');
    const password = passwordInput.value;
    const errorMessage = document.getElementById('error-message');

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    if (email === ownerAccount.email && password === ownerAccount.password) {
        window.location.href = 'owner/owner_dashboard.html';
        return;
    }

    const user = existingUsers.find(user => user.email === email && user.password === password);

    if (user) {
        window.location.href = 'customer/customer_dashboard.html';
    } else {
        passwordInput.value = ''; 
        errorMessage.textContent = 'Email atau kata sandi salah.'; 
        errorMessage.style.display = 'block';
    }
}