// Save inventory to Firestore
async function updateInventory(itemName, quantity, price) {
    const apiUrl = "https://firestore.googleapis.com/v1/projects/onlineshopping-31b9b/databases/(default)/documents/Inventory";

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                fields: {
                    name: { stringValue: itemName },
                    quantity: { integerValue: quantity },
                    price: { doubleValue: price }
                }
            })
        });

        if (response.ok) {
            alert("Inventory updated successfully!");
        } else {
            alert("Failed to update inventory.");
        }
    } catch (error) {
        console.error("Error updating inventory:", error);
    }
}
