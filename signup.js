// Add an event listener to the form to handle the submit event
document.getElementById('signUpForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission behavior

    // Get the email and password values entered by the user
    const email = document.getElementById('newCustomerEmail').value;
    const password = document.getElementById('newCustomerPassword').value;

    // Basic email and password validation
    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
    }

    // Store the new user credentials locally (can be replaced with backend or Firebase storage)
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPassword', password);

    // Confirmation message
    alert('Sign up successful!');
    
    // Redirect to a welcome or login page after successful sign up
    window.location.href = 'welcome.html'; // Modify this based on your project
});

// Helper function to validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
