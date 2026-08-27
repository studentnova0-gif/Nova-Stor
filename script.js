/* PRODUCTS */

const products = [

    {
        id: 1,
        name: "Wireless Bluetooth Earbuds",
        price: 1799,
        old: 2999,
        cat: "Electronics",
        img: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 2,
        name: "Smart Watch Series",
        price: 2499,
        old: 3999,
        cat: "Electronics",
        img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 3,
        name: "Women's Casual Dress",
        price: 2199,
        old: 3500,
        cat: "Fashion",
        img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 4,
        name: "Ladies Handbag",
        price: 1599,
        old: 2500,
        cat: "Fashion",
        img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 5,
        name: "Face Care Set",
        price: 1299,
        old: 1999,
        cat: "Beauty",
        img: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 6,
        name: "Modern Table Lamp",
        price: 1899,
        old: 2800,
        cat: "Home",
        img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 7,
        name: "Sports Running Shoes",
        price: 2999,
        old: 4500,
        cat: "Sports",
        img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 8,
        name: "Kitchen Organizer",
        price: 999,
        old: 1500,
        cat: "Home",
        img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 9,
        name: "Premium Backpack",
        price: 1999,
        old: 3200,
        cat: "Fashion",
        img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 10,
        name: "Coffee Mug Set",
        price: 799,
        old: 1200,
        cat: "Home",
        img: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=600&q=80"
    }

];


/* CART */

let cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];


/* SHOW PRODUCTS */

function renderProducts(list) {

    const grid =
        document.getElementById(
            "productGrid"
        );


    grid.innerHTML = "";


    list.forEach(product => {

        grid.innerHTML += `

            <div class="card">

                <img
                    src="${product.img}"
                    alt="${product.name}"
                >

                <div class="card-body">

                    <div class="title">
                        ${product.name}
                    </div>

                    <div class="price">
                        Rs. ${product.price.toLocaleString()}
                    </div>

                    <div class="old">
                        Rs. ${product.old.toLocaleString()}
                    </div>

                    <button
                        class="add"
                        onclick="addToCart(${product.id})"
                    >
                        Add to Cart
                    </button>

                </div>

            </div>

        `;

    });

}


/* ADD TO CART */

function addToCart(id) {

    const product =
        products.find(
            item => item.id === id
        );


    cart.push(product);


    saveCart();


    alert(
        product.name +
        " added to cart!"
    );

}


/* SAVE CART */

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    document.getElementById(
        "cartCount"
    ).textContent = cart.length;

}


/* SHOW CART */

function showCart() {

    const cartItems =
        document.getElementById(
            "cartItems"
        );


    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty.</p>";

    }

    else {

        cartItems.innerHTML =
            cart.map(
                (product, index) => `

                <div class="cart-row">

                    <span>
                        ${product.name}
                    </span>

                    <b>
                        Rs.
                        ${product.price.toLocaleString()}
                    </b>

                    <button
                        onclick="removeCart(${index})"
                    >
                        Remove
                    </button>

                </div>

            `
            ).join("");

    }


    const total =
        cart.reduce(
            (sum, product) =>
                sum + product.price,
            0
        );


    document.getElementById(
        "cartTotal"
    ).textContent =
        "Total: Rs. " +
        total.toLocaleString();


    document.getElementById(
        "cartModal"
    ).style.display = "flex";

}


/* REMOVE CART ITEM */

function removeCart(index) {

    cart.splice(index, 1);

    saveCart();

    showCart();

}


/* CLOSE MODAL */

function closeModal(id) {

    document.getElementById(
        id
    ).style.display = "none";

}


/* LOGIN */

function openLogin() {

    document.getElementById(
        "loginModal"
    ).style.display = "flex";

}


function demoLogin() {

    alert(
        "login successful!"
    );

}


/* CATEGORY FILTER */

function filterCategory(category) {

    const filtered =
        products.filter(
            product =>
                product.cat === category
        );


    renderProducts(filtered);


    document.getElementById(
        "products"
    ).scrollIntoView({
        behavior: "smooth"
    });

}


/* SEARCH */

function searchProducts() {

    const query =
        document.getElementById(
            "searchInput"
        ).value
        .toLowerCase();


    const result =
        products.filter(
            product =>
                product.name
                    .toLowerCase()
                    .includes(query)
                ||
                product.cat
                    .toLowerCase()
                    .includes(query)
        );


    renderProducts(result);

}


/* ENTER SEARCH */

document
    .getElementById("searchInput")
    .addEventListener(
        "keyup",
        function(event) {

            if (
                event.key === "Enter"
            ) {

                searchProducts();

            }

        }
    );


/* SCROLL */

function scrollToProducts() {

    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* CHECKOUT */

function checkout() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;

    }


    alert(
        " checkout completed!"
    );


    cart = [];

    saveCart();

    closeModal(
        "cartModal"
    );

}


/* START WEBSITE */

renderProducts(products);

saveCart();
localStorage.setItem("password", password);