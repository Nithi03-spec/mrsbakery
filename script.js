const menuData = {
    cakes: [
        { name: "Vanilla Cake", price: 650, img: "vanilla_cake.jpg" },
        { name: "Chocolate Cake", price: 1100, img: "chocolate_cake.jpg" },
        { name: "Butterscotch Cake", price: 900, img: "butterscotch_cake.jpg" },
        { name: "Caramel Cake", price: 1400, img: "caramel_cake.jpg" },
        { name: "Pistachio Cake", price: 1050, img: "pistachio_cake.jpg" },
        { name: "Choco Truffle Cake", price: 1400, img: "choco_truffle_cake.jpg" },
        { name: "Blackcurrant Cake", price: 1300, img: "blackcurrant_cake.jpg" },
        { name: "Blueberry Cake", price: 1300, img: "blueberry_cake.jpg" },
        { name: "Red Velvet Cake", price: 1200, img: "red_velvet_cake.jpg" },
        { name: "Rainbow Cake", price: 2000, img: "rainbow_cake.jpg" },
        { name: "Rasamalai Cake", price: 1700, img: "rasamalai_cake.jpg" },
        { name: "Ferrero Rocher Cake", price: 1600, img: "ferrero_rocher_cake.jpg" },
        { name: "Biscoff Cake", price: 1800, img: "biscoff_cake.jpg" },
        { name: "Black Forest Cake", price: 950, img: "black_forest_cake.jpg" },
        { name: "White Forest Cake", price: 950, img: "white_forest_cake.jpg" },
        { name: "Mango Cake", price: 1200, img: "mango_cake.jpg" },
        { name: "Strawberry Cake", price: 1200, img: "strawberry_cake.jpg" }
    ],
    cookies: [ 
    { name: "Chocolate Cookies", price: 20, img: "cho c.jpg" },
    { name: "Chocolate Chunk Cookies", price: 25, img: "cho c c.jpg" },
    { name: "Pista Cookies", price: 20, img: "p c.jpg" },
    { name: "Cashew Cookies", price: 20, img: "c c.jpg" }
],
cakeShooters: [
    { name: "Butterscotch Shooters", price: 60, img: "b s.jpg" },
    { name: "Chocolate Shooters", price: 65, img: "cho s.jpg" },
    { name: "Mango Shooters", price: 60, img: "m s.jpg" },
    { name: "Strawberry Shooters", price: 60, img: "sb s.jpg" },
    { name: "Redvelvet Shooters", price: 60, img: "rv s.jpg" },
    { name: "Blueberry Shooters", price: 65, img: "bb s.jpg" },
    { name: "Blackcurrant Shooters", price: 65, img: "bc s.jpg" },
    { name: "Biscoff Shooters", price: 75, img: "bs s.jpg" }
],cupcakes: [
    { name: "Vanilla CupCake", price: 65, img: "v cc.jpg" },
    { name: "Chocolate CupCake", price: 80, img: "cho cc.jpg" },
    { name: "Caramel CupCake", price: 80, img: "car cc.jpg" },
    { name: "Unicorn CupCake", price: 65, img: "uni cc.jpg" },
    { name: "Lemencillo CupCake", price: 70, img: "lemon cc.jpg" },
    { name: "Red Velvet CupCake", price: 85, img: "rv cc.jpg" }
],
  tresleches: [
    { name: "Vanilla Tres Leches", price: 95, img: "vannila tress.jpeg" },
    { name: "RoseMilk Tres Leches", price: 110, img: "rosemilk.jpg" },
    { name: "Pistachio Tres Leches", price: 110, img: "pistachio tress.jpg" },
    { name: "Mocca Choco Tres Leches", price: 120, img: "mocca tress.jpg" },
    { name: "Biscoff Tres Leches", price: 140, img: "bis tress.jpg" },
    { name: "Blueberry Tres Leches", price: 130, img:"bb tress.jpg" },
    { name: "Strawberry Tres Leches", price: 130, img: "sb tress.jpg" },
    { name: "Mango Tres Leches", price: 130, img: "mango tress.webp" },
    { name: "RedVelvet Tres Leches", price: 135, img: "rv tress.jpg" }
],
    brownies: [
        { name: "Brownie Bites", price: 150, img: "bb.jpg" },
        { name: "Brownie Piece", price: 100, img: "bp.jpg" },
        { name: "Brownie Slab", price: 200, img: "bs.jpg" }
    ]
};

function showCategory(category) {
    const menuContainer = document.getElementById("menu-items");
    menuContainer.innerHTML = "";

    menuData[category].forEach(item => {
        const menuItem = document.createElement("div");
        menuItem.classList.add("menu-item");

        menuItem.innerHTML = `
            <img src="images/${item.img}" alt="${item.name}">
            <div>
                <h4>${item.name}</h4>
                <p>₹${item.price}</p> <!-- Display price with ₹ -->
            </div>
            <button onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button> <!-- Pass number only -->
        `;

        menuContainer.appendChild(menuItem);
    });
}

function scrollToMenu() {
    const menuSection = document.getElementById("menu-items");
    if(menuSection) {
        menuSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

// Default: Show Cakes on Load
document.addEventListener("DOMContentLoaded", () => {
    showCategory("cakes");
});

function addToCart(name, price) {
    price = parseInt(price); // Convert to number

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    let existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} added to cart!`);
}


function placeOrder() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let message = "Hi, I would like to place an order:\n\n";
    cart.forEach(item => {
        message += `• ${item.name} x${item.quantity} - ₹${item.price * item.quantity}\n`;
    });

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    message += `\nTotal: ₹${total}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "919944061931"; // Replace with your number (without +)

    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");
}
