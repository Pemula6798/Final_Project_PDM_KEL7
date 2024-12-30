document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('edit-account-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const addressInput = document.getElementById('address');
    const passwordInput = document.getElementById('password');

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (!loggedInUser) {
        alert('Data pengguna tidak ditemukan. Silakan login kembali.');
        window.location.href = '../login.html'; 
        return;
    }

    nameInput.value = loggedInUser.name || '';
    emailInput.value = loggedInUser.email || '';
    phoneInput.value = loggedInUser.phone || '';
    addressInput.value = loggedInUser.address || '';

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const oldEmail = loggedInUser.email;
        const oldPassword = loggedInUser.password;

        loggedInUser.name = nameInput.value;
        loggedInUser.email = emailInput.value;
        loggedInUser.phone = phoneInput.value;
        loggedInUser.address = addressInput.value;
        if (passwordInput.value) {
            loggedInUser.password = passwordInput.value;
        } else {
            loggedInUser.password = oldPassword; 
        }
        
        const userIndex = users.findIndex(user => user.email === oldEmail);
        if (userIndex !== -1) {
            users[userIndex] = loggedInUser;
        }
        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
        localStorage.setItem('users', JSON.stringify(users));

        if (emailInput.value !== oldEmail || passwordInput.value) {
            alert('Email atau password berhasil diubah. Silakan login kembali.');
            window.location.href = '../login.html';
        } else {
            alert('Data akun berhasil diperbarui.');
        }
    });
});