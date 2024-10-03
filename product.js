const INVENTORY_URL = 'https://firestore.googleapis.com/v1/projects/onlineshopping-31b9b/databases/(default)/documents/Inventory';

function fetchProducts() {
    $.ajax({
        url: INVENTORY_URL,
        type: 'GET',
        success: function (response) {
            const productList = $("#productList");
            console.log("Response from Firestore:", response);  // Log the response to check if it's correct
            productList.empty();  // Clear the list before displaying new items

            const documents = response.documents;
            console.log("Documents fetched:", documents);  // Log the fetched documents
            if (!documents || documents.length === 0) {
                console.warn('No products found in the inventory.');
                productList.append('<p>No products available.</p>');
                return;
            }

            // Loop through each document and create a card for each product
            documents.forEach(doc => {
                const fields = doc.fields;

                // Get product details from the fields
                const description = fields.description.stringValue;
                const name = fields.title.stringValue;
                const price = fields.price.doubleValue || fields.price.integerValue;  // Support both double and integer price values
                const availableQuantity = fields.quantity.integerValue;
                const base64Image = fields.image.stringValue;  // Retrieve the Base64 image string

                // Create product card HTML structure
                const card = `
                    <div class="inventory-card">
                        <img src="${base64Image}" alt="${name}">
                        <div class="item-details">
                            <h3>${name}</h3>
                            <p>Price: $${price}</p>
                            <p>Available: ${availableQuantity}</p>
                            <p>Description: ${description}</p>
                            <button class="add-to-cart-btn" onclick="addToCart('${name}', '${base64Image}', '${price}', '${description}')">Add to Cart</button>
                            <button class="buy-now-btn" onclick="buyNow('${name}', '${base64Image}', '${price}', '${description}')">Buy Now</button>
                        </div>
                    </div>
                `;

                // Append the card to the product list
                $("#productList").append(card);
            });
        },
        error: function (xhr, status, error) {
            console.error("Error loading inventory:", error);
            console.error("Status: ", status);
            console.error("Response: ", xhr.responseText);  // Log response text for detailed error info
            $("#productList").html('<p>Failed to load products. Please try again later.</p>');
        }
    });
}

// Call the function to fetch products
window.onload = fetchProducts;  // Fetch products when the page loads

// Function to handle Add to Cart
function addToCart(name, image, price, description) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const newItem = { name, image, price, description };

    cartItems.push(newItem);  // Add the new item to the cart
    localStorage.setItem('cart', JSON.stringify(cartItems));  // Save the updated cart to localStorage

    alert('Item added to cart!');
    window.location.href = 'cart.html';  // Redirect to the cart page
}

// Function to handle Buy Now
function buyNow(name, image, price, description) {
    // Store the selected item in sessionStorage for use on the payment page
    const selectedItem = { name, image, price, description };
    sessionStorage.setItem('selectedItem', JSON.stringify(selectedItem));

    // Redirect to the payment page
    window.location.href = 'payment.html';
}
