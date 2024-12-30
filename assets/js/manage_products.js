import initialProducts from './ProductPop1.js';

document.addEventListener('DOMContentLoaded', () => {
    displayProducts();

    const searchBar = document.getElementById('searchBar');
    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
        displayProducts(filteredProducts, popularProductsContainer);
    });
});

function saveProduct() {
    const id = document.getElementById('product-id').value;
    const name = document.getElementById('product-name').value;
    const price = document.getElementById('product-price').value;
    const quantity = document.getElementById('product-quantity').value;
    const photoInput = document.getElementById('product-photo');
    const details = document.getElementById('product-details').value;

    // Validasi harga dan jumlah produk
    if (price < 0) {
        alert('Harga produk tidak boleh negatif.');
        return;
    }
    if (quantity < 0) {
        alert('Jumlah produk tidak boleh negatif.');
        return;
    }

    const products = JSON.parse(localStorage.getItem('products')) || [];

    const reader = new FileReader();
    reader.onload = function(event) {
        const photo = event.target.result;

        if (id) {
            const productIndex = products.findIndex(product => product.id == id);
            products[productIndex] = { id, name, price, quantity, photo, details };
        } else {
            const newProduct = {
                id: Date.now().toString(),
                name,
                price,
                quantity,
                photo,
                details
            };
            products.push(newProduct);
        }

        localStorage.setItem('products', JSON.stringify(products));
        displayProducts();
        clearForm();
    };

    if (photoInput.files.length > 0) {
        reader.readAsDataURL(photoInput.files[0]);
    } else {
        if (id) {
            const productIndex = products.findIndex(product => product.id == id);
            const existingProduct = products[productIndex];
            products[productIndex] = { id, name, price, quantity, photo: existingProduct.photo, details };
            localStorage.setItem('products', JSON.stringify(products));
            displayProducts();
            clearForm();
        }
    }
}

function displayProducts(filteredProducts = null) {
    const products = filteredProducts || JSON.parse(localStorage.getItem('products')) || [];
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product-item');
        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <p>Harga: Rp ${product.price}</p>
            <p>Jumlah: ${product.quantity}</p>
            <img src="${product.photo}" alt="${product.name}">
            <p>${product.details}</p>
            <button onclick="editProduct('${product.id}')">Edit</button>
            <button onclick="deleteProduct('${product.id}')">Hapus</button>
        `;
        productsContainer.appendChild(productElement);
    });
}

function editProduct(id) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(product => product.id == id);

    document.getElementById('product-id').value = product.id;
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-price').value = product.price;
    document.getElementById('product-quantity').value = product.quantity;
    document.getElementById('product-photo').value = ''; // Clear the file input
    document.getElementById('product-details').value = product.details;
}

function deleteProduct(id) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products = products.filter(product => product.id != id);
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();
}

function clearForm() {
    document.getElementById('product-id').value = '';
    document.getElementById('product-name').value = '';
    document.getElementById('product-price').value = '';
    document.getElementById('product-quantity').value = '';
    document.getElementById('product-photo').value = '';
    document.getElementById('product-details').value = '';
}