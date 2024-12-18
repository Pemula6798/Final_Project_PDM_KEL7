document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'ARC Audio Speaker X2', description: 'High-quality audio speaker.', price: 1000000, photo: 'assets/images/ARC_Audio_X2_6_2.jpg' },
        { id: 2, name: 'GPS Tracking Device J100', description: 'Reliable GPS tracking device.', price: 2000000, photo: 'assets/images/j100-gps-tracking-device.png' },
        { id: 3, name: 'JC Series Camera 200', description: 'Advanced camera for security.', price: 1500000, photo: 'assets/images/jc_200.png' },
        { id: 4, name: 'Nakamichi NT39 Audio System', description: 'Premium Nakamichi audio system.', price: 1800000, photo: 'assets/images/nakamichi_nt39.jpeg' },
        { id: 5, name: 'JC Series Camera 120', description: 'Compact and efficient security camera.', price: 1200000, photo: 'assets/images/jc_120.jpg' },
        { id: 6, name: 'Nakamichi NS QT65', description: 'High-fidelity Nakamichi speaker.', price: 1650000, photo: 'assets/images/nakamichi_ns_qt65.png' },
        { id: 7, name: 'Speaker IWS 65-3', description: 'In-wall speaker for immersive sound.', price: 1300000, photo: 'assets/images/speaker_iws_65_3.jpeg' },
        { id: 8, name: 'Venom EX-H Amplifier', description: 'Powerful and efficient amplifier.', price: 1850000, photo: 'assets/images/venom_ex_h.jpeg' },
        { id: 9, name: 'Venom EX-HC Amplifier', description: 'Compact high-performance amplifier.', price: 1950000, photo: 'assets/images/venom_ex_hc.jpg' },
        { id: 10, name: 'ZS 6.3 RC Speaker', description: 'Premium ZS series speaker.', price: 2200000, photo: 'assets/images/zs_6_3_rc.jpg' }
    ];

    
    const featuredProductsContainer = document.getElementById('featured-products');
    const productListContainer = document.getElementById('product-list');
    

    function loadProducts(container, products) {
        if (container) {
            container.innerHTML = '';
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
                productCard.innerHTML = `
                    <img src="${product.photo}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>Harga: Rp ${product.price.toLocaleString()}</p>
                    <button onclick="addToCart(${product.id})">Tambah ke Keranjang</button>
                    <button onclick="addToWishlist(${product.id})">Tambah ke Wishlist</button>
                    <button onclick="viewProductDetail(${product.id})">Lihat Detail</button>
                `;
                container.appendChild(productCard);
            });
        }
    }

    loadProducts(featuredProductsContainer, products);
    loadProducts(productListContainer, products);
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    function calculateTotal() {
        const totalContainer = document.getElementById('total-price');
        let total = 0;
    
        // Hitung total harga berdasarkan isi keranjang
        cart.forEach(item => {
            total += item.price * item.quantity;
        });
    
        // Tampilkan total harga
        if (totalContainer) {
            totalContainer.innerText = `Total: Rp ${total.toLocaleString()}`;
        }
    }
    
    
    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        const cartItem = cart.find(item => item.id === productId);
        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        console.log(cart);
        saveCart();
        displayCart();
        calculateTotal();
        alert(`${product.name} berhasil ditambahkan ke keranjang!`);
    }

    function displayCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        if (cartItemsContainer) {
            // Ambil data keranjang dari localStorage
            cart = JSON.parse(localStorage.getItem('cart')) || [];
    
            cartItemsContainer.innerHTML = ''; // Kosongkan kontainer keranjang
    
            // Jika keranjang kosong
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p>Keranjang belanja Anda kosong.</p>';
                calculateTotal();
                return;
            }
    
            // Tampilkan produk di keranjang
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <img src="${item.photo}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover;">
                    <span>${item.name}</span>
                    <span>Rp ${item.price.toLocaleString()}</span>
                    <span>Qty: ${item.quantity}</span>
                    <button onclick="removeFromCart(${item.id})">Hapus</button>
                `;
                cartItemsContainer.appendChild(cartItem);
            });
            calculateTotal();
        }
    }
    

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        saveCart();
        displayCart();
        calculateTotal();
    }

    function checkout() {
        if (cart.length === 0) {
            alert('Keranjang belanja kosong.');
            return;
        }
        console.log('Memproses pembayaran untuk:', cart);
        alert('Checkout berhasil!');
        cart = [];
        saveCart();
        displayCart();
        calculateTotal();
    }
    

    // Detail Produk
    function viewProductDetail(productId) {
        const product = products.find(p => p.id === productId);
        localStorage.setItem('productDetail', JSON.stringify(product));
        window.location.href = 'detail.html';
    }

    function loadProductDetail() {
        const product = JSON.parse(localStorage.getItem('productDetail'));
        if (product) {
            document.getElementById('product-name').innerText = product.name;
            document.getElementById('product-image').src = product.photo;
            document.getElementById('product-description').innerText = product.description;
            document.getElementById('product-price').innerText = `Harga: Rp ${product.price.toLocaleString()}`;
            displayReviews();
        }
    }

    // Ulasan dan Rating
    let reviews = JSON.parse(localStorage.getItem('reviews')) || [];

    function saveReviews() {
        localStorage.setItem('reviews', JSON.stringify(reviews));
    }

    function addReview() {
        const reviewText = document.getElementById("review-text").value;
        const rating = prompt("Berapa rating yang Anda berikan? (1-5)");
    
        if (reviewText.trim() !== '' && rating >= 1 && rating <= 5) {
            // Menambahkan ulasan baru ke array reviews
            product.reviews.push({ text: reviewText, rating: rating });
            displayReviews(); // Perbarui tampilan ulasan
            document.getElementById("review-text").value = ''; // Reset textarea
        } else {
            alert("Harap masukkan ulasan yang valid dan rating antara 1-5!");
        }
    }

    function displayReviews() {
        const reviewList = document.getElementById("review-list");
        reviewList.innerHTML = ''; // Reset ulasan lama
    
        if (product.reviews.length === 0) {
            reviewList.innerHTML = "<p>Tidak ada ulasan untuk produk ini.</p>";
        }
    
        product.reviews.forEach((review, index) => {
            const reviewElement = document.createElement("div");
            reviewElement.classList.add("review");
            reviewElement.innerHTML = `
                <p><strong>Rating: ${review.rating} Bintang</strong></p>
                <p>${review.text}</p>
                <button onclick="deleteReview(${index})">Hapus</button>
            `;
            reviewList.appendChild(reviewElement);
        });
    }

    function deleteReview(index) {
        product.reviews.splice(index, 1); 
        displayReviews(); 
    }

    // Wishlist functionality
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    function saveWishlist() {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }

    function addToWishlist(productId) {
        const product = products.find(p => p.id === productId);
        if (!wishlist.find(item => item.id === productId)) {
            wishlist.push(product);
            saveWishlist();
            alert('Produk telah ditambahkan ke wishlist!');
        }
    }

    function displayWishlist() {
        const wishlistContainer = document.getElementById('wishlist');
        if (wishlistContainer) {
            wishlistContainer.innerHTML = '';
            wishlist.forEach(item => {
                const wishlistItem = document.createElement('div');
                wishlistItem.classList.add('wishlist-item');
                wishlistItem.innerHTML = `
                    <img src="${item.photo}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>Rp ${item.price.toLocaleString()}</p>
                    <button onclick="removeFromWishlist(${item.id})">Hapus</button>
                `;
                wishlistContainer.appendChild(wishlistItem);
            });
        }
    }

    function removeFromWishlist(productId) {
        wishlist = wishlist.filter(item => item.id !== productId);
        saveWishlist();
        displayWishlist();
    }

    window.addToCart = addToCart;
    window.addToWishlist = addToWishlist;
    window.displayWishlist = displayWishlist;
    window.removeFromWishlist = removeFromWishlist;

    // Add wishlist feature to product detail page
    if (document.body.classList.contains('product-detail-page')) {
        const product = JSON.parse(localStorage.getItem('productDetail'));
        if (product) {
            document.getElementById('product-name').innerText = product.name;
            document.getElementById('product-image').src = product.photo;
            document.getElementById('product-description').innerText = product.description;
            document.getElementById('product-price').innerText = `Harga: Rp ${product.price.toLocaleString()}`;

            const addToWishlistButton = document.createElement('button');
            addToWishlistButton.textContent = 'Tambah ke Wishlist';
            addToWishlistButton.onclick = () => addToWishlist(product.id);
            document.querySelector('.product-detail').appendChild(addToWishlistButton);
        }
    }

    // Ensure wishlist is displayed correctly
    if (document.body.classList.contains('wishlist-page')) {
        displayWishlist();
    }

    // Daftar Notifikasi
    let notifications = JSON.parse(localStorage.getItem('notifications')) || [];

    function saveNotifications() {
        localStorage.setItem('notifications', JSON.stringify(notifications));
    }

    function addNotification(text) {
        notifications.push({ text: text, date: new Date() });
        saveNotifications();
        displayNotifications();
    }

    function displayNotifications() {
        const notificationList = document.getElementById('notification-list');
        if (notificationList) {
            notificationList.innerHTML = '';
            notifications.forEach(notification => {
                const notificationItem = document.createElement('div');
                notificationItem.classList.add('notification-item');
                notificationItem.innerHTML = `<p>${notification.text}</p><span>${notification.date.toLocaleString()}</span>`;
                notificationList.appendChild(notificationItem);
            });
        }
    }

    // Fungsi untuk memproses status pesanan
    function checkOrderStatus() {
        const orderNumber = document.querySelector('.status-check input').value;
        const orderStatus = orders.find(order => order.number === orderNumber);
        if (orderStatus) {
            document.getElementById('order-status').innerText = `Status pesanan Anda adalah: ${orderStatus.status}`;
        } else {
            document.getElementById('order-status').innerText = 'Nomor pesanan tidak ditemukan';
        }
    }

    window.addToCart = addToCart;
    window.removeFromCart = removeFromCart;
    window.checkout = checkout;
    window.viewProductDetail = viewProductDetail;
    window.loadProductDetail = loadProductDetail;
    window.addReview = addReview;
    window.displayReviews = displayReviews;
    window.addToWishlist = addToWishlist;
    window.displayWishlist = displayWishlist;
    window.removeFromWishlist = removeFromWishlist;
    window.addNotification = addNotification;
    window.displayNotifications = displayNotifications;
    window.checkOrderStatus = checkOrderStatus;

    // Load product detail on detail page
        // Load product detail on detail page
        if (document.body.classList.contains('product-detail-page')) {
            loadProductDetail();
            const product = JSON.parse(localStorage.getItem('productDetail'));
            if (product) {
                displayReviews(product.id);
            }
        }
    
        // Display cart items on cart page
        if (document.body.classList.contains('cart-page')) {
            displayCart();
        }
    
        // Display wishlist items on wishlist page
        if (document.body.classList.contains('wishlist-page')) {
            displayWishlist();
        }
    
        // Display notifications on notifications page
        if (document.body.classList.contains('notifications-page')) {
            displayNotifications();
        }
    
        // Process order status on status page
        if (document.body.classList.contains('status-page')) {
            document.querySelector('.status-check form').addEventListener('submit', function (e) {
                e.preventDefault();
                checkOrderStatus();
            });
        }

        const searchBar = document.getElementById('searchBar');
        function searchProducts() {
        const query = searchBar.value.toLowerCase();

        // Filter products based on query
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(query)
        );

        // Display filtered products
        const productListContainer = document.getElementById('featured-products');
        loadProducts(productListContainer, filteredProducts);
        }
        searchBar.addEventListener('input', searchProducts);
    });
    
