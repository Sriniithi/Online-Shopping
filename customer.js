const FIREBASE_URL = 'https://firestore.googleapis.com/v1/projects/onlineshopping-31b9b/databases/(default)/documents/Customer';

document.getElementById('customerForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('customerName').value;
    const email = document.getElementById('customerEmail').value;
    const mobile = document.getElementById('customerMob').value;
    const creditLimit = document.getElementById('customerCreditLimit').value;

    fetch('https://firestore.googleapis.com/v1/projects/onlineshopping-31b9b/databases/(default)/documents/Customer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fields: {
                Name: { stringValue: name },
                Email: { stringValue: email },
                Mob: { stringValue: mobile },
                CreditLimit: { integerValue: creditLimit }
            }
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('responseMessageCustomer').textContent = "Customer added successfully!";
    })
    .catch(error => {
        document.getElementById('responseMessageCustomer').textContent = "Error: " + error.message;
    });
});
