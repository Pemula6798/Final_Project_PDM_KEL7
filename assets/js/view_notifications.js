document.addEventListener('DOMContentLoaded', () => {
    displayNotifications();
});

function displayNotifications() {
    const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    const notificationsContainer = document.getElementById('notifications');
    notificationsContainer.innerHTML = '';

    notifications.forEach(notification => {
        const notificationElement = document.createElement('div');
        notificationElement.classList.add('notification-item');
        notificationElement.innerHTML = `
            <h3>${notification.title}</h3>
            <p>${notification.message}</p>
            <p>Penerima: ${notification.recipients.join(', ')}</p>
        `;
        notificationsContainer.appendChild(notificationElement);
    });
}