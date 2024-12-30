const sellHistory = JSON.parse(localStorage.getItem('orderHistory')) || [
    {
        orderId: 1,
        date: '2023-10-01',
        customer: 'John Doe',
        items: [
            { id: 1, name: 'ARC Audio Speaker X2', quantity: 2, price: 2370500, photo: '../assets/images/ARC_Audio_X2_6_2.jpg' },
            { id: 3, name: 'JC Series Camera 200', quantity: 1, price: 220000, photo: '../assets/images/jc_200.png' }
        ],
        total: 4961000
    },
    {
        orderId: 2,
        date: '2023-10-05',
        customer: 'John Doe',
        items: [
            { id: 2, name: 'GPS Tracking Device J100', quantity: 1, price: 259000, photo: '../assets/images/j100-gps-tracking-device.png' },
            { id: 4, name: 'Nakamichi NT39 Audio System', quantity: 1, price: 1050000, photo: '../assets/images/nakamichi_nt39.jpeg' }
        ],
        total: 1309000
    }
];

function loadSellHistory() {
    const sellHistoryContainer = document.getElementById('sell-history');
    if (sellHistoryContainer) {
        sellHistoryContainer.innerHTML = '';
        sellHistory.forEach(order => {
            const orderElement = document.createElement('div');
            orderElement.classList.add('sell-history-card');
            orderElement.innerHTML = `
                <h3>Order ID: ${order.orderId}</h3>
                <p>Date: ${order.date}</p>
                <p>Customer: ${order.customer}</p>
                <div class="sell-history-items">
                    ${order.items.map(item => `
                        <div class="sell-history-item">
                            <img src="${item.photo}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover;">
                            <div>
                                <p>${item.name}</p>
                                <p>Qty: ${item.quantity}</p>
                                <p>Price: Rp ${item.price.toLocaleString('id-ID')}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <p class="sell-history-total">Total: Rp ${order.total.toLocaleString('id-ID')}</p>
            `;
            sellHistoryContainer.appendChild(orderElement);
        });
    }
}

document.addEventListener('DOMContentLoaded', loadSellHistory);