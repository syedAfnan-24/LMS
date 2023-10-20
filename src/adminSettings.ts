// Retrieve books from localStorage or initialize an empty array
let JSONbooks = localStorage.getItem('books')!
let books = JSON.parse(JSONbooks) || [];

//add books
function addBook() {
    const title = (document.getElementById('bookTitle')! as HTMLInputElement).value;
    const author = (document.getElementById('author')! as HTMLInputElement).value;
    const year = (document.getElementById('year')! as HTMLInputElement).value;

    if (title && author && year) {
        const newBook = {
            title: title,
            author: author,
            year: year,
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

//saving to local Storage
function saveBooksToLocalStorage() {
    localStorage.setItem('books', JSON.stringify(books));
}