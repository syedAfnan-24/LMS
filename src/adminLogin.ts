const adminLoginForm = document.getElementById("adminLogin")! as HTMLFormElement;

adminLoginForm.addEventListener("submit", function(event:Event) {
    event.preventDefault();
   
    const storedUserJSON = localStorage.getItem("admin")!;
    const storedUser = JSON.parse(storedUserJSON)
    const enteredUsername = (document.getElementById("aname")! as HTMLInputElement).value; 
    const enteredPassword = (document.getElementById("apass")! as HTMLInputElement).value;

    if (storedUser && storedUser.adminName === enteredUsername && storedUser.password === enteredPassword) {
        // Redirect to user details page after successful login
        sessionStorage.setItem("admin",storedUser.adminName)
        window.location.href = "adminHome.html";
    } else {
        alert("Invalid username or password. Please try again.");
        // Optionally, you can clear the input fields after unsuccessful login attempt
        // loginForm.reset();
    }
});