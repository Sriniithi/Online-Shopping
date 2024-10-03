const apiUrl = "https://firestore.googleapis.com/v1/projects/onlineshopping-31b9b/databases/(default)/documents/cart";

let cart = [];

// Function to add products to the cart
function addToCart(productName, quantity) {
    if (quantity > 0) {
        const cartItem = { productName, quantity };
        cart.push(cartItem);
        displayCart();
    } else {
        alert("Please enter a valid quantity.");
    }
}

// Function to display the cart
function displayCart() {
    const cartContainer = document.getElementById("cart");
    cartContainer.innerHTML = "";
    cart.forEach((item, index) => {
        cartContainer.innerHTML += `<p>${item.productName} - Quantity: ${item.quantity}</p>`;
    });
}

// Function to purchase items and send to Firebase
async function purchase() {
    if (cart.length === 0) {
        alert("Cart is empty.");
        return;
    }

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fields: {
                    products: {
                        arrayValue: {
                            values: cart.map(item => ({
                                mapValue: {
                                    fields: {
                                        productName: { stringValue: item.productName },
                                        quantity: { integerValue: item.quantity }
                                    }
                                }
                            }))
                        }
                    }
                }
            })
        });

        if (response.ok) {
            alert("Purchase successful!");
            cart = [];
            displayCart();
        } else {
            alert("Failed to complete the purchase.");
        }
    } catch (error) {
        console.error("Error purchasing items:", error);
    }
}
