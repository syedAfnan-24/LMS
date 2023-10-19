"use strict";
const loginForm = document.getElementById("loginForm");
const forgotPasswordLink = document.getElementById("forgotPasswordLink");
const resetPasswordForm = document.getElementById("resetPasswordForm");
const resetForm = document.getElementById("resetForm");
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const enteredUsername = document.getElementById("username").value;
    const storedUserJSON = localStorage.getItem(enteredUsername);
    if (storedUserJSON) {
        const storedUser = JSON.parse(storedUserJSON);
        const enteredPassword = document.getElementById("password").value;
        if (storedUser && storedUser.username === enteredUsername && storedUser.password === enteredPassword) {
            // Redirect to user details page after successful login
            sessionStorage.setItem("user", storedUser.username);
            window.location.href = "clientHome.html";
        }
        else {
            alert("Invalid username or password. Please try again.");
            // Optionally, you can clear the input fields after unsuccessful login attempt
            // loginForm.reset();
        }
    }
    else {
        alert("User not found. Please register before logging in.");
        // Optionally, you can clear the input fields after unsuccessful login attempt
        // loginForm.reset();
    }
});
forgotPasswordLink.addEventListener("click", function (event) {
    event.preventDefault();
    loginForm.style.display = "none";
    resetPasswordForm.style.display = "block";
});
resetForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const newPassword = document.getElementById("newPassword").value;
    const username = prompt("Enter your username:");
    // Check if the username exists in your system (this could be done with an API call)
    if (username) {
        const storedUserJSON = localStorage.getItem(username);
        let storedUser = null;
        if (storedUserJSON) {
            storedUser = JSON.parse(storedUserJSON);
        }
        if (storedUser && storedUser.username === username) {
            storedUser.password = newPassword;
            localStorage.setItem(storedUser.username, JSON.stringify(storedUser));
            alert("Password reset successfully!");
            // Redirect to login page after password reset
            window.location.href = "login.html";
        }
        else {
            alert("Invalid username.");
        }
    }
    else {
        alert("Username cannot be empty.");
    }
});
