// Retrieve books from localStorage or initialize an empty array
let JSONbooks = localStorage.getItem('books')!
let books:Book[] = JSON.parse(JSONbooks) || [];

//add books
function addBook() {
    const title = (document.getElementById('bookTitle')! as HTMLInputElement).value;
    const author = (document.getElementById('author')! as HTMLInputElement).value;
    const year = (document.getElementById('year')! as HTMLInputElement).value;

    if (title && author && year) {
        const newBook:Book = {
            title: title,
            author: author,
            year: +year,
        };

        books.push(newBook);
        saveBooksToLocalStorage();
        // renderBooks();  //uncomment this after implementation
        
        // Clear input fields after adding a book
        (document.getElementById('bookTitle')! as HTMLInputElement).value = '';
        (document.getElementById('author')! as HTMLInputElement).value = '';
        (document.getElementById('year')! as HTMLInputElement).value = '';
    }
}


//to diplay the list of books added, along with displaying ui elements to perform CRUD operations

interface Book {
    title: string;
    author: string;
    year: number;
}


function renderBooks(): void {
    const bookList = document.getElementById('bookList');
    const table = document.createElement('table');

    // Create header row
    const headerRow = table.insertRow();
    const headers = ['Title', 'Author', 'Year', 'Update', 'Delete'];

    // Adding table heading for each cell
    headers.forEach(headerText => {
        const headerCell = document.createElement('th');
        headerCell.textContent = headerText;
        headerRow.appendChild(headerCell);
    });

    // Entering all books data in each row in the table
    books.forEach(book => {
        const row = table.insertRow();

        // Create cells for title, author, and year
        const titleCell = row.insertCell();
        titleCell.textContent = book.title;

        const authorCell = row.insertCell();
        authorCell.textContent = book.author;

        const yearCell = row.insertCell();
        yearCell.textContent = book.year.toString(); // Convert number to string for rendering

        // Create cell for edit button
        const editCell = row.insertCell();
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.id = 'edit-button';  // Creating id to add CSS
        editButton.onclick = () => editBook(book.title); //uncomment after implementing 
        editCell.appendChild(editButton);

        // Create cells for delete button
        const deleteCell = row.insertCell();
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.id = 'delete-button'; // Creating id to add CSS
        deleteButton.onclick = () => deleteBook(book.title); //uncomment after implementing 
        deleteCell.appendChild(deleteButton);
    });

    // Append the table to the bookList element
    if (bookList) {
        bookList.innerHTML = '';
        bookList.appendChild(table);
    }
}



//edit book function
function editBook(id:string) {
    const editedAuthor = prompt('Enter new author:');
    const editedYear = prompt('Enter new year:');

    if (editedAuthor && editedYear) {
        books = books.map(book => {
            if (book.title === id) {
                book.author = editedAuthor;
                book.year = +editedYear;
            }
            return book;
        });

        saveBooksToLocalStorage();
        renderBooks();
    }
}

//delete book function
function deleteBook(id:string) {
    books = books.filter(book => book.title !== id);
    saveBooksToLocalStorage();
    renderBooks();
}


//saving to local Storage
function saveBooksToLocalStorage() {
    localStorage.setItem('books', JSON.stringify(books));
}
//function to display list of borrowed books from evry student
function displayBorrowedList() {
    // Retrieve the list from local storage
    const storedList = localStorage.getItem("borrow");

    // Check if the list exists in local storage
    if (storedList) {
        // Parse the stored list from JSON to JavaScript array of objects
        const list:BorrowedItem[] = JSON.parse(storedList);

        // Get the display element from the HTML
        const displayElement = document.getElementById("borrowList")!;

        // Clear previous content
        displayElement.innerHTML = '';

        // Create a table element
        const table = document.createElement('table');
        // Create a header row for the table
        const headerRow = table.insertRow();
        const headers = ['Student Name', 'Book', 'Borrowed for', 'Borrowed Date'];

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
            titleCell.textContent = item.name;

            const authorCell = row.insertCell();
            authorCell.textContent = item.book;

            const yearCell = row.insertCell();
            yearCell.textContent = item.days +" days";

            const dateCell = row.insertCell();
            dateCell.textContent = item.borrow;

        });

        // Append the table to the display element
        displayElement.appendChild(table);
    } else {
        console.log('No list found in Local Storage.');
    }
}

//TO DISPLAY LIST OF BOOKS RETURNED ALONG WITH FINE
function returnedBooksListOnAdmin() {
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


    });

    // Append the table to the container element
    tableContainer.appendChild(table);

}
//to display books as soon as the screen is loaded
renderBooks();
//to display books as soon as the screen is loaded
displayBorrowedList()
// TO DISPLAY THE RETURNED BOOK LIST AS SOON AS WE LAND ON SCREEN
returnedBooksListOnAdmin()