// This function runs when the login form is submitted
document.getElementById('customerLoginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('customerEmail').value;
    const password = document.getElementById('customerPassword').value;

    // For now, we'll assume the login is always successful
    // You can add real authentication logic here

    // Redirect to the home page after successful login
    window.location.href = 'home.html';
});
