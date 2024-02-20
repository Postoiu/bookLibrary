let booksContainerInstance;

class Library {
    static #books = [];

    static addBookToLibrary(book) {
        this.#books.push(book);
    }

    static getBooks() {
        return this.#books;
    }

    static removeBook(bookIndex) {
        this.#books.splice(bookIndex, 1);
    }
}

class Book {
    constructor(title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }

    setStatus() {
        this.status = this.status === 'read' ? 'not read' : 'read';
    }
}

class BooksContainer {
    constructor(id) {
        if(booksContainerInstance) {
            console.log('New instance cannot be created');
            return;
        }

        booksContainerInstance = this;
        this.container = document.getElementById(id);
    }

    display() {
        if (this.container.querySelector('.book')) {
            this.container.replaceChildren();
        }

        const books = Library.getBooks();

        books.forEach((book, i) => {
            const bookContainer = document.createElement("div");
            bookContainer.setAttribute("class", "book");
            bookContainer.id = i;

            const title = createParagaraph(`Title: ${book.title}`);
            const author = createParagaraph(`Author: ${book.author}`);
            const pages = createParagaraph(`Pages: ${book.pages}`);
            const status = createParagaraph(`Status: ${book.status}`);

            const controlsPanel = document.createElement("div");
            controlsPanel.setAttribute("class", "panel");

            const removeBtn = createButton('Remove', 'remove-button');
            const statusBtn = createButton('Change status', 'status');
            controlsPanel.append(removeBtn, statusBtn);

            bookContainer.append(title, author, pages, status, controlsPanel);

            this.container.appendChild(bookContainer);
        })

        this.container.addEventListener('click', e => {
            e.stopImmediatePropagation();

            if (e.target.className === 'remove-button') {
                Library.removeBook(e.target.closest('.book').id);
            }

            if (e.target.className === 'status') {
                const targetBook = Library.getBooks()[e.target.closest('.book').id];
                targetBook.setStatus();
            }

            this.display();
        })

    }
}

function createParagaraph(text) {
    const p = document.createElement('p');
    p.textContent = text;

    return p;
}

function createButton(text, className) {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.setAttribute("class", className);

    return btn;
}

const container = new BooksContainer('container');
container.display();

//Add new book
//Call the form
const button = document.querySelector(".new-book");
button.addEventListener("click",() => {
    const form = document.querySelector(".form");
    form.classList.add("active-form");
});

const cancel = document.querySelector(".cancel-button");
cancel.addEventListener("click", () => {
    const form = document.querySelector(".form");
    form.classList.remove("active-form");
});

const form = document.querySelector('.form');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = e.target.querySelector('#title').value;
    const author = e.target.querySelector('#author').value;
    const pages = e.target.querySelector('#pages').value;
    const checkbox = e.target.querySelector('.read-status');
    const status = checkbox.checked ? 'read' : 'not read';

    const book = new Book(title, author, pages, status);
    Library.addBookToLibrary(book);

    document.querySelector('.cancel-button').click();

    container.display();
})