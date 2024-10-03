const FIREBASE_URL = 'https://firestore.googleapis.com/v1/projects/onlineshopping-31b9b/databases/(default)/documents/Inventory';

// Fetch and display products on the home page
function fetchProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    // Fetch products from Firestore
    fetch(FIREBASE_URL)
        .then(response => response.json())
        .then(data => {
            const documents = data.documents;
            if (documents) {
                documents.forEach(doc => {
                    const product = doc.fields;
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <strong>${product.Title.stringValue}</strong><br>
                        Description: ${product.Description.stringValue}<br>
                        Quantity: ${product.Quantity.integerValue}<br>
                        Price: $${product.Price.integerValue}
                    `;
                    productList.appendChild(li);
                });
            } else {
                productList.innerHTML = 'No products available.';
            }
        })
        .catch(error => {
            productList.innerHTML = 'Error fetching products: ' + error.message;
        });
}

// Initialize product list on page load
window.onload = fetchProducts;
