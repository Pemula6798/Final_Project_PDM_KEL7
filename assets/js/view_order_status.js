document.addEventListener('DOMContentLoaded', () => {
    displayOrders();
});

function displayOrders() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const ordersContainer = document.getElementById('orders');
    ordersContainer.innerHTML = '';

    orders.forEach(order => {
        const orderElement = document.createElement('div');
        orderElement.classList.add('order-item');
        orderElement.innerHTML = `
            <h3>ID Pesanan: ${order.id}</h3>
            <p>Status: ${order.status}</p>
        `;
        ordersContainer.appendChild(orderElement);
    });
}