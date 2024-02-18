document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsList = document.querySelector('.cart-items');
    const buyButton = document.querySelector('.buy-button');
    const billDetails = document.querySelector('.bill-details');

    let cartItems = [];

    // Event listener for Add to Cart buttons
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));

            // Add item to cart
            cartItems.push({ name, price });
            renderCartItems();
        });
    });

    // Event listener for Buy Now button
    buyButton.addEventListener('click', function () {
        generateBill();
    });

    // Function to render cart items
    function renderCartItems() {
        cartItemsList.innerHTML = '';
        cartItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price}`;
            cartItemsList.appendChild(li);
        });
    }

    // Function to generate bill
    function generateBill() {
        let totalAmount = 0;
        billDetails.innerHTML = '';

        cartItems.forEach(item => {
            totalAmount += item.price;
            const itemDiv = document.createElement('div');
            itemDiv.textContent = `${item.name} - $${item.price}`;
            billDetails.appendChild(itemDiv);
        });

        // Display total amount
        const totalDiv = document.createElement('div');
        totalDiv.textContent = `Total: $${totalAmount}`;
        billDetails.appendChild(totalDiv);

        // Clear cart and reset
        cartItems = [];
        renderCartItems();
    }
});

