document.addEventListener('DOMContentLoaded', () => {
    displayCart();
    displayWishlist();
});

function addToCart(productId) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(product => product.id == productId);

    if (product) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Produk berhasil ditambahkan ke keranjang.');
    }
}

function addToWishlist(productId) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const product = products.find(product => product.id == productId);

    if (product) {
        wishlist.push(product);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        alert('Produk berhasil ditambahkan ke wishlist.');
    }
}

function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';

    cart.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('cart-item');
        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <p>Harga: Rp ${product.price}</p>
            <p>Jumlah: ${product.quantity}</p>
            <img src="${product.photo}" alt="${product.name}">
            <p>${product.details}</p>
        `;
        cartContainer.appendChild(productElement);
    });

    const totalPrice = cart.reduce((total, product) => total + parseInt(product.price), 0);
    document.getElementById('total-price').textContent = `Total: Rp ${totalPrice}`;
}

function displayWishlist() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const wishlistContainer = document.getElementById('wishlist-items');
    wishlistContainer.innerHTML = '';

    wishlist.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('wishlist-item');
        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <p>Harga: Rp ${product.price}</p>
            <p>Jumlah: ${product.quantity}</p>
            <img src="${product.photo}" alt="${product.name}">
            <p>${product.details}</p>
        `;
        wishlistContainer.appendChild(productElement);
    });
}

function checkout() {
    window.location.href = 'payment.html';
}