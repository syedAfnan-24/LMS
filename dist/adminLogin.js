"use strict";
const adminLoginForm = document.getElementById("adminLogin");
adminLoginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const storedUserJSON = localStorage.getItem("admin");
    const storedUser = JSON.parse(storedUserJSON);
    const enteredUsername = document.getElementById("aname").value;
    const enteredPassword = document.getElementById("apass").value;
    if (storedUser && storedUser.adminName === enteredUsername && storedUser.password === enteredPassword) {
        // Redirect to user details page after successful login
        sessionStorage.setItem("admin", storedUser.adminName);
        window.location.href = "adminHome.html";
    }
    else {
        alert("Invalid username or password. Please try again.");
        // Optionally, you can clear the input fields after unsuccessful login attempt
        // loginForm.reset();
    }
});
