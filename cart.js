document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const checkoutButton = document.getElementById("checkout");

    // Load cart from localStorage or initialize empty array
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCart() {
        cartItemsContainer.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            let itemTotal = item.price * item.quantity;
            total += itemTotal;

            const li = document.createElement("li");
            li.innerHTML = `${item.name} x${item.quantity} - ₹${itemTotal}
                <button class="remove-item" data-index="${index}">Remove</button>`;
            cartItemsContainer.appendChild(li);
        });

        totalPriceElement.textContent = total;

        // Save latest total and cart to localStorage for checkout.html
        localStorage.setItem("cart", JSON.stringify(cart));
        localStorage.setItem("total", total.toString());

        // Remove item functionality
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCart();
            });
        });
    }

    // Add to Cart functionality
    if (document.querySelector(".add-to-cart")) {
        document.querySelectorAll(".add-to-cart").forEach(button => {
            button.addEventListener("click", () => {
                const itemName = button.getAttribute("data-name");
                const itemPrice = parseFloat(button.getAttribute("data-price"));

                let existingItem = cart.find(item => item.name === itemName);
                if (existingItem) {
                    existingItem.quantity++;
                } else {
                    cart.push({ name: itemName, price: itemPrice, quantity: 1 });
                }

                localStorage.setItem("cart", JSON.stringify(cart));
                alert(`${itemName} added to cart!`);
            });
        });
    }

    // If on cart page, render cart
   if (document.getElementById("cart-items")) {
    updateCart();
}

     // WhatsApp Checkout
    const whatsappButton = document.getElementById("whatsapp-checkout");
    if (whatsappButton) {
        whatsappButton.addEventListener("click", () => {
            if (cart.length === 0) {
                alert("Your cart is empty!");
                return;
            }

            let orderMessage = "Hello Mrs Bakery, I want to order:\n";
            cart.forEach(item => {
                orderMessage += `${item.quantity} x ${item.name} - ₹${(item.price * item.quantity).toFixed(2)}\n`;
            });
            orderMessage += `Total: ₹${totalPriceElement.textContent}`;

            const whatsappURL = `https://wa.me/919944061931?text=${encodeURIComponent(orderMessage)}`;
            window.open(whatsappURL, "_blank");
        });
    }
// Google Pay Checkout
const gpayButton = document.getElementById("gpay-checkout");
if (gpayButton) {
    gpayButton.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        const totalAmount = totalPriceElement.textContent;

        if(navigator.share){
            alert("Google Pay should be installed.Please install to proceed.")
        }
        // UPI details
        const upiID = "shravanthibalajickr-1@okaxis";  // Replace with your UPI ID
        const name = "SHRAVANTHI BALAJI";         // Recipient name
        const txnRef = "ORDER" + new Date().getTime(); // Unique txn reference
        const currency = "INR";
        const note = encodeURIComponent("Payment for Mrs Bakery order");

        // UPI Payment URL
        const upiUrl = `upi://pay?pa=${upiID}&pn=${encodeURIComponent(name)}&tr=${txnRef}&tn=${note}&am=${totalAmount}&cu=${currency}`;

        // Open Google Pay / UPI app
        window.location.href = upiUrl;
    });
}

});