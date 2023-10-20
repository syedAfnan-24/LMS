// client Details
document.addEventListener("DOMContentLoaded", function () {
    const sessionStorageUser = sessionStorage.getItem("user")!;
    const storedUserJSON = localStorage.getItem(sessionStorageUser)!;
    const storedUser = JSON.parse(storedUserJSON)

    if (storedUser) {
        const userDetailsDiv = document.getElementById("userDetails")!;
        userDetailsDiv.innerHTML = `
            <p><strong>Username:</strong> ${storedUser.username}</p>
            <p><strong>Branch:</strong> ${storedUser.branch}</p>
            <p><strong>University Number (USN):</strong> ${storedUser.usn}</p>
            <p><strong>Semester:</strong> ${storedUser.semester}</p>
        `;
        const logoutBtn = document.getElementById("logoutBtn")!;
        logoutBtn.addEventListener("click", function () {
            // Remove user data from local storage
            sessionStorage.removeItem("user");
            sessionStorage.clear();

            // Redirect to the login page after logout
            window.location.href = "index.html";
        });
    }
});


//retriving books list set up by adminfunction displayLocalStorageList() {
// Retrieve the list from local storage
interface Book {
    title: string;
    author: string;
    year: number;
}

function displayLocalStorageList(): void {
    // Retrieve the list from local storage
    const storedListJSON = localStorage.getItem("books");

    // Check if the list exists in local storage
    if (storedListJSON) {
        // Parse the stored list from JSON to TypeScript array of objects
        const list: Book[] = JSON.parse(storedListJSON);

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
                    borrowBook(item.title); //uncomment after implementation
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
    } else {
        console.log('No list found in Local Storage.');
    }
}

let existingBorrowsJSON = localStorage.getItem("borrow")!
let existingBorrows = JSON.parse(existingBorrowsJSON) || [];
function borrowBook(bookTitle:string) {
    const storedUserJSON = localStorage.getItem(sessionStorage.getItem("user")!)!
    const storedUser = JSON.parse(storedUserJSON);
    let x = prompt("enter the number of days you want to borrow this book for");
    let bDate = prompt("enter the borrow date in YYYY-MM-DD format")
    if(x!=""){
        const newBorrow = {
            name: storedUser.username,
            book: bookTitle,
            days: x,
            borrow: bDate
        }
        existingBorrows.push(newBorrow);
    
        localStorage.setItem("borrow", JSON.stringify(existingBorrows));
        (document.getElementById("message")! as HTMLParagraphElement).style.display = 'block';
        (document.getElementById("message")! as HTMLParagraphElement).innerHTML = "borrowed " + bookTitle + " for " + x + " days, on "+bDate
    }else{
        alert("book can't be borrowed without mention number of days")
    }
}
interface BorrowedItem {
    name: string;
    book: string;
    days: number;
    borrow: string;
}

function borrowedList(): void {
    // Get the JSON data from localStorage and parse it
    const storedUser = JSON.parse(localStorage.getItem(sessionStorage.getItem("user")!)!) as { username: string };
    const borrowData: BorrowedItem[] = JSON.parse(localStorage.getItem('borrow')!) || [];

    // Find the element where you want to display the table
    const tableContainer = document.getElementById('table-container');

    if (tableContainer) {
        // Create an HTML table
        const table = document.createElement('table');
        const tableHeader = table.createTHead();
        const headerRow = tableHeader.insertRow(0);
        const headers = ['Name', 'Book', 'Days', 'Borrowed Date', 'Return'];

        // Populate table headers
        headers.forEach(headerText => {
            const th = document.createElement('th');
            const text = document.createTextNode(headerText);
            th.appendChild(text);
            headerRow.appendChild(th);
        });

        // Populate table with data
        borrowData.forEach(item => {
            if (item.name === storedUser.username) {
                const row = table.insertRow();
                const cell1 = row.insertCell();
                const cell2 = row.insertCell();
                const cell3 = row.insertCell();
                const cell4 = row.insertCell();
                const cell5 = row.insertCell(); // return book button
                cell1.textContent = item.name;
                cell2.textContent = item.book;
                cell3.textContent = item.days.toString();
                cell4.textContent = item.borrow;

                const returnBookBtn = document.createElement('button');
                returnBookBtn.textContent = "Return";
                returnBookBtn.onclick = () => returnBook(item.name, item.book, item.borrow, item.days); //uncomment after implentation
                cell5.appendChild(returnBookBtn);
            }
        });

        // Append the table to the container element
        tableContainer.appendChild(table);
    }
}

