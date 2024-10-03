// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC8QEpiNqyURW0hvah0sPa3jREoyCZQNUI",
    authDomain: "onlineshopping-31b9b.firebaseapp.com",
    projectId: "onlineshopping-31b9b",
    storageBucket: "onlineshopping-31b9b.appspot.com",
    messagingSenderId: "633597516459",
    appId: "1:633597516459:web:35dce3edd2e4786c51f5ee",
    measurementId: "G-V6FN7QM2CD"
  };

// Initialize Firebase App
firebase.initializeApp(firebaseConfig);

// Get Firestore and Auth services
const db = firebase.firestore();
const auth = firebase.auth();

// DOM Elements
const productList = document.getElementById('productList');
const loginPage = document.getElementById('loginPage');
const userGreeting = document.getElementById('userGreeting');
const logoutButton = document.getElementById('logoutButton');

// Fetch products from Firestore
function fetchProducts() {
    const firestoreUrl = `https://firestore.googleapis.com/v1/projects/onlineshopping-31b9b/databases/(default)/documents/Inventory`;

    fetch(firestoreUrl)
        .then(response => response.json())
        .then(data => {
            productList.innerHTML = ''; // Clear existing products

            const products = data.documents;

            if (!products || products.length === 0) {
                productList.innerHTML = '<p>No products found.</p>';
                return;
            }

            // Display each product
            products.forEach(productDoc => {
                const productData = productDoc.fields;

                const imageUrl = productData.imageURL ? productData.imageURL.stringValue : 'default-image.jpg';
                const name = productData.name ? productData.name.stringValue : 'Unknown Product';
                const description = productData.description ? productData.description.stringValue : 'No Description';
                const price = productData.price && !isNaN(productData.price.doubleValue)
                    ? `₹${(productData.price.doubleValue * 82.66).toFixed(2)}`
                    : 'N/A';
                const category = productData.category ? productData.category.stringValue : 'Unknown Category';

                // Create product card
                const productCard = document.createElement('div');
                productCard.classList.add('product');
                productCard.innerHTML = `
                    <img src="${imageUrl}" alt="${name}">
                    <h3>${name}</h3>
                    <p>${description}</p>
                    <p class="price">${price}</p>
                    <p>Category: ${category}</p>
                    <div class="action-buttons">
                        <button onclick="buyNow('${productDoc.name}')">Buy Now</button>
                        <button onclick="addToCart('${productDoc.name}')">Add to Cart</button>
                    </div>
                `;

                productList.appendChild(productCard);
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            productList.innerHTML = '<p>Error loading products.</p>';
        });
}

// Check if the user is logged in
function checkUserStatus() {
    const user = auth.currentUser;

    if (user) {
        // If logged in, show user info and products
        userGreeting.textContent = `Hello, ${user.displayName || user.email}`;
        loginPage.style.display = 'none';
        logoutButton.style.display = 'inline-block';
        fetchProducts();
    } else {
        // If not logged in, show login page
        userGreeting.textContent = 'Hello, Guest';
        loginPage.style.display = 'block';
        logoutButton.style.display = 'none';
    }
}

// Login function (Firebase Auth)
function login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then(result => {
            console.log('User logged in:', result.user);
            checkUserStatus();
        })
        .catch(error => {
            console.error('Login failed:', error);
        });
}

// Logout function (Firebase Auth)
logoutButton.addEventListener('click', () => {
    auth.signOut()
        .then(() => {
            console.log('User logged out');
            checkUserStatus();
        })
        .catch(error => {
            console.error('Logout failed:', error);
        });
});

// Buy Now function (redirect to buyNow page)
function buyNow(productName) {
    window.location.href = `buyNow.html?product=${encodeURIComponent(productName)}`;
}

// Add to Cart function (redirect to addToCart page)
function addToCart(productName) {
    window.location.href = `addToCart.html?product=${encodeURIComponent(productName)}&quantity=1`;
}

// Check user status on page load
window.onload = () => {
    checkUserStatus();
};
