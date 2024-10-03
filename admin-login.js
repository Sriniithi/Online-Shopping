// Add an event listener to the form to handle the submit event
document.getElementById('adminLoginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission behavior

    // Get the values entered by the user for email and password
    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;

    // Define the correct admin email and password
    const adminEmail = 'srinithi18@gmail.com'; // Admin email
    const adminPassword = 'admin123'; // Admin password

    // Check if the entered credentials match the hardcoded admin credentials
    if (email === adminEmail && password === adminPassword) {
        // If the credentials are correct, redirect to the admin dashboard page
        window.location.href = 'admin-dashboard.html';
    } else {
        // If the credentials are incorrect, display an error message
        document.getElementById('errorMessage').innerText = 'Invalid Admin Credentials';
    }
});
