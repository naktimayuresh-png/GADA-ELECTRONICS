
let cart = [];

function changeQty(id, change) {
    let input = document.getElementById(id);
    let quantity = Number(input.value);

    if (input.value === "" || !Number.isFinite(quantity)) {
        quantity = 1;
    }

    quantity = Math.floor(quantity) + change;
    quantity = Math.max(1, Math.min(99, quantity));

    input.value = quantity;
}

function addToCart(name, price, inputId) {
    let quantity = Number(
        document.getElementById(inputId).value
    );

    if (!Number.isInteger(quantity) ||
        quantity < 1 || quantity > 99) {
        alert("Please enter quantity between 1 and 99.");
        return;
    }

    let item = cart.find(product => product.name === name);

    if (item) {
        if (item.quantity + quantity > 99) {
            alert("Maximum quantity is 99.");
            return;
        }

        item.quantity += quantity;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: quantity
        });
    }

    showCart();
}

function showCart() {
    let cartItems = document.getElementById("cartItems");
    let total = 0;

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.textContent = "Your cart is empty.";
    }

    cart.forEach(function(item, index) {
        let amount = item.price * item.quantity;
        total += amount;

        let row = document.createElement("div");
        row.className = "cart-item";

        let details = document.createElement("div");

        let name = document.createElement("strong");
        name.textContent = item.name;

        let info = document.createElement("p");
        info.textContent =
            "₹" + item.price + " × " + item.quantity;

        details.appendChild(name);
        details.appendChild(info);

        let right = document.createElement("div");

        let subtotal = document.createElement("strong");
        subtotal.textContent = "₹" + amount;

        let remove = document.createElement("button");
        remove.textContent = "Remove";
        remove.className = "remove-btn";

        remove.onclick = function() {
            removeItem(index);
        };

        right.appendChild(subtotal);
        right.appendChild(document.createElement("br"));
        right.appendChild(remove);

        row.appendChild(details);
        row.appendChild(right);

        cartItems.appendChild(row);
    });

    document.getElementById("total").textContent = total;
}

function removeItem(index) {
    cart.splice(index, 1);
    showCart();
}

function placeOrder() {
    if (cart.length === 0) {
        alert("Please add a product to your cart first!");
        return;
    }

    let total = cart.reduce(function(sum, item) {
        return sum + item.price * item.quantity;
    }, 0);

    alert(
        "Thank you for shopping at GADA ELECTRONICS!\n" +
        "Your total bill is ₹" + total
    );

    cart = [];
    showCart();
}
