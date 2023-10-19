const signupForm = document.getElementById("signupForm")! as HTMLFormElement;

signupForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const userName = document.getElementById("username")! as HTMLInputElement;
    const username = userName.value;
    const passWord = document.getElementById("password")! as HTMLInputElement;
    const password = passWord.value;
    const brancH = document.getElementById("branch")! as HTMLInputElement;
    const branch = brancH.value;
    const USN = document.getElementById("usn")! as HTMLInputElement;
    const usn = USN.value
    const SEM = document.getElementById("semester")! as HTMLInputElement;
    const semester = SEM.value

    // Create a user object with form data
    const user = {
        username: username,
        password: password,
        branch: branch,
        usn: usn,
        semester: semester
    };

    // Store the user object in local storage
    localStorage.setItem(user.username, JSON.stringify(user));
    alert("Sign Up Success")

    // Optionally, you can redirect to a different page after signup
    // window.location.href = "success.html";

    // Reset the form after submission
    signupForm.reset();
});