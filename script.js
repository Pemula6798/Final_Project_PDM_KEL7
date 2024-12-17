// Fungsi untuk menambah produk ke keranjang
let cart = [];

function addToCart(productName) {
    cart.push(productName);
    alert(productName + ' telah ditambahkan ke keranjang!');
    console.log(cart);
}

// Fungsi pencarian produk
function searchProducts() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const productName = card.querySelector('h3').textContent.toLowerCase();
        if (productName.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}
