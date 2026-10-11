const menu = [
    { name: "Espresso", price: 3.0 },
    { name: "Latte", price: 4.5 },
    { name: "Mocha", price: 5.0 },
    { name: "Muffin", price: 2.5 }
];
let cart = [];

const menuList = document.getElementById("menu-list");
const cartList = document.getElementById("cart-list");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const rewardMsg = document.getElementById("reward-msg");
const itemName = document.getElementById("item-name");
const itemPrice = document.getElementById("item-price");
const errorMsg = document.getElementById("error-msg");
const addCustomBtn = document.getElementById("add-custom-btn");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Part A: Create a menu row and an Add button for every item.
function renderMenu() {
    menuList.textContent = "";

    for (let i = 0; i < menu.length; i++) {
        const li = document.createElement("li");
        const text = document.createElement("span");
        const button = document.createElement("button");

        text.textContent = menu[i].name + " – $" + menu[i].price.toFixed(2);
        button.textContent = "Add";
        button.dataset.index = i;
        button.addEventListener("click", addToCart);

        li.appendChild(text);
        li.appendChild(button);
        menuList.appendChild(li);
    }
}

// Part B: Add the selected menu item to the cart.
function addToCart(event) {
    const index = Number(event.currentTarget.dataset.index);
    cart.push(menu[index]);
    renderCart();
}

// Part B: Rebuild the cart rows, count and total.
function renderCart() {
    cartList.textContent = "";

    for (let i = 0; i < cart.length; i++) {
        const li = document.createElement("li");
        const text = document.createElement("span");
        const button = document.createElement("button");

        text.textContent = cart[i].name + " – $" + cart[i].price.toFixed(2);
        button.textContent = "Remove";
        button.dataset.index = i;

        li.appendChild(text);
        li.appendChild(button);
        cartList.appendChild(li);
    }

    cartCount.textContent = cart.length;
    updateTotal();
}

// Part B: Use one listener on the cart list to remove one entry.
function removeFromCart(event) {
    if (!event.target.matches("button[data-index]")) {
        return;
    }

    const index = Number(event.target.dataset.index);
    cart.splice(index, 1);
    renderCart();
}

// Part C: Add the current item's price to the running sum.
function addPrice(sum, item) {
    return sum + item.price;
}

// Part C: Calculate the total and update the cookie reward.
function updateTotal() {
    const total = Number(cart.reduce(addPrice, 0).toFixed(2));
    cartTotal.textContent = total.toFixed(2);

    if (total > 15) {
        cartTotal.style.color = "red";
        rewardMsg.classList.remove("hidden");
    } else {
        cartTotal.style.color = "";
        rewardMsg.classList.add("hidden");
    }
}

// Part D: Validate the inputs and add a new item to the menu.
function addCustomItem() {
    const name = itemName.value.trim();
    const priceText = itemPrice.value.trim();
    const price = Number(priceText);

    if (name === "") {
        errorMsg.textContent = "Name is required.";
        return;
    }

    if (!Number.isFinite(price) || price <= 0) {
        errorMsg.textContent = "Price must be a positive number.";
        return;
    }

    for (let i = 0; i < menu.length; i++) {
        if (menu[i].name.toLowerCase() === name.toLowerCase()) {
            errorMsg.textContent = "This item is already on the menu.";
            return;
        }
    }

    menu.push({ name, price });
    renderMenu();
    itemName.value = "";
    itemPrice.value = "";
    errorMsg.textContent = "";
}

// Part E: Empty the cart, or show a message if it is already empty.
function clearCart() {
    if (cart.length === 0) {
        renderCart();
        const li = document.createElement("li");
        li.textContent = "Your cart is empty.";
        cartList.appendChild(li);
        return;
    }

    cart = [];
    renderCart();
}

cartList.addEventListener("click", removeFromCart);
addCustomBtn.addEventListener("click", addCustomItem);
clearCartBtn.addEventListener("click", clearCart);

renderMenu();
renderCart();
