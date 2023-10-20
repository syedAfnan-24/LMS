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
function displayLocalStorageList() {
    // Retrieve the list from local storage
    const storedListJSON = localStorage.getItem("books");
    // Check if the list exists in local storage
    if (storedListJSON) {
        // Parse the stored list from JSON to TypeScript array of objects
        const list = JSON.parse(storedListJSON);
        // Get the display element from the HTML
        const displayElement = document.getElementById("display");
        // Clear previous content
        if (displayElement) {
            displayElement.innerHTML = '';
            // Create a table element
            const table = document.createElement('table');
            // Create a header row for the table
            const headerRow = table.insertRow();
            const headers = ['Title', 'Author', 'Year', 'Actions'];
            // Iterate through the headers and create <th> elements
            headers.forEach(headerText => {
                const header = document.createElement('th');
                header.textContent = headerText;
                headerRow.appendChild(header);
            });
            // Iterate through the list and display each item in the table
            list.forEach(item => {
                // Create a new row for each item
                const row = table.insertRow();
                // Create cells for each property (title, author, year)
                const titleCell = row.insertCell();
                titleCell.textContent = item.title;
                const authorCell = row.insertCell();
                authorCell.textContent = item.author;
                const yearCell = row.insertCell();
                yearCell.textContent = item.year.toString();
                // Create a cell for the Borrow button
                const borrowCell = row.insertCell();
                const borrowButton = document.createElement("button");
                borrowButton.textContent = "Borrow";
                borrowButton.id = "borrow-btn";
                borrowButton.addEventListener("click", function () {
                    // borrowBook(item.title);
                    borrowButton.style.backgroundColor = "rgba(11, 118, 11, 0.546)";
                    borrowButton.textContent = "Borrowed";
                    borrowButton.disabled = true;
                });
                borrowCell.appendChild(borrowButton);
            });
            // Append the table to the display element
            if (displayElement) {
                displayElement.appendChild(table);
            }
        }
    }
    else {
        console.log('No list found in Local Storage.');
    }
}
// to render on screen as soon as its opened
displayLocalStorageList();
