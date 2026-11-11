let foodMenu = {

    "Rice Meals": [
        {
            name: "Jollof Rice",
            description: "Delicious Nigerian party jollof rice.",
            price: 2500,
            image: "jollof.webp"
        },
        {
            name: "Fried Rice",
            description: "Tasty fried rice with vegetables.",
            price: 2800,
            image: "fried rice.webp"
        },
        {
            name: "Basmati Rice with Chicken",
            description: "Delicious basmati butter rice.",
            price: 2000,
            image: "basmati butter rice with chicken.webp"
        },
        {
            name: "Coconut Rice",
            description: "Flavourful rice cooked with coconut milk.",
            price: 3000,
            image: "coconut.webp"
        }
    ],

    "Swallow": [
        {
            name: "Amala and Ewedu",
            description: "Amala served with ewedu and stew.",
            price: 2500,
            image: "amala.webp"
        },
        {
            name: "Eba and Egusi",
            description: "Fresh eba with delicious egusi soup.",
            price: 2800,
            image: "eba.webp"
        },
        {
            name: "Pounded Yam",
            description: "Soft pounded yam served with soup.",
            price: 3000,
            image: "poundo.webp"
        },
        {
            name: "Fufu and Okra",
            description: "Fufu served with fresh okra soup.",
            price: 2500,
            image: "fufu.webp"
        }
    ],

    "Pasta": [
        {
            name: "Jollof Spaghetti",
            description: "Spaghetti cooked in delicious tomato sauce.",
            price: 2000,
            image: "spaghetti jollof.webp"
        },
        {
            name: "Spaghetti Bolognese",
            description: "Spaghetti mixed with vegetables.",
            price: 2500,
            image: "spaghetti bolognese.webp"
        },
          {
            name: "Spaghetti and Stew",
            description: "Spaghetti with delicious stew.",
            price: 1500,
            image: "spaghetti and stew.webp"
        },
        {
            name: "Macaroni and Stew",
            description: "Tasty macaroni prepared with sauce.",
            price: 2200,
            image: "macaroni and stew.webp"
        }
    ],

    "Proteins": [
        {
            name: "Grilled Chicken",
            description: "Well-seasoned grilled chicken.",
            price: 2500,
            image: "chicken.webp"
        },
        {
            name: "Fried Beef",
            description: "Freshly fried beef.",
            price: 1500,
            image: "beef.webp"
        },
        {
            name: "Fried Fish",
            description: "Crispy fried fish.",
            price: 2000,
            image: "fish.webp"
        }
    ],

    "Snacks": [
        {
            name: "Meat Pie",
            description: "Freshly baked Nigerian meat pie.",
            price: 1000,
            image: "meat pie.webp"
        },
        {
            name: "Sausage Roll",
            description: "Delicious sausage roll.",
            price: 800,
            image: "sausage.webp"
        },
        {
            name: "Puff Puff",
            description: "Soft and fluffy puff puff.",
            price: 500,
            image: "puff.webp"
        }
    ],

    "Drinks": [
        {
            name: "Bottle Water",
            description: "Chilled bottled water.",
            price: 500,
            image: "water.webp"
        },
        {
            name: "Soft Drink",
            description: "Refreshing soft drink.",
            price: 700,
            image: "drinks.webp"
        },
        {
            name: "Fruit Juice",
            description: "Refreshing fruit juice.",
            price: 1200,
            image: "friut.webp"
        }
    ]
};
function openCategory(category) {
    localStorage.setItem("selectedCategory", category);
    window.location.href = "menu.html";
}
function displayMenu() {
    let category = localStorage.getItem("selectedCategory");
    let categoryTitle = document.getElementById("categoryTitle");
    let menuContainer = document.getElementById("menuContainer");
    if (!categoryTitle || !menuContainer) {
        return;
    }
    categoryTitle.innerHTML = category || "Our Menu";
    menuContainer.innerHTML = "";
    let foods = foodMenu[category];
    if (!foods) {
        menuContainer.innerHTML = "<p>Please select a food category first.</p>";
        return;
    }
    for (let i = 0; i < foods.length; i++) {
        menuContainer.innerHTML += `
            <div class="food-card">
                <img src="${foods[i].image}" alt="${foods[i].name}">
                <h2>${foods[i].name}</h2>
                <p>${foods[i].description}</p>
                <h3>₦${foods[i].price.toLocaleString()}</h3>
                <button onclick="addToCart('${foods[i].name}')">
                    Add to Cart
                </button>
            </div>
        `;
    }
}
function addToCart(foodName) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let category = localStorage.getItem("selectedCategory");
    let foods = foodMenu[category];
    let selectedFood = foods.find(function(food) {
        return food.name === foodName;
    });
    let existingFood = cart.find(function(item) {
        return item.name === foodName;
    });
    if (existingFood) {
        existingFood.quantity++;
    } else {
        cart.push({
            name: selectedFood.name,
            price: selectedFood.price,
            image: selectedFood.image,
            quantity: 1
        });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(foodName + " added to your cart!");
}
displayMenu();
function getCartItems() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}
function displayCart() {
    const cartContainer = document.getElementById("cartContainer");
    if (!cartContainer) {
        return;
    }
    let cart = getCartItems();
    cartContainer.innerHTML = "";
    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <div class="empty-cart">
                <h2>Your cart is empty!</h2>
                <p>You haven't added any food to your cart yet.</p>
                <a href="order.html">Start Shopping</a>
            </div>
        `;
        document.getElementById("cartSubtotal").textContent = "₦0";
        document.getElementById("cartTotal").textContent = "₦0";
        return;
    }
    let total = 0;
    cart.forEach((item, index) => {
        let itemTotal = Number(item.price) * Number(item.quantity);
        total += itemTotal;
        cartContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <p>Price: ₦${Number(item.price).toLocaleString()}</p>
                    <strong>
                        Subtotal: ₦${itemTotal.toLocaleString()}
                    </strong>
                    <div class="quantity-controls">
                        <button onclick="changeQuantity(${index}, -1)">−</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQuantity(${index}, 1)">+</button>
                    </div>
                    <button class="remove-button"
                        onclick="removeCartItem(${index})">
                        Remove Item
                    </button>
                </div>
            </div>
        `;
    });
    document.getElementById("cartSubtotal").textContent =
        "₦" + total.toLocaleString();
    document.getElementById("cartTotal").textContent =
        "₦" + total.toLocaleString();
}
function changeQuantity(index, amount) {
    let cart = getCartItems();
    cart[index].quantity += amount;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}
