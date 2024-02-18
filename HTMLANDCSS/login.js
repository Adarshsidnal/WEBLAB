document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); 
        const username = form.username.value;
        const password = form.password.value;
        if (username === 'user' && password === 'password') {
            // If login is successful, redirect to the dashboard or any other page
            window.location.href = 'shop.html';
        } else {
            // If login fails, display an error message
            errorMessage.textContent = 'Invalid username or password. Please try again.';
        }
    });
});
