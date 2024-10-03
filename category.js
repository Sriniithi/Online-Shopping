document.getElementById('categoryForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const categoryName = document.getElementById('categoryName').value;

    fetch('https://firestore.googleapis.com/v1/projects/onlineshopping-31b9b/databases/(default)/documents/Category', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fields: {
                Name: { stringValue: categoryName }
            }
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('responseMessage').textContent = "Category added successfully!";
    })
    .catch(error => {
        document.getElementById('responseMessage').textContent = "Error: " + error.message;
    });
});
