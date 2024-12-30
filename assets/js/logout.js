document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logout-button');

    if (logoutButton) {
        logoutButton.addEventListener('click', (event) => {
            event.preventDefault();
            alert('Anda telah logout.');
            window.location.href = '../login.html'; 
        });
    }
});