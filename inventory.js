const FIREBASE_URL = 'https://firestore.googleapis.com/v1/projects/onlineshopping-31b9b/databases/(default)/documents/Inventory';

// Function to convert the image to Base64
function convertImageToBase64(imageFile) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);  // Resolve the Base64 string
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(imageFile);  // Convert image to Base64
    });
}

// Function to handle form submission and image upload
document.getElementById('inventoryForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form values
    const title = document.getElementById('inventoryTitle').value;
    const description = document.getElementById('inventoryDescription').value;
    const quantity = document.getElementById('inventoryQuantity').value;
    const price = document.getElementById('inventoryPrice').value;
    const imageFile = document.getElementById('inventoryImage').files[0];

    console.log("Form Values:");
    console.log("Title:", title);
    console.log("Description:", description);
    console.log("Quantity:", quantity);
    console.log("Price:", price);
    console.log("Image File:", imageFile);

    try {
        // Convert the image to Base64
        const base64Image = await convertImageToBase64(imageFile);
        console.log("Base64 Image:", base64Image);  // Debugging line to view the base64 encoded image

        // Save product details in Firestore Database with Base64 image
        const response = await fetch(FIREBASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fields: {
                    title: { stringValue: title },
                    description: { stringValue: description },
                    quantity: { integerValue: parseInt(quantity) },
                    price: { doubleValue: parseFloat(price) },
                    image: { stringValue: base64Image }  // Save Base64 string in Firestore
                }
            })
        });

        if (response.ok) {
            document.getElementById('responseMessageInventory').innerText = "Product added successfully!";
            document.getElementById('inventoryForm').reset();
        } else {
            throw new Error('Failed to add product');
        }

    } catch (error) {
        console.error("Error adding product: ", error);
        document.getElementById('responseMessageInventory').innerText = "Error adding product!";
    }
});
