let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    /*this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
    }*/
    this.remove = function() {
        myLibrary.splice(myLibrary.indexOf(this),1);
    }
    this.status = function() {
        if(this.read === "read") this.read = "not read"
        else if(this.read === "not read") this.read = "read";
        refresh();
    }
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

//Display books in myLibrary
const container = document.querySelector("#container");
function displayBooks() {
    for(let i = 0; i < myLibrary.length; i++) {
        const newDiv = document.createElement("div");
        newDiv.setAttribute("class", "book");

        const title = document.createElement("p");
        title.textContent = `Title: ${myLibrary[i].title}`;
        newDiv.appendChild(title);

        const author = document.createElement("p");
        author.textContent = `Author: ${myLibrary[i].author}`;
        newDiv.appendChild(author);

        const pages = document.createElement("p");
        pages.textContent = `Pages: ${myLibrary[i].pages}`;
        newDiv.appendChild(pages);

        const read = document.createElement("p");
        read.textContent = `Status: ${myLibrary[i].read}`;
        newDiv.appendChild(read);
        
        const panel = document.createElement("div");
        panel.setAttribute("class", "panel")

        const remove = document.createElement("button");
        remove.innerHTML = "Remove";
        remove.setAttribute("class", "remove-button");
        remove.addEventListener("click", () => {
            myLibrary[i].remove();
            refresh();
        })
        panel.appendChild(remove);

        const status = document.createElement("button");
        status.innerHTML = "Change status";
        status.setAttribute("class", "status");
        status.addEventListener("click", () => {
            myLibrary[i].status();
        })
        panel.appendChild(status);

        newDiv.appendChild(panel);

        container.appendChild(newDiv);
    }
}

displayBooks();

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

const save = document.querySelector(".save-button");
save.addEventListener("click", () => {
    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const pages = document.getElementById("pages");
    const checkbox = document.querySelector(".read-status");
    let status;

    if(checkbox.checked) {
        status = "read";
    } else {
        status = "not read";
    }

    addBookToLibrary(title.value, author.value, pages.value, status);

    const form = document.querySelector(".form");
    form.classList.remove("active-form");

    refresh();

    title.value = "";
    author.value = "";
    pages.value = "";
    checkbox.checked = false;
});

function refresh() {
    let books = document.querySelectorAll(".book");

    for (let i = 0; i < books.length; i++) {
        container.removeChild(books[i]);
    }

    displayBooks();
}