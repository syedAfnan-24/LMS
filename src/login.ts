const loginForm = document.getElementById("loginForm")! as HTMLFormElement;
const forgotPasswordLink = document.getElementById("forgotPasswordLink")! as HTMLAnchorElement;
const resetPasswordForm = document.getElementById("resetPasswordForm")! as HTMLDivElement;
const resetForm = document.getElementById("resetForm")! as HTMLFormElement;

loginForm.addEventListener("submit", function (event: Event) {
    event.preventDefault();

    const enteredUsername = (document.getElementById("username") as HTMLInputElement).value;
    const storedUserJSON = localStorage.getItem(enteredUsername);

    if (storedUserJSON) {
        const storedUser = JSON.parse(storedUserJSON);
        const enteredPassword = (document.getElementById("password") as HTMLInputElement).value;

        if (storedUser && storedUser.username === enteredUsername && storedUser.password === enteredPassword) {
            // Redirect to user details page after successful login
            sessionStorage.setItem("user", storedUser.username);
            window.location.href = "clientHome.html";
        } else {
            alert("Invalid username or password. Please try again.");
            // Optionally, you can clear the input fields after unsuccessful login attempt
            // loginForm.reset();
        }
    } else {
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

    const newPassword = (document.getElementById("newPassword")! as HTMLInputElement).value;
    const username = prompt("Enter your username:");

    // Check if the username exists in your system (this could be done with an API call)
    if (username) {
        // Update the password (in this example, updating the local storage)
        interface User {
            username: string;
            password: string;
        }
        const storedUserJSON = localStorage.getItem(username);
        let storedUser: User | null = null;

        if (storedUserJSON) {
            storedUser = JSON.parse(storedUserJSON) as User;
        }

        if (storedUser && storedUser.username === username) {
            storedUser.password = newPassword;
            localStorage.setItem(storedUser.username, JSON.stringify(storedUser));
            alert("Password reset successfully!");
            // Redirect to login page after password reset
            window.location.href = "login.html";
        } else {
            alert("Invalid username.");
        }
    } else {
        alert("Username cannot be empty.");
    }
});