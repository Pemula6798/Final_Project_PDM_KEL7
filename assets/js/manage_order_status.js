document.addEventListener('DOMContentLoaded', () => {
    displayOrders();
});

function saveOrderStatus() {
    const id = document.getElementById('order-id').value;
    const status = document.getElementById('order-status').value;

    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    const existingOrderIndex = orders.findIndex(order => order.id === id);
    if (existingOrderIndex !== -1) {
        orders[existingOrderIndex].status = status;
    } else {
        const newOrder = {
            id,
            status
        };
        orders.push(newOrder);
    }

    localStorage.setItem('orders', JSON.stringify(orders));
    displayOrders();
    clearForm();
}

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
            <button onclick="editOrderStatus('${order.id}')">Edit</button>
            <button onclick="deleteOrder('${order.id}')">Hapus</button>
        `;
        ordersContainer.appendChild(orderElement);
    });
}

function editOrderStatus(id) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const order = orders.find(order => order.id === id);

    document.getElementById('order-id').value = order.id;
    document.getElementById('order-status').value = order.status;
}

function deleteOrder(id) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders = orders.filter(order => order.id !== id);
    localStorage.setItem('orders', JSON.stringify(orders));
    displayOrders();
}

function clearForm() {
    document.getElementById('order-id').value = '';
    document.getElementById('order-status').value = 'pending';
}