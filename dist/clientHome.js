"use strict";
// client Details
document.addEventListener("DOMContentLoaded", function () {
    const sessionStorageUser = sessionStorage.getItem("user");
    const storedUserJSON = localStorage.getItem(sessionStorageUser);
    const storedUser = JSON.parse(storedUserJSON);
    if (storedUser) {
        const userDetailsDiv = document.getElementById("userDetails");
        userDetailsDiv.innerHTML = `
            <p><strong>Username:</strong> ${storedUser.username}</p>
            <p><strong>Branch:</strong> ${storedUser.branch}</p>
            <p><strong>University Number (USN):</strong> ${storedUser.usn}</p>
            <p><strong>Semester:</strong> ${storedUser.semester}</p>
        `;
        const logoutBtn = document.getElementById("logoutBtn");
        logoutBtn.addEventListener("click", function () {
            // Remove user data from local storage
            sessionStorage.removeItem("user");
            sessionStorage.clear();
            // Redirect to the login page after logout
            window.location.href = "index.html";
        });
    }
});
//gotta add more stuff here, listing books, borrow and return features...I'll do it after setting up admin profile
