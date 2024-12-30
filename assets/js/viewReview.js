const reviews = [
    {
        orderId: 1,
        customer: 'John Doe',
        date: '2023-10-01',
        rating: 4,
        review: 'Produk sangat bagus dan berkualitas.'
    },
    {
        orderId: 2,
        customer: 'John Doe',
        date: '2023-10-05',
        rating: 5,
        review: 'Pelayanan cepat dan produk sesuai deskripsi.'
    }
];

function loadReviews() {
    const reviewListContainer = document.getElementById('review-list');
    if (reviewListContainer) {
        reviewListContainer.innerHTML = '';
        reviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.classList.add('review-card');
            reviewElement.innerHTML = `
                <h3>Order ID: ${review.orderId}</h3>
                <p><strong>Customer</strong> ${review.customer}</p>
                <p><strong>Date</strong> ${review.date}</p>
                <p><strong>Rating</strong> ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</p>
                <p><strong>Review</strong> ${review.review}</p>
            `;
            reviewListContainer.appendChild(reviewElement);
        });
    }
}

document.addEventListener('DOMContentLoaded', loadReviews);