//return book functionality
interface ReturnRecord {
    name: string;
    book: string;
    borrowDate: string;
    returnDate: string;
    fine: number;
}

let returnedBooks: ReturnRecord[] = JSON.parse(localStorage.getItem("return")!) || [];

function returnBook(name: string, book: string, borrowDate: string, days: number): void {
    const returnDate = prompt("Enter the date of return in YYYY-MM-DD format");

    if (returnDate) {
        let fine: number;
        let daysDifference = getDaysDifference(borrowDate, returnDate);

        if (daysDifference > days) {
            fine = (daysDifference - days) * 5;
        } else {
            fine = 0;
        }

        const newReturn: ReturnRecord = {
            name: name,
            book: book,
            borrowDate: borrowDate,
            returnDate: returnDate,
            fine: fine
        };

        returnedBooks.push(newReturn);
        localStorage.setItem("return", JSON.stringify(returnedBooks));

        // Remove the record from "borrow" local storage
        let existingBorrows: BorrowedItem[] = JSON.parse(localStorage.getItem('borrow')!) || [];
        const indexToRemove = existingBorrows.findIndex(record => record.name === name && record.book === book);

        // If the record is found, remove it
        if (indexToRemove !== -1) {
            existingBorrows.splice(indexToRemove, 1);
            localStorage.setItem("borrow", JSON.stringify(existingBorrows));

            (document.getElementById("return-message")! as HTMLParagraphElement).innerHTML = `${name} has returned '${book}', and has a fine of ${fine} units.`;
            (document.getElementById("return-message")! as HTMLParagraphElement).style.display = "block";
            console.log(`Record for ${name} and book ${book} has been removed.`);
        } else {
            console.log(`Record for ${name} and book ${book} not found.`);
        }
    }
}

// Function to calculate the difference in days between two dates
function getDaysDifference(borrowDate: string, returnDate: string): number {
    // Convert the dates to Date objects
    const startDate = new Date(borrowDate);
    const endDate = new Date(returnDate);

    // Calculate the time difference in milliseconds
    const timeDifference = endDate.getTime() - startDate.getTime();

    // Convert the time difference from milliseconds to days
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

    // Return the absolute value of the difference to handle cases where returnDate is before borrowDate
    return Math.abs(daysDifference);
}

// to display the returned book list with fine
function returnedBooksList() {
    const storedUser = JSON.parse(localStorage.getItem(sessionStorage.getItem("user")!)!);
    const fineList:ReturnRecord[] = JSON.parse(localStorage.getItem("return")!)
    const tableContainer = document.getElementById("returnedBookstbl")!;

    const table = document.createElement('table')
    const tableHeader = table.createTHead();
    const headerRow = tableHeader.insertRow(0);
    const headers = ['Student Name','Book', 'Borrowed Date', 'return Date', 'Fine Amount'];

    headers.forEach(headerText => {
        const th = document.createElement('th');
        const text = document.createTextNode(headerText);
        th.appendChild(text);
        headerRow.appendChild(th);
    });
    fineList.forEach(item => {
        if (item.name === storedUser.username) {
            const row = table.insertRow();
            const cell1 = row.insertCell();
            const cell2 = row.insertCell();
            const cell3 = row.insertCell();
            const cell4 = row.insertCell();
            const cell5 = row.insertCell();
            cell1.textContent = item.name;
            cell2.textContent = item.book;
            cell3.textContent = item.borrowDate;
            cell4.textContent = item.returnDate;
            cell5.textContent = item.fine.toString();

        }
    });

    // Append the table to the container element
    tableContainer.appendChild(table);

}


//to render the list of books returned
returnedBooksList()
// to render borrowed book list on screen as soon as its opened
borrowedList();
// to render the list of all books on screen as soon as its opened
displayLocalStorageList();
