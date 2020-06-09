const bookGrid = document.querySelector('#bookGrid');
const addBookBtn = document.querySelector('#addBookBtn');
const popup = document.querySelector('#popup');
const booksForm = document.querySelector('#booksForm');
let myLibrary = [];

addBookBtn.addEventListener('click', () => {
	openPopup();
});

function renderBook(doc) {
	let div = document.createElement('div');
	div.setAttribute('data-id', doc.id);
	div.setAttribute('class', 'card');
	bookGrid.appendChild(div);

	let title = document.createElement('div');
	title.textContent = doc.data().title;
	div.appendChild(title);

	let author = document.createElement('div');
	author.textContent = `by ${doc.data().author}`;
	div.appendChild(author);

	let pages = document.createElement('div');
	pages.textContent = `${doc.data().pages} pages`;
	div.appendChild(pages);

	let read = document.createElement('div');
	if (doc.data().read) {
		read.textContent = `I've already read this book`;
	} else {
		read.textContent = `I haven't read this book yet`;
	}
	div.appendChild(read);

	let deleteBtn = document.createElement('button');
	deleteBtn.setAttribute('class', 'deleteBtn');
	deleteBtn.textContent = 'x';
	div.appendChild(deleteBtn);

	deleteBtn.addEventListener('click', (e) => {
		e.stopPropagation();
		let id = e.target.parentElement.getAttribute('data-id');
		db.collection('books').doc(id).delete();
	});
}

db.collection('books')
	.get()
	.then((snapshot) => {
		snapshot.docs.forEach((doc) => {
			renderBook(doc);
		});
	});

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	//	console.log(this);
}

var theFellowshipOfTheRing = new Book(
	'The Lord of the Rings: The Fellowship of the Ring',
	'J. R. R. Tolkien',
	'479',
	true
);

booksForm.addEventListener('submit', (e) => {
	e.preventDefault();
	addBookToLibrary();
});

function addBookToLibrary() {
	db.collection('books').add({
		title: booksForm.title.value,
		author: booksForm.author.value,
		pages: booksForm.pages.value,
		read: booksForm.read.value,
	});
	title.booksForm.value = '';
	author.booksForm.value = '';
	pages.booksForm.value = '';
	read.booksForm.value = '';
	closePopup();
}

window.addEventListener('click', outsidePopupClick);

function closePopup() {
	popup.style.display = 'none';
}

function outsidePopupClick(e) {
	if (e.target == popup) {
		closePopup();
	}
}

function openPopup() {
	popup.style.display = 'block';
}
