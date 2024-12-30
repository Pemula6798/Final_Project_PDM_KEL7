document.addEventListener('DOMContentLoaded', () => {
    const paymentItemsContainer = document.getElementById('payment-items');
    const totalPriceContainer = document.getElementById('total-price');
    const checkoutItems = JSON.parse(localStorage.getItem('checkoutItems')) || [];

    function formatRupiah(amount) {
        return 'Rp ' + parseInt(amount).toLocaleString('id-ID');
    }

    function displayPaymentItems(items) {
        paymentItemsContainer.innerHTML = '';
        let total = 0;
        items.forEach(item => {
            const paymentItem = document.createElement('div');
            paymentItem.classList.add('payment-item');
            paymentItem.innerHTML = `
                <img src="${item.photo}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover;">
                <span>${item.name}</span>
                <span>Rp ${item.price.toLocaleString()}</span>
                <span>Qty: ${item.quantity}</span>
            `;
            paymentItemsContainer.appendChild(paymentItem);
            total += item.price * item.quantity;
        });
        totalPriceContainer.innerText = `Total: ${formatRupiah(total)}`;
    }

    function confirmPayment() {
        alert('Pembayaran berhasil!');
        localStorage.removeItem('checkoutItems');
        window.location.href = 'customer_dashboard.html';
    }

    displayPaymentItems(checkoutItems);
    window.confirmPayment = confirmPayment;
});

function displayTotalTransaction() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalPrice = cart.reduce((total, product) => total + parseInt(product.price), 0);
    document.getElementById('total-transaction').textContent = `Total: Rp ${totalPrice}`;
}

function submitPayment() {
    const paymentProofInput = document.getElementById('payment-proof');
    const reader = new FileReader();

    reader.onload = function(event) {
        const paymentProof = event.target.result;
        localStorage.setItem('paymentProof', paymentProof);
        alert('Pembayaran berhasil! Bukti pembayaran telah diunggah.');
        localStorage.removeItem('cart'); 
        window.location.href = 'customer_dashboard.html';
    };

    if (paymentProofInput.files.length > 0) {
        reader.readAsDataURL(paymentProofInput.files[0]);
    } else {
        alert('Silakan unggah bukti pembayaran.');
    }
}