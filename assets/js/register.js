function registerUser() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');

    // Validasi email
    if (!email.includes('@')) {
        errorMessage.textContent = 'Email harus mengandung @.';
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
        return;
    }

    // Validasi password
    if (password.length < 4 || password.length > 20) {
        errorMessage.textContent = 'Password harus memiliki panjang antara 4 hingga 20 karakter.';
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
        return;
    }

    // Validasi nomor telepon
    if (!/^\d+$/.test(phone)) {
        errorMessage.textContent = 'Nomor telepon harus berupa angka.';
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
        return;
    }

    // Ambil data pengguna yang sudah ada dari localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Cek apakah email atau nomor telepon sudah terdaftar
    const userExists = existingUsers.some(user => user.email === email || user.phone === phone);

    if (userExists) {
        errorMessage.textContent = 'Email atau nomor telepon sudah terdaftar.';
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
        return;
    }

    // Simpan data pengguna baru ke localStorage
    const newUser = {
        email: email,
        password: password,
        phone: phone,
        address: address
    };
    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));
    localStorage.setItem('loggedInUser', JSON.stringify(newUser));
    // Tampilkan pesan sukses
    errorMessage.style.display = 'none';
    successMessage.textContent = 'Registrasi berhasil! Mengarahkan ke halaman login...';
    successMessage.style.display = 'block';

    // Redirect ke halaman login setelah beberapa detik
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000);
}