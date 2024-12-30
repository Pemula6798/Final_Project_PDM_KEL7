document.addEventListener('DOMContentLoaded', () => {
    displayNotifications();
});

function saveNotification() {
    const id = document.getElementById('notification-id').value;
    const title = document.getElementById('notification-title').value;
    const message = document.getElementById('notification-message').value;
    const recipients = document.getElementById('notification-recipients').value.split(',');

    const notifications = JSON.parse(localStorage.getItem('notifications')) || [];

    if (id) {
        const notificationIndex = notifications.findIndex(notification => notification.id == id);
        notifications[notificationIndex] = { id, title, message, recipients };
    } else {
        const newNotification = {
            id: Date.now().toString(),
            title,
            message,
            recipients
        };
        notifications.push(newNotification);
    }

    localStorage.setItem('notifications', JSON.stringify(notifications));
    displayNotifications();
    clearForm();
}

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
            <button onclick="editNotification('${notification.id}')">Edit</button>
            <button onclick="deleteNotification('${notification.id}')">Hapus</button>
        `;
        notificationsContainer.appendChild(notificationElement);
    });
}

function editNotification(id) {
    const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    const notification = notifications.find(notification => notification.id == id);

    document.getElementById('notification-id').value = notification.id;
    document.getElementById('notification-title').value = notification.title;
    document.getElementById('notification-message').value = notification.message;
    document.getElementById('notification-recipients').value = notification.recipients.join(', ');
}

function deleteNotification(id) {
    let notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    notifications = notifications.filter(notification => notification.id != id);
    localStorage.setItem('notifications', JSON.stringify(notifications));
    displayNotifications();
}

function clearForm() {
    document.getElementById('notification-id').value = '';
    document.getElementById('notification-title').value = '';
    document.getElementById('notification-message').value = '';
    document.getElementById('notification-recipients').value = '';
}