document.addEventListener('DOMContentLoaded', () => {
    const initialProducts = [
        {
            id: 1,
            name: 'ARC Audio Speaker X2',
            description: 'High-quality audio speaker.',
            price: '2370500',
            photo: '../assets/images/ARC_Audio_X2_6_2.jpg',
            quantity: 5,
            details: 'Component Speakers\n6.5" Component Speaker\n2 way crossover NB 12dB/oct'
        },
        {
            id: 2,
            name: 'GPS Tracking Device J100',
            description: 'Reliable GPS tracking device.',
            price: '259000',
            photo: '../assets/images/j100-gps-tracking-device.png',
            quantity: 5,
            details: 'Type: GPS Tracker\nUse: Automotive\nPlace of Origin: Guangdong, China\nBrand Name: Jimi/Concox\nModel Number: J100\nWarranty: 1 Year\nNetwork: 3G & 2G GSM/GPRS/WCDMA 850/900/1800/1900/2100MHz\nInput/Output Interface: Engine Cut-off, SOS, RS232, ACC detection\nTracking system: Free Web Server Platform and APP: Tracksolid'
        },
        {
            id: 3,
            name: 'JC Series Camera 200',
            description: 'Advanced camera for security.',
            price: '220000',
            photo: '../assets/images/jc_200.png',
            quantity: 5,
            details: 'Type: GPS Tracker\nUse: Automotive\nPlace of Origin: Guangdong, China\nBrand Name: Jimi/Concox\nModel Number: JC200\nWarranty: 1 Year\nNetwork: 3G & 2G GSM/GPRS/WCDMA 850/900/1800/1900/2100MHz\nInput/Output Interface: Engine Cut-off, SOS, RS232, ACC detection\nTracking system: Free Web Server Platform and APP: Tracksolid'
        },
        {
            id: 4,
            name: 'Nakamichi NT39 Audio System',
            description: 'Premium Nakamichi audio system.',
            price: '1050000',
            photo: '../assets/images/nakamichi_nt39.jpeg',
            quantity: 5,
            details: 'N-Power: 15W\nImpedance: 6Ω\nSensitivity (dB/W/m): 86dB±3dB\nFrequency Response: 1.2kHz - 20kHz\nVoice Coil: Φ30mm ASV\nCone Material: Silk\nMagnet Type: Neodymium\nDimensions: 61.6x71.5x82.1mm\nNet Weight: 0.22kg'
        },
        {
            id: 5,
            name: 'JC Series Camera 120',
            description: 'Compact and efficient security camera.',
            price: '219000',
            photo: '../assets/images/jc_120.jpg',
            quantity: 5,
            details: 'Type: GPS Tracker\nUse: Automotive\nPlace of Origin: Guangdong, China\nBrand Name: Jimi/Concox\nModel Number: JC120\nWarranty: 1 Year\nNetwork: 3G & 2G GSM/GPRS/WCDMA 850/900/1800/1900/2100MHz\nInput/Output Interface: Engine Cut-off, SOS, RS232, ACC detection\nTracking system: Free Web Server Platform and APP: Tracksolid\nAdditional: Supports SD card up to 64GB'
        },
        {
            id: 6,
            name: 'Nakamichi NS QT65',
            description: 'High-fidelity Nakamichi speaker.',
            price: '699000',
            photo: '../assets/images/nakamichi_ns_qt65.png',
            quantity: 5,
            details: 'N-Power: 20W\nImpedance: 3Ω\nSensitivity (dB/W/m): 89±3dB\nFrequency Response: 270Hz - 20kHz\nVoice Coil: Φ25.5 mm KSV\nCone Material: Silk\nMagnet Type: Neodymium\nDimensions: 70mm x 70mm x 49mm\nNet Weight: Approx. 0.24kg (1 pc)'
        },
        {
            id: 7,
            name: 'Speaker IWS 653',
            description: 'In-wall speaker for immersive sound.',
            price: '859000',
            photo: '../assets/images/speaker_iws_65_3.jpeg',
            quantity: 5,
            details: 'Ukuran: 6,5 inci\nRentang frekuensi: 70–25.000 Hz\nCrossover network unit: 480 Hz 4.4 KHz\nSensitivitas: 89 dB/w/m\nImpedansi: 4 Ω\nDaya nominal: 40 W\nDaya maksimum: 120 W'
        },
        {
            id: 8,
            name: 'Venom EX-H Amplifier',
            description: 'Powerful and efficient amplifier.',
            price: '2599000',
            photo: '../assets/images/venom_ex_h.jpeg',
            quantity: 5,
            details: 'Sistem Impedansi: 4\nSensitivitas: 89dB\nFrekuensi: 61Hz-20kHz\nMagnet: Ferrite\nKumparan Suara: 25.5mm\nTweeter: 13.28mm\nKerucut: Fiberglass'
        },
        {
            id: 9,
            name: 'Venom EX-HC Amplifier',
            description: 'Compact high-performance amplifier.',
            price: '3199000',
            photo: '../assets/images/venom_ex_hc.jpg',
            quantity: 5,
            details: 'Sistem Impedansi: 4\nSensitivitas: 89dB\nFrekuensi: 61Hz-20kHz\nMagnet: Ferrite\nKumparan Suara: 25.5mm\nTweeter: 13.28mm\nKerucut: Fiberglass'
        },
        {
            id: 10,
            name: 'ZS 63 RC Speaker',
            description: 'Premium ZS series speaker.',
            price: '799000',
            photo: '../assets/images/zs_6_3_rc.jpg',
            quantity: 5,
            details: 'Midbass: Voice Coil KAPTON El-Copper, Dust Cap Anodized Stretched Aluminium\nMidrange: Voice Coil Aluminium El-Copper, Dust Cap Composite Material, Cooper Short Ring\nTweeter: Dome Material Natural Silk Soft Dome\n3 inch midrange speaker\nDiameter 6,5 cm\n65 watt\nPower rms 30 watt\nImpedance 4 ohm'
        }
    ];

    const productContainer = document.getElementById('product-container');
    const popularProductsContainer = document.getElementById('popular-products');
    const searchBar = document.getElementById('searchBar');

    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const products = [...initialProducts, ...storedProducts];
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    function formatRupiah(amount) {
        return 'Rp ' + parseInt(amount).toLocaleString('id-ID');
    }

    function displayProducts(productsToDisplay, container) {
        container.innerHTML = '';
        productsToDisplay.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product-card');

            productElement.innerHTML = `
                <img src="${product.photo}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>Price: ${formatRupiah(product.price)}</p>
                <p>Quantity: ${product.quantity}</p>
                <details>
                    <summary>Details</summary>
                    <p>${product.details.replace(/\n/g, '<br>')}</p>
                </details>
                <button onclick="addToCart(${product.id})">Tambah ke Keranjang</button>
                <button onclick="addToWishlist(${product.id})">Tambah ke Wishlist</button>
            `;

            container.appendChild(productElement);
        });
    }

    if (productContainer) {
        displayProducts(products, productContainer);
        searchBar.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredProducts = products.filter(product => 
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm)
            );
            displayProducts(filteredProducts, productContainer);
        });
    }

    if (popularProductsContainer) {
        const popularProducts = products.filter(product => [1, 2, 3, 4].includes(product.id));
        displayProducts(popularProducts, popularProductsContainer);
        
        searchBar.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredProducts = products.filter(product => 
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm)
            );
            displayProducts(filteredProducts, popularProductsContainer);
        });
    }

    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        const cartItem = cart.find(item => item.id === productId);
        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.name} berhasil ditambahkan ke keranjang!`);
    }

    function addToWishlist(productId) {
        const product = products.find(p => p.id === productId);
        if (!wishlist.find(item => item.id === productId)) {
            wishlist.push(product);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            alert(`${product.name} berhasil ditambahkan ke wishlist!`);
        }
    }

    function moveToCart(productId) {
        addToCart(productId);
        removeFromWishlist(productId);
    }

    function removeFromWishlist(productId) {
        wishlist = wishlist.filter(item => item.id !== productId);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }

    function checkout() {
        const selectedItems = [];
        document.querySelectorAll('.cart-item-checkbox:checked').forEach(checkbox => {
            const productId = parseInt(checkbox.getAttribute('data-id'));
            const item = cart.find(item => item.id === productId);
            if (item) {
                selectedItems.push(item);
            }
        });

        if (selectedItems.length === 0) {
            alert('Pilih produk yang ingin di-checkout.');
            return;
        }

        localStorage.setItem('checkoutItems', JSON.stringify(selectedItems));
        window.location.href = 'payment.html';
    }

    window.addToCart = addToCart;
    window.addToWishlist = addToWishlist;
    window.moveToCart = moveToCart;
    window.removeFromWishlist = removeFromWishlist;
    window.checkout = checkout;
});