function removeCartItem(index) {
    let cart = getCartItems();
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}
function goToCheckout() {
    let cart = getCartItems();
    if (cart.length === 0) {
        alert("Your cart is empty. Please add some food first.");
        return;
    }
    window.location.href = "checkout.html";
}
displayCart();
function displayCheckout() {
    const checkoutItems = document.getElementById("checkoutItems");
    if (!checkoutItems) {
        return;
    }
    let cart = getCartItems();
    if (cart.length === 0) {
        checkoutItems.innerHTML = `
            <p>Your cart is empty.</p>
            <a href="order.html">Go back to menu</a>
        `;
        document.getElementById("checkoutTotal").textContent = "₦0";
        document.getElementById("placeOrderButton").disabled = true;
        return;
    }
    let total = 0;
    checkoutItems.innerHTML = "";
    cart.forEach(item => {
        let itemTotal = Number(item.price) * Number(item.quantity);
        total += itemTotal;
        checkoutItems.innerHTML += `
            <div class="checkout-product">
                <span>
                    ${item.name} × ${item.quantity}
                </span>
                <strong>
                    ₦${itemTotal.toLocaleString()}
                </strong>
            </div>
        `;
    });
    document.getElementById("checkoutTotal").textContent =
        "₦" + total.toLocaleString();
}
function completeCheckout(event) {

    event.preventDefault();

    let cart = getCartItems();

    if (cart.length === 0) {
        alert("Your cart is empty. Please add food before checkout.");
        return;
    }
    let studentName = document.getElementById("studentName").value.trim();
    let studentID = document.getElementById("studentID").value.trim();
    let studentPhone = document.getElementById("studentPhone").value.trim();
    let orderNotes = document.getElementById("orderNotes").value.trim();
    let amountPaid = Number(document.getElementById("amountPaid").value);
    let total = 0;

    cart.forEach(item => {
        total += Number(item.price) * Number(item.quantity);
    });
    if (!Number.isFinite(amountPaid) || amountPaid <= 0) {
        alert("Please enter a valid payment amount.");
        return;
    }
    if (amountPaid < total) {
        alert(
            "Insufficient payment!\n" +
            "Your total is ₦" + total.toLocaleString() +
            "\nPlease enter enough money."
        );
        return;
    }
    let change = amountPaid - total;
    let orderNumber = "CB" + Date.now().toString().slice(-8);
    let order = {
        orderNumber: orderNumber,
        studentName: studentName,
        studentID: studentID,
        studentPhone: studentPhone,
        orderNotes: orderNotes,
        items: cart,
        total: total,
        amountPaid: amountPaid,
        change: change,
        orderDate: new Date().toLocaleString(),
        status: "Paid"
    };
    localStorage.setItem("lastOrder", JSON.stringify(order));
    localStorage.removeItem("cart");
    window.location.href = "receipt.html";
}
const checkoutForm = document.getElementById("checkoutForm");
if (checkoutForm) {
    checkoutForm.addEventListener("submit", completeCheckout);
}
displayCheckout();



function displayReceipt() {

    const receiptContainer = document.getElementById("receiptContainer");

    
    if (!receiptContainer) {
        return;
    }

    
    let order = JSON.parse(localStorage.getItem("lastOrder"));

    
    if (!order) {

        receiptContainer.innerHTML = `
            <div class="empty-cart">
                <h2>No Receipt Found</h2>
                <p>You have not completed an order yet.</p>
                <a href="order.html">Start Shopping</a>
            </div>
        `;

        document.querySelector(".receipt-buttons").style.display = "none";

        return;
    }

    
    document.getElementById("receiptOrderNumber").textContent =
        order.orderNumber;

    document.getElementById("receiptStudentName").textContent =
        order.studentName;

    document.getElementById("receiptStudentID").textContent =
        order.studentID;

    document.getElementById("receiptPhone").textContent =
        order.studentPhone;

    document.getElementById("receiptDate").textContent =
        order.orderDate;

    document.getElementById("receiptNotes").textContent =
        order.orderNotes || "No special instructions.";

        
    const receiptItems = document.getElementById("receiptItems");

    receiptItems.innerHTML = "";

    order.items.forEach(item => {

        let itemTotal = Number(item.price) * Number(item.quantity);

        receiptItems.innerHTML += `
            <div class="receipt-product">

                <span>
                    ${item.name} × ${item.quantity}
                </span>

                <strong>
                    ₦${itemTotal.toLocaleString()}
                </strong>

            </div>
        `;

    });


    document.getElementById("receiptTotal").textContent =
        "₦" + Number(order.total).toLocaleString();

    document.getElementById("receiptAmountPaid").textContent =
        "₦" + Number(order.amountPaid).toLocaleString();

    document.getElementById("receiptChange").textContent =
        "₦" + Number(order.change).toLocaleString();

}


displayReceipt();