document.addEventListener('DOMContentLoaded', () => {
    displayDiscounts();
});

function saveDiscount() {
    const id = document.getElementById('discount-id').value;
    const name = document.getElementById('discount-name').value;
    const percentage = document.getElementById('discount-percentage').value;

    // Validasi persentase diskon
    if (percentage < 0 || percentage > 100) {
        alert('Persentase diskon harus antara 0 dan 100.');
        return;
    }

    const discounts = JSON.parse(localStorage.getItem('discounts')) || [];

    if (id) {
        const discountIndex = discounts.findIndex(discount => discount.id == id);
        discounts[discountIndex] = { id, name, percentage };
    } else {
        const newDiscount = {
            id: Date.now().toString(),
            name,
            percentage
        };
        discounts.push(newDiscount);
    }

    localStorage.setItem('discounts', JSON.stringify(discounts));
    displayDiscounts();
    clearForm();
}

function displayDiscounts() {
    const discounts = JSON.parse(localStorage.getItem('discounts')) || [];
    const discountsContainer = document.getElementById('discounts');
    discountsContainer.innerHTML = '';

    discounts.forEach(discount => {
        const discountElement = document.createElement('div');
        discountElement.classList.add('discount-item');
        discountElement.innerHTML = `
            <h3>${discount.name}</h3>
            <p>Persentase: ${discount.percentage}%</p>
            <button onclick="editDiscount('${discount.id}')">Edit</button>
            <button onclick="deleteDiscount('${discount.id}')">Hapus</button>
        `;
        discountsContainer.appendChild(discountElement);
    });
}

function editDiscount(id) {
    const discounts = JSON.parse(localStorage.getItem('discounts')) || [];
    const discount = discounts.find(discount => discount.id == id);

    document.getElementById('discount-id').value = discount.id;
    document.getElementById('discount-name').value = discount.name;
    document.getElementById('discount-percentage').value = discount.percentage;
}

function deleteDiscount(id) {
    let discounts = JSON.parse(localStorage.getItem('discounts')) || [];
    discounts = discounts.filter(discount => discount.id != id);
    localStorage.setItem('discounts', JSON.stringify(discounts));
    displayDiscounts();
}

function clearForm() {
    document.getElementById('discount-id').value = '';
    document.getElementById('discount-name').value = '';
    document.getElementById('discount-percentage').value = '';
}